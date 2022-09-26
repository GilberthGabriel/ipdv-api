import {
  createUser, deleteUser, getUser, getUsers, updateUser, exportReportUsers,
} from '../services/users';

export const getOne = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getUsers();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const create = async (req, res) => {
  try {
    const data = await createUser(req.body);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const update = async (req, res) => {
  try {
    const data = await updateUser(req.params.id, req.body);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await deleteUser(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};

export const exportReport = async (req, res) => {
  try {
    const data = await exportReportUsers();
    res.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.header(
      'Content-Disposition',
      'attachment; filename=participantes.xlsx',
    );
    res.send(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
