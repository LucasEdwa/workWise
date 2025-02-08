import express, { Request, Response } from "express";
import Company from "../models/ICompany";
import User, { IUser } from "../models/IUser";
import Task from "../models/ITask";

export const taskRouter = express.Router();

taskRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      createdBy,
      assignedTo,
      companyId,
      date,
      startTime,
      endTime,
    } = req.body;
    const creator: IUser | null = await User.findById(createdBy);
    const company = await Company.findById(companyId);

    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    if (creator.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admin users can create tasks" });
    }

    let assignee: IUser | null = null;
    if (assignedTo) {
      assignee = await User.findById(assignedTo);
      if (!assignee) {
        return res.status(404).json({ error: "Assignee not found" });
      }
    }

    const task = new Task({
      title,
      description,
      status,
      createdBy: creator._id,
      assignedTo: assignee ? assignee._id : null,
      company: company._id,
      date,
      startTime,
      endTime,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
