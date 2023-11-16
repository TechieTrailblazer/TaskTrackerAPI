import { IHomework } from '../models/homework.model';
import homeworkRepository from '../repositories/homework.repository';

export class HomeworkService {
	async create(homework: IHomework): Promise<IHomework> {
		return await homeworkRepository.save(homework);
	}

	async findAll(searchParams: { task_description?: string }): Promise<IHomework[]> {
		return await homeworkRepository.retrieveAll({
			task_description: searchParams.task_description,
		});
	}

	async findAllById(id: number): Promise<IHomework[]> {
		return await homeworkRepository.retrieveAllByStudentId(id);
	}

	async update(homework: IHomework): Promise<number> {
		return await homeworkRepository.updateByTaskId(homework);
	}

	async delete(id: number): Promise<number> {
		return await homeworkRepository.delete(id);
	}
}
