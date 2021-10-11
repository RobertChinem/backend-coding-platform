import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthProvider } from 'src/providers/auth-providers/auth-provider.interface';
import { GoogleAuthProvider } from 'src/providers/auth-providers/google-auth.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(authData: CreateUserDto) {
    const provider = this.getAuthProvider(authData.provider);
    const { email, valid } = await provider.validateToken(authData.token);

    if (!valid) {
      return {
        status: false,
        message: 'Invalid token',
      };
    }

    const userAlreadyExists = (await this.findByEmail(email)) !== null;

    if (userAlreadyExists) {
      return {
        status: false,
        message: 'User already exists',
      };
    }

    const user = new this.userModel({ email });
    return { status: true, user: await user.save() };
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  async findUserByToken(authData: { token: string; provider: string }) {
    const provider = this.getAuthProvider(authData.provider);
    if (!provider) return null;
    const { email, valid } = await provider.validateToken(authData.token);
    if (!valid) return null;
    return await this.findByEmail(email);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  private getAuthProvider(providerName: string): IAuthProvider | undefined {
    const providers = new Map<string, IAuthProvider>();
    providers.set('google', new GoogleAuthProvider());
    return providers.get(providerName);
  }
}
