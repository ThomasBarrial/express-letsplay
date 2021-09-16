import express, { NextFunction, Request, Response } from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { WildersRouter } from './controllers';

const app = express();
const port = 4000;

dotenv.config();

app.use(express.json());

// Init connection to database
if (process.env.DATABASE_URL) {
  mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.error(err));
}

const runAsyncWrapper = (callback: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next)
      .catch(next);
  }
}

// Router calls
app.use("/wilders", runAsyncWrapper(WildersRouter));

// TODO: change any type on err props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status);
  res.send(err.message);
};

app.use(error);

// Starting and listening server
app.listen(port, () => {
  console.info(`Server up and running at ${port}`);
});
