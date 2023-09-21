import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(userDto: CreateUserDto) {
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(userDto.password, salt);
      userDto.password = hashedPassword;
      return this.usersRepository.save(userDto);
    } catch (error) {
      throw error;
    }
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateUser(id: number, userDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.first_name = userDto.firstName || user.first_name;
      user.last_name = userDto.lastName || user.last_name;
      await this.usersRepository.update(id, user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }

      const user = await this.usersRepository.findOneBy({ email });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
