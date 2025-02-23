import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  homePage(): string {
    return 'Energy Consumption Tracker API';
  }
}
