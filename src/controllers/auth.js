import { login, refresh } from '../services/auth';

export const authenticate = async (req, res) => {
  try {
    const data = await login(req.body);
    res.send(data);
  } catch (e) {
    if (e.type === 'not_found') {
      return res.status(404).send({ message: 'User not found' });
    }

    if (e.type === 'invalid_password') {
      return res.status(401).send({ message: 'Invalid password' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const data = await refresh({ userId: req.userId });
    res.send(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
