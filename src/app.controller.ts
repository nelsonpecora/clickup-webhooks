import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskResponse } from './interfaces/Task';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/task-created')
  async whenTaskCreated(@Body() body: TaskResponse): Promise<string> {
    const result = await this.appService.parseTask(body.payload);
    return JSON.stringify(result);
  }
}
