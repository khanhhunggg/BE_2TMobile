import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entity/discount.entity';
import { DiscountUser } from '../entity/discountUser.entity';
import {
  CreateDiscountDto,
  DeleteDiscountDto,
  GetDiscountByIdDto,
  RemoveDiscountFromUserDto,
  SearchDiscountDto,
  UpdateDiscountDto,
} from 'src/dto/discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
    @InjectRepository(DiscountUser)
    private readonly discountUserRepository: Repository<DiscountUser>,
  ) {}

  public async doCreateDiscount(discount: CreateDiscountDto) {
    try {
      if (!discount.title) {
        throw new BadRequestException({
          message: 'Tiêu đề khuyến mãi không được để trống',
          errors: [
            {
              field: 'title',
              message: 'Tiêu đề khuyến mãi không được để trống',
            },
          ],
        });
      }

      if (discount.title && discount.title.length > 255) {
        throw new BadRequestException({
          message: 'Tiêu đề khuyến mãi quá dài',
          errors: [
            {
              field: 'title',
              message: 'Tiêu đề khuyến mãi không được vượt quá 255 ký tự',
            },
          ],
        });
      }

      if (discount.discount_value < 0) {
        throw new BadRequestException({
          message: 'Giá trị khuyến mãi không hợp lệ',
          errors: [
            {
              field: 'discount_value',
              message: 'Giá trị khuyến mãi không được nhỏ hơn 0',
            },
          ],
        });
      }

      const startDate = new Date(discount.start_date);
      const endDate = new Date(discount.end_date);

      if (startDate >= endDate) {
        throw new BadRequestException({
          message: 'Thời gian khuyến mãi không hợp lệ',
          errors: [
            {
              field: 'end_date',
              message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
            },
          ],
        });
      }

      const newDiscount = this.discountRepository.create({
        title: discount.title,
        description: discount.description,
        discount_type: discount.discount_type,
        discount_value: discount.discount_value,
        start_date: startDate,
        end_date: endDate,
        is_active: discount.is_active ?? true,
      });

      return await this.discountRepository.save(newDiscount);
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi tạo khuyến mãi',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetAllDiscount(searchParams: SearchDiscountDto) {
    try {
      const {
        title,
        discount_type,
        is_active,
        page = 1,
        size = 10,
      } = searchParams;

      const queryBuilder =
        this.discountRepository.createQueryBuilder('discount');

      if (title) {
        queryBuilder.andWhere('discount.title LIKE :title', {
          title: `%${title}%`,
        });
      }

      if (discount_type) {
        queryBuilder.andWhere('discount.discount_type = :discount_type', {
          discount_type,
        });
      }

      if (is_active !== undefined) {
        queryBuilder.andWhere('discount.is_active = :is_active', { is_active });
      }

      const skip = (page - 1) * size;
      queryBuilder.skip(skip).take(size);

      const [discounts, total] = await queryBuilder.getManyAndCount();

      return {
        data: discounts,
        pagination: {
          total,
          page,
          size,
          total_pages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi lấy danh sách khuyến mãi',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetDiscountById(data: GetDiscountByIdDto) {
    try {
      if (!data.id) {
        throw new BadRequestException({
          message: 'ID khuyến mãi không hợp lệ',
          errors: [
            {
              field: 'id',
              message: 'ID khuyến mãi không được để trống',
            },
          ],
        });
      }

      const discount = await this.discountRepository.findOne({
        where: { id: data.id },
      });

      if (!discount) {
        throw new BadRequestException({
          message: 'Không tìm thấy khuyến mãi',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy khuyến mãi với ID: ${data.id}`,
            },
          ],
        });
      }

      return discount;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin khuyến mãi',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doUpdateDiscount(data: UpdateDiscountDto) {
    try {
      const existingDiscount = await this.discountRepository.findOne({
        where: { id: data.id },
      });

      if (!existingDiscount) {
        throw new BadRequestException({
          message: 'Không tìm thấy khuyến mãi',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy khuyến mãi với ID: ${data.id}`,
            },
          ],
        });
      }

      const discountUpdateData: Partial<Discount> = {};

      // Only update fields that have changed
      if (data.title !== undefined && data.title !== existingDiscount.title) {
        discountUpdateData.title = data.title;
      }
      if (
        data.description !== undefined &&
        data.description !== existingDiscount.description
      ) {
        discountUpdateData.description = data.description;
      }
      if (
        data.discount_type !== undefined &&
        data.discount_type !== existingDiscount.discount_type
      ) {
        discountUpdateData.discount_type = data.discount_type;
      }
      if (
        data.discount_value !== undefined &&
        data.discount_value !== existingDiscount.discount_value
      ) {
        discountUpdateData.discount_value = data.discount_value;
      }
      if (data.start_date !== undefined) {
        const newStartDate = new Date(data.start_date);
        if (newStartDate.getTime() !== existingDiscount.start_date.getTime()) {
          discountUpdateData.start_date = newStartDate;
        }
      }
      if (data.end_date !== undefined) {
        const newEndDate = new Date(data.end_date);
        if (newEndDate.getTime() !== existingDiscount.end_date.getTime()) {
          discountUpdateData.end_date = newEndDate;
        }
      }
      if (
        data.is_active !== undefined &&
        data.is_active !== existingDiscount.is_active
      ) {
        discountUpdateData.is_active = data.is_active;
      }

      // Only perform update if there are actual changes
      if (Object.keys(discountUpdateData).length > 0) {
        await this.discountRepository.update(data.id, discountUpdateData);
      }

      return await this.doGetDiscountById({ id: data.id });
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật khuyến mãi',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doDeleteDiscount(data: DeleteDiscountDto) {
    try {
      const existingDiscount = await this.discountRepository.findOne({
        where: { id: data.id },
      });

      if (!existingDiscount) {
        throw new BadRequestException({
          message: 'Không tìm thấy khuyến mãi',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy khuyến mãi với ID: ${data.id}`,
            },
          ],
        });
      }

      await this.discountRepository.delete(data.id);

      return {
        message: 'Xóa khuyến mãi thành công',
        data: {
          id: data.id,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi xóa khuyến mãi',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async assignDiscountToUser(discountId: number, userId: number) {
    try {
      const discount = await this.discountRepository.findOne({
        where: { id: discountId },
      });

      if (!discount) {
        throw new BadRequestException({
          message: 'Khuyến mãi không tồn tại',
          errors: [
            {
              field: 'discount_id',
              message: 'Khuyến mãi không tồn tại',
            },
          ],
        });
      }

      const existingAssignment = await this.discountUserRepository.findOne({
        where: {
          discountId,
          userId,
        },
      });

      if (existingAssignment) {
        throw new BadRequestException({
          message: 'Khuyến mãi đã được gán cho người dùng này',
          errors: [
            {
              field: 'user_id',
              message: 'Khuyến mãi đã được gán cho người dùng này',
            },
          ],
        });
      }

      const newAssignment = this.discountUserRepository.create({
        discountId,
        userId,
      });

      return await this.discountUserRepository.save(newAssignment);
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi gán khuyến mãi cho người dùng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async removeDiscountFromUser(data: RemoveDiscountFromUserDto) {
    try {
      const existingAssignment = await this.discountUserRepository.findOne({
        where: {
          discountId: data.discount_id,
          userId: data.user_id,
        },
      });

      if (!existingAssignment) {
        throw new BadRequestException({
          message: 'Không tìm thấy khuyến mãi được gán cho người dùng này',
          errors: [
            {
              field: 'user_id',
              message: 'Không tìm thấy khuyến mãi được gán cho người dùng này',
            },
          ],
        });
      }

      await this.discountUserRepository.delete({
        discountId: data.discount_id,
        userId: data.user_id,
      });

      return {
        message: 'Gỡ khuyến mãi khỏi người dùng thành công',
        data: {
          discountId: data.discount_id,
          userId: data.user_id,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi gỡ khuyến mãi khỏi người dùng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
