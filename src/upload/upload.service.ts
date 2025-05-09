import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File | string): Promise<string> {
    try {
      console.log(file);
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${uuidv4()}-${typeof file === 'string' ? 'image.jpg' : file.originalname}`;
      const filePath = path.join(uploadDir, fileName);

      let fileBuffer: Buffer;
      if (typeof file === 'string' && file.startsWith('data:')) {
        const base64Data = file.split(',')[1];
        fileBuffer = Buffer.from(base64Data, 'base64');
      } else if (typeof file === 'object' && file.buffer) {
        fileBuffer = file.buffer;
      } else {
        throw new Error('Invalid file data: No buffer or base64 data provided');
      }

      fs.writeFileSync(filePath, fileBuffer);

      const baseUrl = this.configService.get<string>(
        'BASE_URL',
        'http://localhost:3300',
      );
      return `${baseUrl}/uploads/${fileName}`;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadMultipleFiles(
    files: (Express.Multer.File | string)[],
  ): Promise<string[]> {
    try {
      const uploadPromises = files.map((file) => this.uploadFile(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Failed to upload files: ${error.message}`);
    }
  }
}
