export default () => ({
  APP_PORT: process.env.APP_PORT || 3000,
  DATABASE: {
    TYPE: 'postgres',
    HOST: 'localhost',
    PORT: 5432,
    USERNAME: '',
    PASSWORD: '',
    NAME: 'booking',
    ENTITIES: 'dist/**/*.entity{.ts,.js}',
    SYNCHRONIZE: true,
    AUTOLOAD: true,
  },
});

