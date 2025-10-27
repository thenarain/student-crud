import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student CRUD API (ES Modules) is running...");
});

app.use("/api/students", studentRoutes);

export default app;
