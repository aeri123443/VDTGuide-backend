import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import scoreRouter from "./router/score.js";
import userRouter from "./router/user.js";
import { config } from "./config.js";
import { db } from "./db/database.js";
import { Connection } from "puppeteer";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/score", scoreRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection();
app.listen(config.host.port);
