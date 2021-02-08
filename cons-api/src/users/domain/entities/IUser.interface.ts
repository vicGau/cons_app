export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
