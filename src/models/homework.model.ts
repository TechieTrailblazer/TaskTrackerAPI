import { RowDataPacket } from 'mysql2';

export default interface Homework extends RowDataPacket {
	id?: number;
	student_id?: string;
	task_description?: string;
	deadline?: Date;
}
