import { Router } from 'express';
import HomeworkController from '../controllers/homework.controller';

class HomeworkRoutes {
	router = Router();
	controller = new HomeworkController();

	constructor() {
		this.intializeRoutes();
	}

	intializeRoutes() {
		// Create a Homework Task for a Student
		this.router.post('/', this.controller.create);
		// Get all homeworks from DB
		this.router.get('/', this.controller.findAll);
		//ok Get Homework Tasks for a Student
		this.router.get('/:student_id', this.controller.findAllById);
		// Update a Homework Task
		this.router.put('/:task_id', this.controller.update);
		// Delete a Homework Task
		this.router.delete('/:task_id', this.controller.delete);
	}
}

export default new HomeworkRoutes().router;
