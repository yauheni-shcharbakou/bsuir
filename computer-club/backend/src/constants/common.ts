export const PORT = process.env.PORT || 5000;
export const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/computer_club';
export const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
export const BCRYPT_SALT = process.env.BCRYPT_SALT || 3;

export const IS_PUBLIC_ENDPOINT = 'IS_PUBLIC_ENDPOINT';
export const ALLOWED_ROLES = 'ALLOWED_ROLES';
