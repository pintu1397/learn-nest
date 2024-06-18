import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService : DatabaseService){}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    //return 'This action adds a new employee';
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(role ?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
   
    if(role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    })
    
    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    //return `This action returns a #${id} employee`;
    return this.databaseService.employee.findUnique({
      where : {
        //id : id,
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    //return `This action updates a #${id} employee`;
   // await this.findOne(id);
    return this.databaseService.employee.update({
      where : {
        id,
      },
      data: updateEmployeeDto,
    })
  }

  async remove(id: number) {
    //return `This action removes a #${id} employee`;
    return this.databaseService.employee.delete({
      where : {
        id,
      }
    })
  }
}
