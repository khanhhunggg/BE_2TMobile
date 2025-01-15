import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

const sendGridProvider = {
  provide: 'SendGridToken',
  useFactory: (configService: ConfigService) => {
    return configService.get('SENDGRID_API_KEY');
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [sendGridProvider],
  exports: ['SendGridToken'],
})
export class CommonModule {}
