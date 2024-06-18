import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // users
export class UsersController {

  constructor(private readonly userService: UsersService){}  

  /*
  GET /users
  GET /users/:id
  POST /users
  PATCH /users/:id
  DELETE /users/:id
  */
 @Get()  //GET /users or /users?role=value
 findAll(@Query('role') role ?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
  //return []
  return this.userService.findAll(role)
 }

 @Get(':id') //GET /users/:id
 findOne(@Param('id') id: string){
  //return { id }
  return this.userService.findOne(+id)
 }

 @Post() // POST /users
 create(@Body() user: {name:string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
  return this.userService.create(user)
 }

 @Patch(':id') //PATCH /users/:id
 update(@Param('id') id: string, @Body() userUpdate:{name ?:string, email ?: string, role ?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
  //return { id, ...userUpdate }
  return this.userService.update(+id,userUpdate)
 }

 @Delete(':id') //DELETE /users/:id
 delete(@Param('id') id: string){
  //return { id }
  return this.userService.delete(+id)
 }

}
