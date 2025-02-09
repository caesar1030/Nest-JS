import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEamil(email: UsersModel['email']) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(user: Pick<UsersModel, 'email' | 'nickname' | 'password'>) {
    const nicknameExists = await this.usersRepository.exists({
      where: {
        nickname: user.nickname,
      },
    });

    if (nicknameExists)
      throw new BadRequestException('이미 존재하는 nickname 입니다!');

    const emailExists = await this.usersRepository.exists({
      where: {
        email: user.email,
      },
    });

    if (emailExists)
      throw new BadRequestException('이미 존재하는 email 입니다!');

    const userObject = this.usersRepository.create(user);

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }
}
