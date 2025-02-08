import express, { Request, Response } from 'express';
import Company from '../models/ICompany';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const companyRouter = express.Router();

companyRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { name, address, organizationNumber, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new Company({ name, address, organizationNumber, password: hashedPassword });
    await company.save();

    // Generate JWT
    const token = jwt.sign({ companyId: company._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ company, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

companyRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { organizationNumber, password } = req.body;

    const company = await Company.findOne({ organizationNumber });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ companyId: company._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ company, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});