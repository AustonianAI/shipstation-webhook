import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [HttpModule],
})
export class ApiModule {}
