import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get()
  hello() {
    return 'hello pizza!';
  }

  @Get('test')
  test() {
    const dummyWebhook = {
      resource_url:
        'https://ssapi13.shipstation.com/orders?importBatch=35340793-70d9-2f34-e5e2-2cfefea369c5',
      resource_type: 'ORDER_NOTIFY',
    };

    return this.apiService.getShipStationAPIAuthToken();

    // return this.newOrdersWebhook(dummyWebhook);
  }

  @Post('new-orders-webhook')
  async newOrdersWebhook(@Body() webhookBody) {
    return await this.apiService.handleNewOrdersWebhook(webhookBody);
  }
}
