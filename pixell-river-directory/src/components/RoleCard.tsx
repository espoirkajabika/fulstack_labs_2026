import type { Role } from '../types/Role';

interface RoleCardProps {
  role: Role;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  return (
    <div className="role-card">
      <span className="role-badge">{role.role}</span>
      <h3>{role.firstName} {role.lastName}</h3>
    </div>
  );
};

export default RoleCard;
