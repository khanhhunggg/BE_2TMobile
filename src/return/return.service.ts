import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return, ReturnType } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';
import {
  CreateReturnDto,
  UpdateReturnDto,
  CreateReturnDetailDto,
} from '../dto/return.dto';
import { ReturnStatus } from '../entity/return-detail.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { PurchaseOrderItem } from '../entity/purchase-order-item.entity';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(Return)
    private returnRepository: Repository<Return>,
    @InjectRepository(ReturnDetail)
    private returnDetailRepository: Repository<ReturnDetail>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(PurchaseOrderItem)
    private purchaseDetailRepository: Repository<PurchaseOrderItem>,
  ) {}

  async create(createReturnDto: CreateReturnDto): Promise<Return> {
    // Kiểm tra xem có ít nhất một trong hai ID được cung cấp
    if (!createReturnDto.orderDetailId && !createReturnDto.purchaseDetailId) {
      throw new BadRequestException(
        'Either orderDetailId or purchaseDetailId must be provided',
      );
    }

    // Kiểm tra sự tồn tại của order detail nếu được cung cấp
    if (createReturnDto.orderDetailId) {
      const orderDetail = await this.orderDetailRepository.findOne({
        where: { id: createReturnDto.orderDetailId },
      });
      if (!orderDetail) {
        throw new BadRequestException(
          `Order detail with ID ${createReturnDto.orderDetailId} not found`,
        );
      }
    }

    // Kiểm tra sự tồn tại của purchase detail nếu được cung cấp
    if (createReturnDto.purchaseDetailId) {
      const purchaseDetail = await this.purchaseDetailRepository.findOne({
        where: { id: createReturnDto.purchaseDetailId },
      });
      if (!purchaseDetail) {
        throw new BadRequestException(
          `Purchase detail with ID ${createReturnDto.purchaseDetailId} not found`,
        );
      }
    }

    const returnEntity = this.returnRepository.create(createReturnDto);
    return await this.returnRepository.save(returnEntity);
  }

  async findAll(
    status?: ReturnStatus,
    type?: string,
    customerId?: number,
  ): Promise<Return[]> {
    const queryBuilder = this.returnRepository
      .createQueryBuilder('return')
      .leftJoinAndSelect('return.returnDetails', 'returnDetails')
      .leftJoinAndSelect('return.orderDetail', 'orderDetail')
      .leftJoinAndSelect('return.purchaseDetail', 'purchaseDetail');

    if (status) {
      queryBuilder.andWhere('returnDetails.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('return.type = :type', { type });
    }

    if (customerId) {
      queryBuilder.andWhere('return.customerId = :customerId', { customerId });
    }

    return await queryBuilder.getMany();
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

    // Kiểm tra xem có ít nhất một trong hai ID được cung cấp
    if (!updateReturnDto.orderDetailId && !updateReturnDto.purchaseDetailId) {
      throw new BadRequestException(
        'Either orderDetailId or purchaseDetailId must be provided',
      );
    }

    // Kiểm tra order detail nếu được cập nhật
    if (updateReturnDto.orderDetailId) {
      const orderDetail = await this.orderDetailRepository.findOne({
        where: { id: updateReturnDto.orderDetailId },
      });
      if (!orderDetail) {
        throw new BadRequestException(
          `Order detail with ID ${updateReturnDto.orderDetailId} not found`,
        );
      }
    }

    // Kiểm tra purchase detail nếu được cập nhật
    if (updateReturnDto.purchaseDetailId) {
      const purchaseDetail = await this.purchaseDetailRepository.findOne({
        where: { id: updateReturnDto.purchaseDetailId },
      });
      if (!purchaseDetail) {
        throw new BadRequestException(
          `Purchase detail with ID ${updateReturnDto.purchaseDetailId} not found`,
        );
      }
    }

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

  async getReturnDetails(
    returnId: number,
    status?: ReturnStatus,
  ): Promise<ReturnDetail[]> {
    const returnEntity = await this.findOne(returnId);

    if (status) {
      return returnEntity.returnDetails.filter(
        (detail) => detail.status === status,
      );
    }

    return returnEntity.returnDetails;
  }
}
