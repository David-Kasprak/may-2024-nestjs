import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { BaseQueryDto } from '../common/validator/base.query.validator';

@Injectable()
export class UserService {
  private userList = [];

  create(createUserDto: UserDto) {
    const index = new Date().valueOf();
    this.userList.push({
      ...createUserDto,
      id: index,
    });
    return this.userList[0];
  }

  findAll(data: BaseQueryDto) {
    return this.userList;
  }

  findOne(id: number) {
    return this.userList.find((user) => user.id == id);
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
