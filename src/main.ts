import express from "express";
import http from "http";
import socketio from "socket.io";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";
import path from "path";
import errorHandler from "./middleware/error";
import ICustomRequest from "./types";

dotenv.config();

import "./database/db";

import userRouter from "./routes/users";
import serviceRouter from "./routes/services";

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

app.use(cors());

app.use(async (req: ICustomRequest, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
} else {
  // app.use(helmet());
}

app.use(express.static("./frontend/build"));

app.use("/api/v5/users", userRouter);
app.use("/api/v5/services", serviceRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../frontend/build/index.html"));
});

app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(
    chalk.green.underline.bold(`Server running in ${process.env.NODE_ENV} mode`)
  );
  console.log(
    chalk.yellow.underline.bold(`Server running on port ${process.env.PORT}`)
  );
});
