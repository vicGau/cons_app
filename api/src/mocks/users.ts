import { UsersInputDto } from '../users/adapters/dtos/UsersInput.dto';

export const mockUserRepo = {
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

export const mockUsersInput: UsersInputDto = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  email: 'test@test.com',
  password: 'password',
  companyId: 1,
};

export const mockUserServiceFindOneParams = {
  where: { id: 1 },
};
