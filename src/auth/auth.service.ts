import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/pair-programming/models/user';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { IAuthProvider } from 'src/providers/auth-providers/auth-provider.interface';
import { GoogleAuthProvider } from 'src/providers/auth-providers/google-auth.provider';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(authDto: AuthDto) {
    const provider = this.getAuthProvider(authDto.provider);

    if (!provider) {
      return {
        status: false,
        message: 'Provider not found',
      };
    }

    const authData = await provider.validateToken(authDto.token);

    if (!authData.valid) {
      return {
        status: false,
        message: 'Invalid token',
      };
    }

    const user = await this.userModel.findOne({ email: authDto.email }).exec();

    if (!user) {
      return {
        status: false,
        message: "The account doesn't exist",
      };
    }

    return { status: true };
  }

  private getAuthProvider(providerName: string): IAuthProvider | undefined {
    const providers = new Map<string, IAuthProvider>();
    providers.set('google', new GoogleAuthProvider());
    return providers.get(providerName);
  }
}
