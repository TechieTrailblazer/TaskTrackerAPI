import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';

const userService = new UserService();

export default class UserController {
	async create(req: Request, res: Response) {
		if (!req.body.name || !req.body.email) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
			return;
		}

		try {
			const user: IUser = req.body;
			const savedUser = await userService.create(user);

			res.status(201).send(savedUser);
		} catch (err) {
			console.error('Error:', err);
			res.status(500).send({
				message: 'Some error occurred',
			});
		}
	}

	async findAll(req: Request, res: Response) {
		const name = typeof req.query.name === 'string' ? req.query.name : '';
		const email = typeof req.query.email === 'string' ? req.query.email : '';
		try {
			const users = await userService.findAll({ name: name, email: email });
			if (users.length === 0) {
				res.status(404).send({ message: 'No users found.' });
			} else {
				res.status(200).send(users);
			}
		} catch (err) {
			res.status(500).send({
				message: `Some error occurred while retrieving students`,
			});
		}
	}

	async findOne(req: Request, res: Response) {
		const id: number = parseInt(req.params.id);

		try {
			const user = await userService.findOne(id);

			if (user) res.status(200).send(user);
			else
				res.status(404).send({
					message: `Cannot find student with id=${id}.`,
				});
		} catch (err) {
			res.status(500).send({
				message: `Error retrieving student with id=${id}.`,
			});
		}
	}

	async update(req: Request, res: Response) {
		const user: IUser = req.body;
		user.id = parseInt(req.params.id);

		try {
			const num = await userService.update(user);

			if (num == 1) {
				res.send({
					message: 'Student was updated successfully.',
				});
			} else {
				res.send({
					message: `Cannot update student with id=${user.id}. Maybe student was not found or req.body is empty!`,
				});
			}
		} catch (err) {
			res.status(500).send({
				message: `Error updating student with id=${user.id}.`,
			});
		}
	}

	async delete(req: Request, res: Response) {
		const id: number = parseInt(req.params.id);

		try {
			const num = await userService.delete(id);

			if (num == 1) {
				res.send({
					message: 'Student was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete student with id=${id}. Maybe student was not found!`,
				});
			}
		} catch (err) {
			res.status(500).send({
				message: `Could not delete student with id==${id}.`,
			});
		}
	}
}
