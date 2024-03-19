import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, phone, password } = createUserDto;
    const dataCheck = await this.userModel.find({ email, phone }).exec();
    if(dataCheck.length == 0){
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      createUserDto['password'] = hash;
      const data = await this.userModel.create(createUserDto);
      return data;
    }else{
      return new Error('Email or Phone are existed !!!')
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
