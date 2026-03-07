// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import "./config/env";
import app from "./app";
import { connectDB } from "./config/db";
import { seedAdmin } from "./config/seed.admin";

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
};

startServer();
