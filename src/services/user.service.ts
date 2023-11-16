import { IUser } from '../models/user.model';
import userRepository from '../repositories/user.repository';

export class UserService {
	async create(user: IUser): Promise<IUser> {
		// Добавьте здесь логику валидации или обработки данных перед сохранением в репозиторий
		return await userRepository.save(user);
	}

	async findAll(searchParams: { name?: string; email?: string }): Promise<IUser[]> {
		return await userRepository.retrieveAll({ name: searchParams.name, email: searchParams.email });
	}

	async findOne(id: number): Promise<IUser | null> {
		return await userRepository.retrieveById(id);
	}

	async update(user: IUser): Promise<number> {
		return await userRepository.update(user);
	}

	async delete(id: number): Promise<number> {
		return await userRepository.delete(id);
	}
}
