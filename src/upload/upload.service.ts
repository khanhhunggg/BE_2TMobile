import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File | string): Promise<string> {
    try {
      let uploadResult;

      if (typeof file === 'string' && file.startsWith('data:')) {
        const base64Data = file.split(',')[1];
        uploadResult = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${base64Data}`,
          {
            resource_type: 'auto',
          },
        );
      } else if (typeof file === 'object' && file.buffer) {
        const stream = Readable.from(file.buffer);
        uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          stream.pipe(uploadStream);
        });
      } else {
        throw new Error('Invalid file data: No buffer or base64 data provided');
      }
      return uploadResult.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
    }
  }

  async uploadMultipleFiles(
    files: (Express.Multer.File | string)[],
  ): Promise<string[]> {
    try {
      if (!files || !Array.isArray(files) || files.length === 0) {
        throw new Error('No files provided for upload');
      }

      const uploadPromises = files.map((file) => this.uploadFile(file));
      const results = await Promise.all(uploadPromises);

      const validResults = results.filter((url): url is string => !!url);

      if (validResults.length !== files.length) {
        throw new Error('Some files failed to upload successfully');
      }
      return validResults;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `Failed to upload files to Cloudinary: ${error.message}`,
      );
    }
  }
}
