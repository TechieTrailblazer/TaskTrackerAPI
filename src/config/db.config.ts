import { PoolOptions } from 'mysql2/promise';

export const access: PoolOptions = {
	host: 'localhost',
	user: 'root',
	password: 'mysql123',
	database: 'TestDB',
};
