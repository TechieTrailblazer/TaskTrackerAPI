import { RowDataPacket } from 'mysql2/promise';

export interface IHomework extends RowDataPacket {
	id?: number;
	student_id?: number;
	task_description?: string;
	deadline?: Date;
}
