import { CostCenterModel } from '../models/cost_center';

export async function getCostCenters() {
  return CostCenterModel.findAll({ raw: true, nest: true });
}

export async function getCostCenter(id) {
  return CostCenterModel.findOne({ where: { id }, raw: true, nest: true });
}

export async function createCostCenter(data) {
  const costCenter = await CostCenterModel.create(data);
  return costCenter.toJSON();
}

export async function updateCostCenter(id, data) {
  const costCenter = await CostCenterModel.findByPk(id);
  if (!costCenter) {
    throw { type: 'not_found' };
  }

  return costCenter.update(data);
}

export async function deleteCostCenter(id) {
  const costCenter = await CostCenterModel.findByPk(id);
  if (!costCenter) {
    throw { type: 'not_found' };
  }

  return costCenter.destroy();
}
