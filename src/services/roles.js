import { DepartmentModel } from '../models/department';
import { RoleModel } from '../models/role';

export async function getRole(id) {
  return RoleModel.findOne({ where: { id }, raw: true, nest: true });
}

export async function getRoles() {
  return RoleModel.findAll({
    include: [{ model: DepartmentModel, attributes: ['id', 'title'] }],
    raw: true,
    nest: true,
  });
}

export async function createRole(data) {
  const role = await RoleModel.create(data);
  return role.toJSON();
}

export async function updateRole(id, data) {
  const role = await RoleModel.findByPk(id);
  if (!role) {
    throw { type: 'not_found' };
  }

  return role.update(data);
}

export async function deleteRole(id) {
  const role = await RoleModel.findByPk(id);
  if (!role) {
    throw { type: 'not_found' };
  }

  return role.destroy();
}
