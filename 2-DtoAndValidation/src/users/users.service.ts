import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Ravi Kumar",
      "email": "ravi.kumar@example.com",
      "role": "ADMIN"
    },
    {
      "id": 2,
      "name": "Anjali Sharma",
      "email": "anjali.sharma@example.com",
      "role": "INTERN"
    },
    {
      "id": 3,
      "name": "Vikram Singh",
      "email": "vikram.singh@example.com",
      "role": "ENGINEER"
    },
    {
      "id": 4,
      "name": "Pooja Verma",
      "email": "pooja.verma@example.com",
      "role": "ADMIN"
    },
    {
      "id": 5,
      "name": "Arjun Mehta",
      "email": "arjun.mehta@example.com",
      "role": "ENGINEER"
    }
  ]

  findAll(role ?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    if(role){
      const roles = this.users.filter(user => user.role === role)
      if(roles.length === 0){
        throw new NotFoundException('User role not found.')
      }
    }
    return this.users
  }

  findOne(id: number){
    const user = this.users.find(user => user.id === id)
    if(!user){
      throw new NotFoundException('User not found.')
    }
    return user
  }

  create(createUserDto: CreateUserDto){
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const highestId = usersByHighestId[0]?.id || 0
    const newUser = {
      id: highestId + 1,
      ...createUserDto

    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number,updateUserDto: UpdateUserDto){
    this.users = this.users.map(user => {
      if(user.id === id){
        return {...user, ...updateUserDto}
      }
      return user
    })
    return this.findOne(id)
  }

  delete(id: number){
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
  
}
