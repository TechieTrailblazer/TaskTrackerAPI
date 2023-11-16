import { Request, Response } from 'express';
import homeworkRepository from '../repositories/homework.repository';
import { IHomework } from '../models/homework.model';

export default class HomeworkController {
	async create(req: Request, res: Response) {
		if (!req.body.student_id || !req.body.task_description || !req.body.deadline) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
			return;
		}

		try {
			const homework: IHomework = req.body;
			const savedHomework = await homeworkRepository.save(homework);

			res.status(201).send(savedHomework);
		} catch (err) {
			console.error('Error:', err);
			res.status(500).send({
				message: 'Some error occurred',
			});
		}
	}

	async findAll(req: Request, res: Response) {
		const task_description =
			typeof req.query.task_description === 'string' ? req.query.task_description : '';
		try {
			const homeworks = await homeworkRepository.retrieveAll({
				task_description: task_description,
			});
			if (homeworks.length === 0) {
				res.status(404).send({ message: 'No homeworks found.' });
			} else {
				res.status(200).send(homeworks);
			}
		} catch (err) {
			res.status(500).send({
				message: `Some error occurred while retrieving students`,
			});
		}
	}

	async findAllById(req: Request, res: Response) {
		const student_id: number = parseInt(req.params.student_id);

		try {
			const homework = await homeworkRepository.retrieveAllHomeworkByStudentId(student_id);

			if (homework) res.status(200).send(homework);
			else
				res.status(404).send({
					message: `Cannot find Homework with student_id=${student_id}.`,
				});
		} catch (err) {
			res.status(500).send({
				message: `Error retrieving Homework with student_id=${student_id}.`,
			});
		}
	}

	async update(req: Request, res: Response) {
		const homework: IHomework = req.body;
		homework.task_id = parseInt(req.params.task_id);

		try {
			const num = await homeworkRepository.updateByTaskId(homework);

			if (num == 1) {
				res.send({
					message: 'Homework was updated successfully.',
				});
			} else {
				res.send({
					message: `Cannot update Homework with id=${homework.task_id}. Maybe Homework was not found or req.body is empty!`,
				});
			}
		} catch (err) {
			res.status(500).send({
				message: `Error updating Homework with id=${homework.task_id}.`,
			});
		}
	}

	async delete(req: Request, res: Response) {
		const task_id: number = parseInt(req.params.task_id);

		try {
			const num = await homeworkRepository.delete(task_id);

			if (num == 1) {
				res.send({
					message: 'Homework was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete Homework with id=${task_id}. Maybe Homework was not found!`,
				});
			}
		} catch (err) {
			res.status(500).send({
				message: `Could not delete Homework with id==${task_id}.`,
			});
		}
	}
}
