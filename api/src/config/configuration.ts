export default () => ({
  SERVER_PORT: parseInt(process.env.SERVER_PORT, 10) || 3306,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    name: process.env.DATABASE_NAME || 'inventarios',
  },
});
