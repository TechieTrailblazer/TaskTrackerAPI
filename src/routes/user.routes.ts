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
		this.router.post('/', this.controller.create);

		// Retrieve all Students when have no arguments, or find by email or username with
		this.router.get('/', this.controller.findAll);

		// Retrieve a single Student by id
		this.router.get('/:id', this.controller.findOne);

		// Update a Student with id
		this.router.put('/:id', this.controller.update);

		// Delete a Student with id
		this.router.delete('/:id', this.controller.delete);
	}
}

export default new UserRoutes().router;
