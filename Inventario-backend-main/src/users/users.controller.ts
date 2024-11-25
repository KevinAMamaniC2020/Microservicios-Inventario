import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    await this.usersService.validateUser(dto);
    return { message: 'Login successful' };
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
