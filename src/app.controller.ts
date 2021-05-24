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
  @Post('/task-date-changed')
  async whenTaskDateChanged(@Body() body: TaskResponse): Promise<boolean> {
    const task = body.payload;

    if (task.parent) {
      // Fetch the parent task, and check its subtasks.
      const parentId = task.parent;
      const { data: parent } = await this.appService.getTask(parentId, true);

      // Get the latest subtask due date. This is the date we'll set the
      // parent to, if the parent task isn't already set far enough in the future.
      const latestDate = (parent.subtasks || []).reduce((acc, subtask) => {
        return subtask.due_date && subtask.due_date > acc ? subtask.due_date : acc;
      }, parent.due_date);

      // If the latest due date is different than the current parent date,
      // update the parent to the new due date.
      if (latestDate !== parent.due_date) {
        this.appService.updateTask(parentId, { due_date: latestDate });
      }
    }
    return true;
  }
}
