import express, { Request, Response } from 'express';
import  User  from '../models/IUser';
import Company from '../models/ICompany';


export const userRouter = express.Router();
userRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    const user = new User({ name, email, password, role, company: company._id });
    await user.save();
    company.users.push(user._id);
    await company.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
userRouter.get('/get', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

