export interface TaskResponse {
  id: string;
  trigger_id: string;
  date: string;
  payload: Task;
}
export interface Assignee {
  id: number;
  username: string;
  color: string;
  initials: string;
  email: string;
  profilePicture?: string;
}
export interface Task {
  id?: string;
  custom_id?: null;
  name: string;
  text_content?: null;
  description?: null;
  status: Status;
  orderindex?: string;
  date_created: string;
  date_updated: string;
  date_closed?: null;
  archived: boolean;
  creator: Creator;
  assignees?: Assignee[] | null | number[];
  watchers?: WatchersEntity[] | null;
  checklists?: null[] | null;
  tags?: null[] | null;
  parent: string;
  priority?: null;
  due_date?: null;
  start_date?: null;
  points?: null;
  time_estimate?: null;
  custom_fields?: CustomFieldsEntity[] | null;
  dependencies?: null[] | null;
  linked_tasks?: null[] | null;
  team_id: string;
  url: string;
  list: List;
  project: ProjectOrFolder;
  folder: ProjectOrFolder;
  space: Space;
}
// PartialTask is the interface we send when updating tasks. Although
// it is implemented as a PUT in ClickUp's API, we only send partial values
// (the properties we want to update). To remove or unset a field, explicitly
// pass it in here as `null`.
export interface PartialTask {
  name?: string;
  text_content?: null;
  description?: null;
  status?: Status;
  orderindex?: string;
  archived?: boolean;
  tags?: null[] | null;
  priority?: null;
  due_date?: null;
  start_date?: null;
  points?: null;
  time_estimate?: null;
}
export interface Status {
  id: string;
  status: string;
  color: string;
  orderindex: number;
  type: string;
}
export interface Creator {
  id: number;
  username: string;
  color: string;
  email: string;
  profilePicture?: null;
}
export interface WatchersEntity {
  id: number;
  username: string;
  color: string;
  initials: string;
  email: string;
  profilePicture?: null;
}
export interface CustomFieldsEntity {
  id: string;
  name: string;
  type: string;
  type_config: TypeConfig;
  date_created: string;
  hide_from_guests: boolean;
  required: boolean;
}
export interface TypeConfig {
  default?: number | null;
  placeholder?: null;
  new_drop_down?: boolean | null;
  options?: OptionsEntity[] | null;
}
export interface OptionsEntity {
  id: string;
  name: string;
  color?: null;
  orderindex: number;
}
export interface List {
  id: string;
  name: string;
  access: boolean;
}
export interface ProjectOrFolder {
  id: string;
  name: string;
  hidden: boolean;
  access: boolean;
}
export interface Space {
  id: string;
}
