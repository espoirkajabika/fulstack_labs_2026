import type { Role } from '../types/Role';
import rolesData from '../data/roles.json';

// In-memory data store — the single source of truth for organization records
let roles: Role[] = [...rolesData];
let nextId: number =
  roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;

const organizationRepo = {
  /**
   * Returns all organization role records.
   */
  getRoles(): Role[] {
    return [...roles];
  },

  /**
   * Creates a new organization role record and adds it to the store.
   * Returns the newly created record with an assigned id.
   */
  createRole(roleData: Omit<Role, 'id'>): Role {
    const newRole: Role = {
      id: nextId++,
      ...roleData,
    };

    roles = [...roles, newRole];
    return { ...newRole };
  },

  /**
   * Checks whether a role is already occupied by someone.
   * Returns true if someone already holds this role.
   */
  isRoleOccupied(roleName: string): boolean {
    return roles.some(
      (r) => r.role.toLowerCase() === roleName.toLowerCase()
    );
  },
};

export default organizationRepo;
