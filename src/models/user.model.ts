import { RowDataPacket } from 'mysql2/promise';

export interface IUser extends RowDataPacket {
	id?: number;
	name?: string;
	email?: string;
}
