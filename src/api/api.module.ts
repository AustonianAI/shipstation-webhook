import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [HttpModule, ConfigModule],
})
export class ApiModule {}
