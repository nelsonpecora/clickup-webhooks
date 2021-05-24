import { HttpService, Injectable } from '@nestjs/common';
import { Task, PartialTask } from './interfaces/Task';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  clickUpBaseUrl = this.configService.get<string>('clickUp.baseUrl');
  apitoken = this.configService.get<string>('clickUp.apiToken');
  correspondanceListId = this.configService.get<string>('correspondenceListId');
  correspondText = this.configService.get<string>('correspondText');
  getHello(): string {
    return 'Hello World!';
  }
  async parseTask(task: Task): Promise<Task> {
    if (
      task.name.toLowerCase().startsWith(this.correspondText) &&
      task.parent !== null
    ) {
      const parent: AxiosResponse<Task> = await this.getTask(task.parent);
      const createdTask = await this.createTask(
        this.generateCorrespndenceTask(task, parent.data),
      );
      return createdTask.data;
    }
  }
  async getTask(taskId: string, includeSubtasks?: boolean) {
    const queryParams = includeSubtasks ? '?include_subtasks=true' : '';

    return this.httpService
      .get(`${this.clickUpBaseUrl}/task/${taskId}/${queryParams}`, {
        headers: {
          Authorization: `${this.apitoken}`,
        },
      })
      .toPromise();
  }
  generateCorrespndenceTask(task: Task, parent: Task): Task {
    return {
      name: task.name.substring(this.correspondText.length + 1),
      description: parent.description,
      archived: false,
      creator: parent.creator,
      assignees: parent.assignees.map((a) => {
        return a?.id ?? a;
      }),
      date_created: '',
      date_updated: '',
      folder: undefined,
      id: '',
      list: undefined,
      parent: null,
      project: undefined,
      space: undefined,
      status: undefined,
      team_id: '',
      url: '',
    };
  }
  createTask(task: Task): Promise<AxiosResponse<Task>> {
    return this.httpService
      .post(
        `${this.clickUpBaseUrl}/list/${this.correspondanceListId}/task/`,
        task,
        {
          headers: {
            Authorization: `${this.apitoken}`,
          },
        },
      )
      .toPromise();
  }
  updateTask(taskId: string, task: PartialTask): Promise<AxiosResponse<Task>> {
    return this.httpService
      .put(
        `${this.clickUpBaseUrl}/task/${taskId}`,
        task,
        {
          headers: {
            Authorization: `${this.apitoken}`,
          },
        },
      )
      .toPromise();
  }
}
