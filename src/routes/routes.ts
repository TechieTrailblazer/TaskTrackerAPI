import { Application } from 'express';
import userRoutes from './user.routes';
import homeworkRoutes from './homework.routes';

export default class Routes {
	constructor(app: Application) {
		app.use('/api/students', userRoutes);
		app.use('/api/homeworks', homeworkRoutes);
	}
}
