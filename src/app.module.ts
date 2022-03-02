import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.state.${process.env.STAGE}`],
    }),
    ApiModule,
  ],
})
export class AppModule {}
