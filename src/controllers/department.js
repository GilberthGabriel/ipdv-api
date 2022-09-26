import {
  createDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment,
} from '../services/department';

export const getOne = async (req, res) => {
  try {
    const user = await getDepartment(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Department not found' });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getDepartments();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const create = async (req, res) => {
  try {
    const data = await createDepartment(req.body);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const update = async (req, res) => {
  try {
    const data = await updateDepartment(req.params.id, req.body);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      res.status(404).json({ message: 'Department not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await deleteDepartment(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      res.status(404).json({ message: 'Department not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};
