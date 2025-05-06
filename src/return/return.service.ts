import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';
import {
  CreateReturnDto,
  UpdateReturnDto,
  CreateReturnDetailDto,
} from '../dto/return.dto';
import { ReturnStatus } from '../entity/return-detail.entity';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(Return)
    private returnRepository: Repository<Return>,
    @InjectRepository(ReturnDetail)
    private returnDetailRepository: Repository<ReturnDetail>,
  ) {}

  async create(createReturnDto: CreateReturnDto): Promise<Return> {
    const returnEntity = this.returnRepository.create(createReturnDto);
    return await this.returnRepository.save(returnEntity);
  }

  async findAll(): Promise<Return[]> {
    return await this.returnRepository.find({
      relations: ['returnDetails', 'orderDetail', 'purchaseDetail'],
    });
  }

  async findOne(id: number): Promise<Return> {
    const returnEntity = await this.returnRepository.findOne({
      where: { id },
      relations: ['returnDetails', 'orderDetail', 'purchaseDetail'],
    });

    if (!returnEntity) {
      throw new NotFoundException(`Return with ID ${id} not found`);
    }

    return returnEntity;
  }

  async update(id: number, updateReturnDto: UpdateReturnDto): Promise<Return> {
    const returnEntity = await this.findOne(id);
    Object.assign(returnEntity, updateReturnDto);
    return await this.returnRepository.save(returnEntity);
  }

  async remove(id: number): Promise<void> {
    const returnEntity = await this.findOne(id);
    await this.returnRepository.remove(returnEntity);
  }

  async createReturnDetail(
    returnId: number,
    createReturnDetailDto: CreateReturnDetailDto,
  ): Promise<ReturnDetail> {
    const returnEntity = await this.findOne(returnId);
    const returnDetail = this.returnDetailRepository.create({
      ...createReturnDetailDto,
      return: returnEntity,
    });
    return await this.returnDetailRepository.save(returnDetail);
  }

  async updateReturnDetailStatus(
    returnId: number,
    detailId: number,
    status: ReturnStatus,
  ): Promise<ReturnDetail> {
    const returnDetail = await this.returnDetailRepository.findOne({
      where: { id: detailId, returnId },
    });

    if (!returnDetail) {
      throw new NotFoundException(
        `Return detail with ID ${detailId} not found for return ${returnId}`,
      );
    }

    returnDetail.status = status;
    return await this.returnDetailRepository.save(returnDetail);
  }

  async getReturnDetails(returnId: number): Promise<ReturnDetail[]> {
    const returnEntity = await this.findOne(returnId);
    return returnEntity.returnDetails;
  }
}
