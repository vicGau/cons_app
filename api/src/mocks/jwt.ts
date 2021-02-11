export const JWT_TOKEN = 'tokenKey';

export const mockedJwtService = {
  sign: jest.fn().mockReturnValue(JWT_TOKEN),
};
