export default () => ({
  APP_PORT: process.env.APP_PORT || 5000,
  DATABASE: {
    TYPE: process.env.DATABASE_TYPE || 'postgres',
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: process.env.DATABASE_PORT || 5432,
    USERNAME: process.env.DATABASE_USERNAME || '',
    PASSWORD: process.env.DATABASE_PASSWORD || '',
    NAME: process.env.DATABASE_NAME || 'booking',
    ENTITIES: process.env.DATABASE_ENTITIES || 'dist/**/*.entity{.ts,.js}',
    SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE || true,
    AUTOLOAD: process.env.DATABASE_AUTOLOAD || true,
  },
});
