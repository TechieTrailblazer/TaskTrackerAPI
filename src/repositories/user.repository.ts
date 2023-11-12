import { access } from '../config/db.config';
import MySQL from '../db/mysql';
import User from '../models/user.model';

const mysql = new MySQL(access);

interface IUserRepository {
	save(user: User): Promise<User>;
	retrieveAll(searchParams: { name: string; published: boolean }): Promise<User[]>;
	retrieveById(userId: number): Promise<User | undefined>;
	update(user: User): Promise<number>;
	delete(userId: number): Promise<number>;
	deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
	async save(user: User): Promise<User> {
		const [result] = await mysql.executeResult('INSERT INTO students (name, email) VALUES(?, ?)', [
			user.name,
			user.email || false,
		]);
		return this.retrieveById(result.insertId);
	}

	async retrieveAll(searchParams: { name?: string; email?: string }): Promise<User[]> {
		let query: string = 'SELECT * FROM students';
		let condition: string = '';

		if (searchParams?.name) condition += `LOWER(name) LIKE '%${searchParams.name}%'`;

		if (searchParams?.email) condition += `LOWER(email) LIKE '%${searchParams.email}%'`;

		if (condition.length) query += ' WHERE ' + condition;

		const [users] = await mysql.queryRows(query);
		return users;
	}

	async retrieveById(userId: number): Promise<User> {
		const [user] = await mysql.queryRows('SELECT * FROM students WHERE id = ?', [userId]);
		return user?.[0];
	}

	async update(user: User): Promise<number> {
		const [result] = await mysql.executeResult('UPDATE students SET name = ?, email = ? WHERE id = ?', [
			user.name,
			user.email,
			user.id,
		]);
		return result.affectedRows;
	}

	async delete(userId: number): Promise<number> {
		const [result] = await mysql.executeResult('DELETE FROM students WHERE id = ?', [userId]);
		return result.affectedRows;
	}

	async deleteAll(): Promise<number> {
		const [result] = await mysql.executeResult('DELETE FROM students');
		return result.affectedRows;
	}
}

export default new UserRepository();
