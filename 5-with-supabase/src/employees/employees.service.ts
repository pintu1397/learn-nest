import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    await this.findOne(id);  // Ensure the employee exists
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);  // Ensure the employee exists
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
