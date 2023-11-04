import { ResultSetHeader } from 'mysql2';
import User from '../models/user.model';
import connection from '../db';

interface IUserRepository {
	save(user: User): Promise<User>;
	retrieveAll(searchParams: { name: string; published: boolean }): Promise<User[]>;
	retrieveById(userId: number): Promise<User | undefined>;
	update(user: User): Promise<number>;
	delete(userId: number): Promise<number>;
	deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
	save(user: User): Promise<User> {
		return new Promise((resolve, reject) => {
			connection.query<ResultSetHeader>(
				'INSERT INTO students (name, email) VALUES(?,?)',
				[user.name, user.email || false],
				(err, res) => {
					if (err) reject(err);
					else
						this.retrieveById(res.insertId)
							.then((user) => resolve(user!))
							.catch(reject);
				}
			);
		});
	}

	retrieveAll(searchParams: { name?: string; email?: string }): Promise<User[]> {
		let query: string = 'SELECT * FROM students';
		let condition: string = '';

		if (searchParams?.name) condition += `Name LIKE '${searchParams.name}%'`;

		if (searchParams?.email) condition += `Email LIKE '${searchParams.email}'`;

		if (condition.length) query += ' WHERE ' + condition;

		return new Promise((resolve, reject) => {
			// TODO:вынести connection.query в отдельный класс
			connection.query<User[]>(query, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	}

	retrieveById(userId: number): Promise<User> {
		return new Promise((resolve, reject) => {
			connection.query<User[]>('SELECT * FROM students WHERE id = ?', [userId], (err, res) => {
				if (err) reject(err);
				else resolve(res?.[0]);
			});
		});
	}

	update(user: User): Promise<number> {
		return new Promise((resolve, reject) => {
			connection.query<ResultSetHeader>(
				'UPDATE students SET name = ?, email = ? WHERE id = ?',
				[user.name, user.email, user.id],
				(err, res) => {
					if (err) reject(err);
					else resolve(res.affectedRows);
				}
			);
		});
	}

	delete(userId: number): Promise<number> {
		return new Promise((resolve, reject) => {
			connection.query<ResultSetHeader>('DELETE FROM students WHERE id = ?', [userId], (err, res) => {
				if (err) reject(err);
				else resolve(res.affectedRows);
			});
		});
	}

	deleteAll(): Promise<number> {
		return new Promise((resolve, reject) => {
			connection.query<ResultSetHeader>('DELETE FROM students', (err, res) => {
				if (err) reject(err);
				else resolve(res.affectedRows);
			});
		});
	}
}

export default new UserRepository();
