import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import useFormInput from '../hooks/useFormInput';
import employeeService from '../services/employeeService';
import type { Department } from '../types/Department';

interface AddEmployeeFormProps {
  onEmployeeAdded: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onEmployeeAdded }) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const position = useFormInput('');
  const department = useFormInput('');
  const email = useFormInput('');
  const phone = useFormInput('');

  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    employeeService.getDepartments().then(setDepartments);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await employeeService.createEmployee({
      firstName: firstName.value,
      lastName: lastName.value,
      position: position.value,
      department: department.value,
      email: email.value,
      phone: phone.value,
    });

    if (!result.validation.success) {
      if (result.validation.errors.firstName) {
        firstName.setMessage(result.validation.errors.firstName);
      }
      if (result.validation.errors.department) {
        department.setMessage(result.validation.errors.department);
      }
      return;
    }

    if (result.employee) {
      firstName.reset();
      lastName.reset();
      position.reset();
      department.reset();
      email.reset();
      phone.reset();
      onEmployeeAdded();
    }
  };

  return (
    <section className="add-employee-form">
      <SignedOut>
        <div className="auth-prompt">
          <p>You must be logged in to add employees.</p>
          <SignInButton mode="modal">
            <button className="submit-btn">Log In</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName.value}
              onChange={firstName.handleChange}
              placeholder="First name (min. 3 characters)"
            />
            {firstName.message && (
              <span className="field-error">{firstName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName.value}
              onChange={lastName.handleChange}
              placeholder="Last name"
            />
            {lastName.message && (
              <span className="field-error">{lastName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              value={position.value}
              onChange={position.handleChange}
              placeholder="Position / Title"
            />
            {position.message && (
              <span className="field-error">{position.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={department.value}
              onChange={department.handleChange}
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {department.message && (
              <span className="field-error">{department.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email.value}
              onChange={email.handleChange}
              placeholder="email@pixellriver.com"
            />
            {email.message && (
              <span className="field-error">{email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone.value}
              onChange={phone.handleChange}
              placeholder="(204) 555-0000"
            />
            {phone.message && (
              <span className="field-error">{phone.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Add Employee
          </button>
        </form>
      </SignedIn>
    </section>
  );
};

export default AddEmployeeForm;
