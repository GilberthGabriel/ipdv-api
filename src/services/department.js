import { CostCenterModel } from '../models/cost_center';
import { DepartmentModel } from '../models/department';

export async function getDepartments() {
  return DepartmentModel.findAll({
    include: [{ model: CostCenterModel, select: ['id', 'name'] }],
    raw: true,
    nest: true,
  });
}

export async function getDepartment(id) {
  return DepartmentModel.findOne({
    where: { id },
    include: [{ model: CostCenterModel }],
    raw: true,
    nest: true,
  });
}

export async function createDepartment(data) {
  const department = await DepartmentModel.create(data);
  return department.toJSON();
}

export async function updateDepartment(id, data) {
  const department = await DepartmentModel.findByPk(id);
  if (!department) {
    throw { type: 'not_found' };
  }

  return department.update(data);
}

export async function deleteDepartment(id) {
  const department = await DepartmentModel.findByPk(id);
  if (!department) {
    throw { type: 'not_found' };
  }

  return department.destroy();
}
