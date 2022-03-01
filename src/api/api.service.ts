import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async listOrders() {
    return await this.apiGetRequest('/orders');
  }

  async apiGetRequest(endpoint): Promise<any> {
    // DEV Account Login
    const config = {
      headers: {
        Authorization:
          'Basic N2JjOGFkZjdkMjYzNGU1YmFkYzRlYjVjMmU1NzJiZGI6OGY2NmVhNDcxOTVkNGZkYzg1MjVhOWYwZjM3ODhjNzI=',
      },
    };

    const url = `https://ssapi.shipstation.com${endpoint}`;

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
}
