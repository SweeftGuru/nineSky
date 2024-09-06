import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { LocalStrategy } from 'libs/jwt/local.strategy';
import { JwtStrategy } from 'libs/jwt/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, LocalStrategy ,JwtStrategy],
  exports: [UserService]
})
export class UserModule {}

