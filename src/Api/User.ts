
export enum Gender {
  男 = 1,
  女 = 2,
}

export enum UserRole {
  管理员 = 1,

  生产队长 = 2,

  养殖人员 = 3,
}
export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  gGender: Gender;
  userRole: UserRole;
  state: boolean;
}


