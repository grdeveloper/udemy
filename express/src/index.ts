import dotenv from "dotenv";
import mongoose from "mongoose";

import { app } from "./app";

dotenv.config();

const { APP_PORT, APP_MONGO_USER, APP_MONGO_PASSWORD } = process.env;

const startServer = async () => {
  await mongoose.connect(
    `mongodb+srv://${APP_MONGO_USER}:${APP_MONGO_PASSWORD}@cluster0.giqgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
};

startServer()
  .then(() => app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`)))
  .catch((e) => console.error(e));
