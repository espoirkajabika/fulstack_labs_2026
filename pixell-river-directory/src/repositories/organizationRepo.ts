import type { Role } from '../types/Role';

const API_BASE = 'http://localhost:3001/api';

const organizationRepo = {
  async getRoles(): Promise<Role[]> {
    const res = await fetch(`${API_BASE}/organization`);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return res.json();
  },

  async createRole(data: Omit<Role, 'id'>): Promise<Role> {
    const res = await fetch(`${API_BASE}/organization`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create role');
    return res.json();
  },

  async isRoleOccupied(roleName: string): Promise<boolean> {
    const roles = await this.getRoles();
    return roles.some(
      (r) => r.role.toLowerCase() === roleName.toLowerCase()
    );
  },
};

export default organizationRepo;
