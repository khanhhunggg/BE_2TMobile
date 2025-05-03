import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../entity/vendor.entity';
import { VendorResponseDto } from '../dto/vendor-response.dto';
import {
  CreateVendorDto,
  UpdateVendorDto,
  DeleteVendorDto,
} from '../dto/vendor-response.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  public async doCreateVendor(data: CreateVendorDto) {
    const vendor = this.vendorRepository.create({
      vendorCode: data.vendor_code,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      contactPersonId: data.contact_person_id,
    });

    const savedVendor = await this.vendorRepository.save(vendor);

    return {
      id: savedVendor.id,
      vendor_code: savedVendor.vendorCode,
      name: savedVendor.name,
      phone: savedVendor.phone,
      email: savedVendor.email,
      address: savedVendor.address,
      contact_person_id: savedVendor.contactPersonId,
    };
  }

  public async doUpdateVendor(data: UpdateVendorDto) {
    const vendor = await this.vendorRepository.findOne({
      where: { id: data.id },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    const updateData: Partial<Vendor> = {};
    if (data.vendor_code) updateData.vendorCode = data.vendor_code;
    if (data.name) updateData.name = data.name;
    if (data.phone) updateData.phone = data.phone;
    if (data.email) updateData.email = data.email;
    if (data.address) updateData.address = data.address;
    if (data.contact_person_id)
      updateData.contactPersonId = data.contact_person_id;

    await this.vendorRepository.update(data.id, updateData);

    const updatedVendor = await this.vendorRepository.findOne({
      where: { id: data.id },
    });

    return {
      id: updatedVendor.id,
      vendor_code: updatedVendor.vendorCode,
      name: updatedVendor.name,
      phone: updatedVendor.phone,
      email: updatedVendor.email,
      address: updatedVendor.address,
      contact_person_id: updatedVendor.contactPersonId,
    };
  }

  public async doDeleteVendor(data: DeleteVendorDto) {
    const vendor = await this.vendorRepository.findOne({
      where: { id: data.id },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    await this.vendorRepository.delete(data.id);
    return { message: 'Vendor deleted successfully' };
  }

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

  public async deleteVendorsByContactPerson(contactPersonId: number) {
    return await this.vendorRepository.delete({
      contactPersonId: contactPersonId,
    });
  }
}
