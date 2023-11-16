import { access } from '../config/db.config';
import MySQL from '../db/mysql';
import { IHomework } from '../models/homework.model';

const mysql = new MySQL(access);

interface IHomeworkRepository {
	save(homework: IHomework): Promise<IHomework>;
	retrieveAll(searchParams: { task_description: string }): Promise<IHomework[]>;
	retrieveLastByStudentId(homeworkId: number): Promise<IHomework | undefined>;
	retrieveAllByStudentId(student_id: number): Promise<IHomework[]>;
	updateByTaskId(homework: IHomework): Promise<number>;
	delete(task_id: number): Promise<number>;
}

class HomeworkRepository implements IHomeworkRepository {
	async save(homework: IHomework): Promise<IHomework> {
		const [result] = await mysql.executeResult(
			'INSERT INTO homework_tasks (student_id, task_description, deadline) VALUES(?, ?, ?)',
			[homework.student_id, homework.task_description, homework.deadline || false]
		);
		return this.retrieveLastByStudentId(result.insertId);
	}

	async retrieveAll(searchParams: { task_description?: string }): Promise<IHomework[]> {
		let query: string = 'SELECT * FROM homework_tasks';
		let condition: string = '';

		if (searchParams?.task_description)
			condition += `LOWER(task_description) LIKE '%${searchParams.task_description}%'`;

		if (condition.length) query += ' WHERE ' + condition;

		const [homework] = await mysql.queryRows(query);
		return homework;
	}

	async retrieveLastByStudentId(student_id: number): Promise<IHomework> {
		const [homework] = await mysql.queryRows('SELECT * FROM homework_tasks WHERE student_id = ?', [
			student_id,
		]);
		return homework?.[0];
	}

	async retrieveAllByStudentId(student_id: number): Promise<IHomework[]> {
		const [homework] = await mysql.queryRows('SELECT * FROM homework_tasks WHERE student_id = ?', [
			student_id,
		]);
		return homework;
	}

	async updateByTaskId(homework: IHomework): Promise<number> {
		const [result] = await mysql.executeResult(
			'UPDATE homework_tasks SET task_description = ?, deadline = ? WHERE id = ?',
			[homework.task_description, homework.deadline, homework.task_id]
		);
		return result.affectedRows;
	}

	async delete(task_id: number): Promise<number> {
		const [result] = await mysql.executeResult('DELETE FROM homework_tasks WHERE id = ?', [task_id]);
		return result.affectedRows;
	}
}

export default new HomeworkRepository();
