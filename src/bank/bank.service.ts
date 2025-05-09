import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../entity/bank.entity';
import {
  CreateBankDto,
  UpdateBankDto,
  GetBankByIdDto,
  SearchBankDto,
} from '../dto/bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  public async doCreateBank(createBankDto: CreateBankDto) {
    try {
      const existingBank = await this.bankRepository.findOne({
        where: { bank_number: createBankDto.bank_number },
      });

      if (existingBank) {
        throw new BadRequestException({
          message: 'Số tài khoản ngân hàng đã tồn tại',
          errors: [
            {
              field: 'bank_number',
              message: 'Số tài khoản ngân hàng đã tồn tại trong hệ thống',
            },
          ],
        });
      }

      const bank = this.bankRepository.create(createBankDto);
      return await this.bankRepository.save(bank);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi tạo tài khoản ngân hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doUpdateBank(updateBankDto: UpdateBankDto) {
    try {
      const bank = await this.bankRepository.findOne({
        where: { bank_account_id: updateBankDto.bank_account_id },
      });

      if (!bank) {
        throw new BadRequestException({
          message: 'Không tìm thấy tài khoản ngân hàng',
          errors: [
            {
              field: 'bank_account_id',
              message: `Không tìm thấy tài khoản ngân hàng với ID: ${updateBankDto.bank_account_id}`,
            },
          ],
        });
      }

      if (updateBankDto.bank_number !== bank.bank_number) {
        const existingBank = await this.bankRepository.findOne({
          where: { bank_number: updateBankDto.bank_number },
        });

        if (existingBank) {
          throw new BadRequestException({
            message: 'Số tài khoản ngân hàng đã tồn tại',
            errors: [
              {
                field: 'bank_number',
                message: 'Số tài khoản ngân hàng đã tồn tại trong hệ thống',
              },
            ],
          });
        }
      }

      Object.assign(bank, updateBankDto);
      return await this.bankRepository.save(bank);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật tài khoản ngân hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doGetBankById(data: GetBankByIdDto) {
    try {
      const bank = await this.bankRepository.findOne({
        where: { bank_account_id: data.bank_account_id },
      });

      if (!bank) {
        throw new BadRequestException({
          message: 'Không tìm thấy tài khoản ngân hàng',
          errors: [
            {
              field: 'bank_account_id',
              message: `Không tìm thấy tài khoản ngân hàng với ID: ${data.bank_account_id}`,
            },
          ],
        });
      }

      return bank;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin tài khoản ngân hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doGetAllBanks(searchParams: SearchBankDto) {
    try {
      const { keyword, page = 1, size = 10 } = searchParams;

      const queryBuilder = this.bankRepository.createQueryBuilder('bank');

      if (keyword) {
        queryBuilder
          .where('bank.bank_name LIKE :keyword', { keyword: `%${keyword}%` })
          .orWhere('bank.bank_number LIKE :keyword', {
            keyword: `%${keyword}%`,
          })
          .orWhere('bank.user_bank_name LIKE :keyword', {
            keyword: `%${keyword}%`,
          });
      }

      const skip = (page - 1) * size;
      queryBuilder.skip(skip).take(size);

      const [data, total] = await queryBuilder.getManyAndCount();

      return {
        data,
        pagination: {
          total,
          page,
          size,
          total_pages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi lấy danh sách tài khoản ngân hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doDeleteBank(id: number) {
    try {
      const bank = await this.bankRepository.findOne({
        where: { bank_account_id: id },
      });

      if (!bank) {
        throw new BadRequestException({
          message: 'Không tìm thấy tài khoản ngân hàng',
          errors: [
            {
              field: 'bank_account_id',
              message: `Không tìm thấy tài khoản ngân hàng với ID: ${id}`,
            },
          ],
        });
      }

      await this.bankRepository.remove(bank);
      return { message: 'Xóa tài khoản ngân hàng thành công' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi xóa tài khoản ngân hàng',
        errors: [{ message: error.message }],
      });
    }
  }
}
