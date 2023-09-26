import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  Query,
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

  @Get('getByEmail')
  getUserByEmail(@Query('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
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

  @Patch(':id/refreshToken')
  updateRefreshToken(
    @Param('id') id: number,
    @Body('refreshToken') refreshToken: string,
  ): Promise<void> {
    try {
      /**
       * @TODO
       * Remove this route and replace it with messaging logic once
       * the messaging service is implemented
       * */
      return this.userService.updateRefreshToken(id, refreshToken);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id/refreshToken')
  getRefreshToken(@Param('id') id: number): Promise<string> {
    try {
      return this.userService.getRefreshToken(id);
    } catch (error) {
      throw error;
    }
  }
}
