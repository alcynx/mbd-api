import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
import authRoutes from "./routes/authRoutes.js";
import leadersRoutes from "./routes/leadersRoutes.js";
import lokasiRoutes from "./routes/lokasiRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api", leadersRoutes);
app.use("/api", lokasiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
