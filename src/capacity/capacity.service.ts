import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capacity } from '../entity/capacity.entity';
import { CapacityPrice } from '../entity/capacity-price.entity';
import { CapacityResponseDto } from '../dto/capacity-response.dto';
import { UpdateCapacityPriceDto } from '../dto/capacity-price.dto';

@Injectable()
export class CapacityService {
  constructor(
    @InjectRepository(Capacity)
    private capacityRepository: Repository<Capacity>,
    @InjectRepository(CapacityPrice)
    private capacityPriceRepository: Repository<CapacityPrice>,
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

    query.orderBy('capacity.created_at', 'DESC');

    const capacities = await query.getMany();

    return capacities.map((capacity) => ({
      id: capacity.id,
      value: capacity.value,
      unit: capacity.unit,
      display_name: capacity.display_name,
    }));
  }

  public async getCapacityById(id: CapacityResponseDto) {
    const query = this.capacityRepository
      .createQueryBuilder('capacity')
      .select([
        'capacity.id',
        'capacity.value',
        'capacity.unit',
        'capacity.display_name',
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

  public async updateCapacityPrice(
    capacityId: number,
    data: UpdateCapacityPriceDto,
  ) {
    const capacity = await this.capacityRepository.findOne({
      where: { id: capacityId },
      relations: ['price'],
    });

    if (!capacity) {
      throw new BadRequestException({
        message: 'Dung lượng không tồn tại',
        errors: [
          {
            field: 'capacity_id',
            message: `Không tìm thấy dung lượng với ID: ${capacityId}`,
          },
        ],
      });
    }

    if (!capacity.price) {
      const newCapacityPrice = this.capacityPriceRepository.create({
        capacity_id: capacityId,
        price: data.price,
        discount_price: data.discount_price,
      });
      await this.capacityPriceRepository.save(newCapacityPrice);
      return newCapacityPrice;
    }

    const priceUpdateData: Partial<CapacityPrice> = {};

    // Only update fields that have changed
    if (data.price !== undefined && data.price !== capacity.price.price) {
      priceUpdateData.price = data.price;
    }
    if (
      data.discount_price !== undefined &&
      data.discount_price !== capacity.price.discount_price
    ) {
      priceUpdateData.discount_price = data.discount_price;
    }

    // Only perform update if there are actual changes
    if (Object.keys(priceUpdateData).length > 0) {
      await this.capacityPriceRepository.update(
        capacity.price.id,
        priceUpdateData,
      );
    }

    return await this.capacityPriceRepository.findOne({
      where: { id: capacity.price.id },
    });
  }
}
