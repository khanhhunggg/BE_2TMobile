import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capacity } from '../entity/capacity.entity';
import { CapacityResponseDto } from '../dto/capacity-response.dto';

@Injectable()
export class CapacityService {
  constructor(
    @InjectRepository(Capacity)
    private capacityRepository: Repository<Capacity>,
  ) {}

  public async getAllCapacities(data: CapacityResponseDto) {
    const query = this.capacityRepository
      .createQueryBuilder('capacity')
      .select([
        'capacity.id',
        'capacity.value',
        'capacity.unit',
        'capacity.display_name',
      ]);

    if (data.value) {
      query.andWhere('capacity.value = :value', { value: data.value });
    }

    if (data.unit) {
      query.andWhere('capacity.unit = :unit', { unit: data.unit });
    }

    if (data.display_name) {
      query.andWhere('capacity.display_name LIKE :display_name', {
        display_name: `%${data.display_name}%`,
      });
    }

    const page = data.page || 1;
    const size = data.size || 10;

    query.skip((page - 1) * size).take(size);
    query.orderBy('capacity.created_at', 'DESC');

    const [capacities, total] = await query.getManyAndCount();

    return {
      data: capacities.map((capacity) => ({
        id: capacity.id,
        value: capacity.value,
        unit: capacity.unit,
        display_name: capacity.display_name,
      })),
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }

  public async getCapacityById(id: CapacityResponseDto) {
    const query = this.capacityRepository
      .createQueryBuilder('capacity')
      .select([
        'capacity.id',
        'capacity.value',
        'capacity.unit',
        'capacity.display_name',
        'capacity.created_at',
        'capacity.updated_at',
      ])
      .where('capacity.id = :id', { id: id.id });

    const capacity = await query.getOne();

    if (!capacity) {
      throw new Error('Capacity not found');
    }

    return {
      id: capacity.id,
      value: capacity.value,
      unit: capacity.unit,
      display_name: capacity.display_name,
    };
  }
}
