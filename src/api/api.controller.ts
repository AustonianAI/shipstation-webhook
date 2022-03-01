import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('test')
  test() {
    return this.apiService.listOrders();
  }

  @Post('new-orders-webhook')
  async newOrdersWebhook(@Body() webhookBody) {
    console.log(webhookBody);

    return 'webhook received';
  }
}
