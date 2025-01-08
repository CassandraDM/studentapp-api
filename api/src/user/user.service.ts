import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/task/entities/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.createQueryBuilder('user').getMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.password', 'password')
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    await this.userRepository.update(id, updateUserDto);

    return updatedUser;
  }

  async remove(id: number): Promise<any> {
    const user = await this.findOne(id);

    const deletedUser = {
      ...user,
    };

    await this.userRepository.softDelete(id);

    return deletedUser;
  }
}
