import {
  createCostCenter, deleteCostCenter, getCostCenter, getCostCenters, updateCostCenter,
} from '../services/cost_center';

export const getOne = async (req, res) => {
  try {
    const user = await getCostCenter(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Cost center not found' });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getCostCenters();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const create = async (req, res) => {
  try {
    const data = await createCostCenter(req.body);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const update = async (req, res) => {
  try {
    const data = await updateCostCenter(req.params.id, req.body);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      return res.status(404).json({ message: 'Cost center not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await deleteCostCenter(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    if (e.type === 'not_found') {
      return res.status(404).json({ message: 'Cost center not found' });
    }

    res.status(500).send({ message: 'Internal server error' });
  }
};
