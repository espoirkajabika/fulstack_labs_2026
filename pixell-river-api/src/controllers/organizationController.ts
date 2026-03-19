import { Request, Response } from 'express';
import organizationService from '../services/organizationService';

const organizationController = {
  getRoles(req: Request, res: Response): void {
    const roles = organizationService.getRoles();
    res.json(roles);
  },

  createRole(req: Request, res: Response): void {
    const { firstName, lastName, role } = req.body;

    if (!firstName || !lastName || !role) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const result = organizationService.createRole({ firstName, lastName, role });

    if (!result.validation.success) {
      res.status(422).json({ validation: result.validation });
      return;
    }

    res.status(201).json(result.role);
  },
};

export default organizationController;
