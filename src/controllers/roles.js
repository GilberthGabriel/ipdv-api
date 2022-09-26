import {
  createRole, deleteRole, getRole, getRoles, updateRole,
} from '../services/roles';

export const getOne = async (req, res) => {
  try {
    const user = await getRole(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Role not found' });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getRoles();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const create = async (req, res) => {
  try {
    const data = await createRole(req.body);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const update = async (req, res) => {
  try {
    const data = await updateRole(req.params.id, req.body);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      res.status(404).json({ message: 'Role not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await deleteRole(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      res.status(404).json({ message: 'Role not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};
