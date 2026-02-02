import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRY || '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRY || '7d';

// Validate JWT secrets in production
if (process.env.NODE_ENV === 'production' && (!JWT_SECRET || !REFRESH_SECRET)) {
  throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in production');
}

// Use defaults only in development
const DEFAULT_SECRET = JWT_SECRET || 'dev-secret-change-in-production';
const DEFAULT_REFRESH_SECRET = REFRESH_SECRET || 'dev-refresh-secret-change-in-production';

export interface TokenPayload {
  userId: string;
  role: string;
}

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, DEFAULT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);
  const refreshToken = jwt.sign(
    { userId: payload.userId },
    DEFAULT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN } as any
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, DEFAULT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, DEFAULT_REFRESH_SECRET) as { userId: string };
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
