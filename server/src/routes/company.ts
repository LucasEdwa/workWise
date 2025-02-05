import express, { Request, Response } from 'express';
import  Company  from '../models/ICompany';


export const companyRouter = express.Router();

companyRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { name, address, organizationNumber } = req.body;
    const company = new Company({ name, address, organizationNumber });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});