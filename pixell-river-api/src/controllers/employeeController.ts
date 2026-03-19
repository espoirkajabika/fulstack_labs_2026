import { Request, Response } from 'express';
import employeeService from '../services/employeeService';

const employeeController = {
  getEmployees(req: Request, res: Response): void {
    const employees = employeeService.getEmployees();
    res.json(employees);
  },

  getDepartments(req: Request, res: Response): void {
    const departments = employeeService.getDepartments();
    res.json(departments);
  },

  createEmployee(req: Request, res: Response): void {
    const { firstName, lastName, position, department, email, phone } = req.body;

    if (!firstName || !lastName || !position || !department || !email || !phone) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const result = employeeService.createEmployee({
      firstName,
      lastName,
      position,
      department,
      email,
      phone,
    });

    if (!result.validation.success) {
      res.status(422).json({ validation: result.validation });
      return;
    }

    res.status(201).json(result.employee);
  },
};

export default employeeController;
