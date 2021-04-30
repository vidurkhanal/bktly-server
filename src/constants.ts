export const DATABASE_NAME = process.env.DATABASE_NAME as string;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
export const __PROD__ = !process.env.NODE_ENV;
export const PORT = 8050;
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_SECRET as string;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN as string;
