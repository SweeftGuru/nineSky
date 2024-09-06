import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { Parcel } from 'libs/entities/parcel.entity';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) {}

  async create(createParcelDto: CreateParcelDto): Promise<Parcel> {
    try {
      const parcel = this.parcelRepository.create(createParcelDto);
      return await this.parcelRepository.save(parcel);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new parcel');
    }
  }

  async findAll(): Promise<Parcel[]> {
    try {
      return await this.parcelRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve parcels');
    }
  }

  async findOne(id: number): Promise<Parcel> {
    try {
      const parcel = await this.parcelRepository.findOneBy({ tracking_id: id });
      if (!parcel) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }
      return parcel;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve parcel with ID ${id}`,
      );
    }
  }

  async update(id: number, updateParcelDto: UpdateParcelDto): Promise<Parcel> {
    try {
      const parcel = await this.parcelRepository.preload({
        tracking_id: id,
        ...updateParcelDto,
      });

      if (!parcel) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }

      return await this.parcelRepository.save(parcel);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update parcel with ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.parcelRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete parcel with ID ${id}`,
      );
    }
  }
}
