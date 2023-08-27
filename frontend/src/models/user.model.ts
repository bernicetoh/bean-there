export interface UserDetails {
  name: string;
  email: string;
  username: string;
  photo: string;
  role: string;
  active: boolean;
  _id: string;
}

export interface ReviewUserDetails {
  name: string;
  id: string;
  username: string;
}
export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}
