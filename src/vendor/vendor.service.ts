import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../entity/vendor.entity';
import { VendorResponseDto } from '../dto/vendor-response.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  public async getAllVendors(data: VendorResponseDto) {
    const query = this.vendorRepository
      .createQueryBuilder('vendor')
      .select(['vendor.id', 'vendor.vendorCode', 'vendor.name']);

    if (data.name) {
      query.andWhere('vendor.name LIKE :name', { name: `%${data.name}%` });
    }
    if (data.vendor_code) {
      query.andWhere('vendor.vendorCode = :vendorCode', {
        vendorCode: data.vendor_code,
      });
    }

    query.orderBy('vendor.createdAt', 'DESC');

    const vendors = await query.getMany();

    return vendors.map((vendor) => ({
      id: vendor.id,
      vendor_code: vendor.vendorCode,
      name: vendor.name,
    }));
  }

  public async getVendorById(id: VendorResponseDto) {
    const query = this.vendorRepository
      .createQueryBuilder('vendor')
      .select(['vendor.id', 'vendor.vendorCode', 'vendor.name'])
      .where('vendor.id = :id', { id: id.id });

    const vendor = await query.getOne();

    return {
      id: vendor.id,
      vendor_code: vendor.vendorCode,
      name: vendor.name,
    };
  }
}
