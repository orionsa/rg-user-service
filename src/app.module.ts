import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // password: 'postgres',
      username: 'postgres',
      entities: [User],
      database: 'test',
      synchronize: true,
      // logging: true,
    }),
    UsersModule,
  ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
