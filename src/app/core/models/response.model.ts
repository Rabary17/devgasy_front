import { Profile } from './profile.model';

export interface Response {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
