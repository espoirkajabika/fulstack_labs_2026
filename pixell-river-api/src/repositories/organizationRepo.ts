import type { Role } from '../types/Role';
import rolesData from '../data/roles.json';

let roles: Role[] = [...rolesData];
let nextId: number =
  roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;

const organizationRepo = {
  getRoles(): Role[] {
    return [...roles];
  },

  createRole(data: Omit<Role, 'id'>): Role {
    const newRole: Role = { id: nextId++, ...data };
    roles = [...roles, newRole];
    return { ...newRole };
  },

  isRoleOccupied(roleName: string): boolean {
    return roles.some(
      (r) => r.role.toLowerCase() === roleName.toLowerCase()
    );
  },
};

export default organizationRepo;
