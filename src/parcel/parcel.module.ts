import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
import { Parcel } from 'libs/entities/parcel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  controllers: [ParcelController],
  providers: [ParcelService],
})
export class ParcelModule {}
