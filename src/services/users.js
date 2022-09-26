import xlsx from 'exceljs';
import { CostCenterModel } from '../models/cost_center';
import { DepartmentModel } from '../models/department';
import { RoleModel } from '../models/role';
import { UserModel, generateHash } from '../models/user';

export async function getUser(id) {
  return UserModel.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
    include: [{ model: RoleModel }],
    raw: true,
    nest: true,
  });
}

export async function getUsers() {
  return UserModel.findAll({
    include: [
      {
        attributes: ['id', 'title'],
        model: RoleModel,
        include: [{
          attributes: ['id', 'title'],
          model: DepartmentModel,
        }],
      },
    ],
    raw: true,
    nest: true,
  });
}

export async function createUser(data) {
  data.password = await generateHash(data.password);
  const user = await UserModel.create(data);
  return user.toJSON();
}

export async function updateUser(id, data) {
  const user = await UserModel.findOne({ where: { id } });
  if (!user) {
    throw new Error({ type: 'not_found' });
  }

  if (data.password) {
    data.password = await generateHash(data.password);
  }

  return user.update(data);
}

export async function deleteUser(id) {
  const user = await UserModel.findOne({ where: { id } });
  if (!user) {
    throw new Error({ type: 'not_found' });
  }

  return user.destroy();
}

export async function exportReportUsers() {
  const workbook = new xlsx.Workbook();
  const worksheet = workbook.addWorksheet('Usuários');
  worksheet.columns = [
    { header: 'Nome', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Departamento', key: 'department', width: 30 },
    { header: 'Cargo', key: 'role', width: 30 },
    { header: 'Centro de custo', key: 'costCenter', width: 30 },
  ];

  const users = await UserModel.findAll({
    include: [
      {
        attributes: ['id', 'title'],
        model: RoleModel,
        include: [{
          attributes: ['id', 'title'],
          model: DepartmentModel,
          include: [{
            attributes: ['id', 'title'],
            model: CostCenterModel,
          }],
        }],
      },
    ],
    raw: true,
    nest: true,
  });

  worksheet.addRows(users.map((user) => ({
    name: user.name,
    email: user.email,
    department: user?.Role?.Department?.title,
    role: user?.Role?.title,
    costCenter: user?.Role?.Department?.CostCenter?.title,
  })));

  return workbook.xlsx.writeBuffer();
}
