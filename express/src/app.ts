import express from "express";
import { json } from "body-parser";
import morgan from "morgan";
import cors from 'cors';

import * as routes from "./routes";
import { handleNotFound } from "./errors";

export const app = express();

app.use(cors());
app.use(json());
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));

app.use("/api", routes.userRouter);
app.use("/api", routes.blogsRouter);
app.all("*", handleNotFound);
