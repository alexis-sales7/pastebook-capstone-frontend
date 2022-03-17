import { User } from './user';

export interface Comment {
  id: string;
  content: string;
  datetimeCreated: string;
  user: User;
}
