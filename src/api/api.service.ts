import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable()
export class ApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async handleNewOrdersWebhook(webhookBody): Promise<any> {
    if (webhookBody.resource_type !== 'ORDER_NOTIFY') {
      return;
    }

    const newOrders = await this.apiGetRequest(webhookBody.resource_url, true);

    if (newOrders.orders.length > 0) {
      // TODO: START YOUR APP'S BUSINESS LOGIC HERE
      return newOrders;
    }
  }

  async apiGetRequest(endpoint: string, fullUrl?: boolean): Promise<any> {
    const config = {
      headers: {
        Authorization: `Basic ${this.getShipStationAPIAuthToken()}`,
      },
    };

    let url = `https://ssapi.shipstation.com${endpoint}`;
    if (fullUrl) {
      url = endpoint;
    }

    return await lastValueFrom(
      this.httpService.get(url, config).pipe(
        map((response: AxiosResponse) => response.data),
        retry(3),
        catchError((error) => {
          throw new BadRequestException(
            `Failed to GET request with ShipStation API - ${error} ; URL: ${url}`,
          );
        }),
      ),
    );
  }

  getShipStationAPIAuthToken(): string {
    const apiKey = this.configService.get('SS_TEST_STORE_API_KEY');
    const apiSecret = this.configService.get('SS_TEST_STORE_API_SECRET');

    const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    return token;
  }
}
