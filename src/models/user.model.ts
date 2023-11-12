import { RowDataPacket } from 'mysql2/promise';

export default interface IUser extends RowDataPacket {
	id?: number;
	name?: string;
	email?: string;
}
