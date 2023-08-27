import { User } from "./User";

export interface Token {
  id: number;
  body: string;
  userId: number;
  expiredTime: string;
  user?: User;
}
