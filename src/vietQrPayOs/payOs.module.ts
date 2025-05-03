import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayosService } from './payOs.service';
import { PayosController } from './payOs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';

const PayOS = require('@payos/node');

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [
    {
      provide: 'PAYOS_CLIENT',
      useFactory: (config: ConfigService) => {
        return new PayOS(
          config.get('PAYOS_CLIENT_ID'),
          config.get('PAYOS_API_KEY'),
          config.get('PAYOS_CHECKSUM_KEY'),
        );
      },
      inject: [ConfigService],
    },
    PayosService,
  ],
  controllers: [PayosController],
  exports: [PayosService],
})
export class PayosModule {}
