import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
}

export function verifyRefreshToken(req, res, next) {
  const token = req?.body?.refresh_token;
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
}
