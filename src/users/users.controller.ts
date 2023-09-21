import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<void> {
    try {
      await this.userService.create(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    try {
      return this.userService.updateUser(id, user);
    } catch (error) {
      throw error;
    }
  }
}
