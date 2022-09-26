import jwt from 'jsonwebtoken';
import { compareHash, UserModel } from '../models/user';

function parseJwt(token) {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}

export async function login({ email, password }) {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    throw { type: 'not_found' };
  }

  const isValidPassword = await compareHash(password, user.password);
  if (!isValidPassword) {
    throw { type: 'invalid_password' };
  }

  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  const token = jwt.sign({ id: user.id, refreshToken }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const decodedToken = parseJwt(token);
  const decodedRefreshToken = parseJwt(refreshToken);
  return {
    user: user.toJSON(),
    token,
    refreshToken,
    tokenExpiration: decodedToken.exp,
    refreshTokenExpiration: decodedRefreshToken.exp,
  };
}

export async function refresh({ userId }) {
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  const newToken = jwt.sign({ id: userId, refreshToken }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const decodedToken = parseJwt(newToken);
  const decodedRefreshToken = parseJwt(refreshToken);

  return {
    refreshToken,
    token: newToken,
    tokenExpiration: decodedToken.exp,
    refreshTokenExpiration: decodedRefreshToken.exp,
  };
}
