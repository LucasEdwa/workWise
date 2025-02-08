import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { taskRouter } from './routes/task';
import { userRouter } from './routes/user';
import { companyRouter } from './routes/company';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
// Connect to the database
mongoose.connect(
  "mongodb+srv://lucaseduardo:lucas123@cluster0.6xqqdof.mongodb.net/workWise?retryWrites=true&w=majority&appName=Cluster0"
);

const database = mongoose.connection;

database.on("error", (err) => {
  console.error("Error connecting to the database:", err);
});
database.on("connected", () => {
  console.log("Connected to the database!");
});


// Route to create a new company
app.use('/api/companies', companyRouter);

// Route to create a new user
app.use('/api/users', userRouter);

// Route to create a new task
app.use('/api/tasks', taskRouter);

// Listen on port 3000
app.listen(3000, () => {
  console.log("Running api on 3000>");
});