import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '../entity/color.entity';
import { ColorResponseDto } from '../dto/color-response.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  public async getAllColors(data: ColorResponseDto) {
    const query = this.colorRepository
      .createQueryBuilder('color')
      .select([
        'color.id',
        'color.name',
        'color.color_code',
        'color.created_at',
        'color.updated_at',
      ]);

    if (data.name) {
      query.andWhere('color.name LIKE :name', { name: `%${data.name}%` });
    }
    if (data.color_code) {
      query.andWhere('color.color_code = :color_code', {
        color_code: data.color_code,
      });
    }

    query.skip((data.page - 1) * data.size).take(data.size);
    query.orderBy('color.created_at', 'DESC');

    const [colors, total] = await query.getManyAndCount();

    return {
      data: colors.map((color) => ({
        id: color.id,
        name: color.name,
        color_code: color.color_code,
        created_at: color.created_at,
        updated_at: color.updated_at,
      })),
      total,
      page: data.page,
      size: data.size,
      totalPages: Math.ceil(total / data.size),
    };
  }

  public async getColorById(id: ColorResponseDto) {
    const query = this.colorRepository
      .createQueryBuilder('color')
      .select([
        'color.id',
        'color.name',
        'color.color_code',
        'color.created_at',
        'color.updated_at',
      ])
      .where('color.id = :id', { id: id.id });

    const color = await query.getOne();

    if (!color) {
      throw new Error('Color not found');
    }

    return {
      id: color.id,
      name: color.name,
      color_code: color.color_code,
      created_at: color.created_at,
      updated_at: color.updated_at,
    };
  }
}
