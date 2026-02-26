import type { Role } from '../types/Role';

interface RoleCardProps {
  role: Role;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  return (
    <div className="employee-card">
      <h3>{role.firstName} {role.lastName}</h3>
      <p className="position">{role.role}</p>
    </div>
  );
};

export default RoleCard;
