import { Router } from 'express';
import UserController from '../controllers/user.controller';

class UserRoutes {
	router = Router();
	controller = new UserController();

	constructor() {
		this.intializeRoutes();
	}

	intializeRoutes() {
		// Create a new Student
		this.router.post('/students', this.controller.create);

		// Retrieve all Students
		this.router.get('/students', this.controller.findAll);

		// Retrieve a single Student with id
		this.router.get('/students/:id', this.controller.findOne);

		// Update a Student with id
		this.router.put('/students/:id', this.controller.update);

		// Delete a Student with id
		this.router.delete('/students/:id', this.controller.delete);

		// Create a Homework Task for a Student
		//this.router.post('/students/:id/homework_tasks', this.controller);

		//// Get Homework Tasks for a Student
		//this.router.get('/students/:id/homework_tasks', this.controller);

		//// Update a Homework Task
		//this.router.put('/homework_tasks/:id', this.controller);

		//// Delete a Homework Task
		//this.router.delete('/homework_tasks/:id', this.controller);
	}
}

export default new UserRoutes().router;
