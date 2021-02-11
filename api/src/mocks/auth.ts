import { User } from '../users/domain/entities';

export const mockUserRepoFindOne: User = {
  id: 2,
  firstName: 'testFirstName',
  lastName: 'testLastName',
  password: '$2y$10$J5WsVw3D3tYJ2a1NDon8.OTgI/vjRrLv.XU8LuU9j8lmEkmPmPqIO',
  hashPassword: jest.fn(),
  email: 'test@test.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  company: null,
  booking: null,
};

export const mockUserReturn: any = {
  id: 2,
  firstName: 'testFirstName',
  lastName: 'testLastName',
  email: 'test@test.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  company: null,
  booking: null,
};
