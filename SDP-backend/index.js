import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import campRoutes from "./routes/campRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import iotRoutes from "./routes/iotRoutes.js";
import predictionRoutes from "./routes/predictionRoute.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Development logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security headers
app.use(helmet());

// CORS setup
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://sdp-client-cy7h.vercel.app",
    "https://sdp-client-tau.vercel.app",
    "https://sdp-doddabhathi.vercel.app",
    "https://sdp-goa.vercel.app"
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// JSON parser
app.use(express.json());

// Rate limiter for auth endpoints — 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, success: false, message: "Too many login attempts. Please try again later." },
});

// Routes
app.use("/api/location", locationRoutes);
app.use("/api/user/login", authLimiter);
app.use("/api/user/sendresetlink", authLimiter);
app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/camp", campRoutes);
app.use("/api/iot", iotRoutes);
app.use("/api/prediction", predictionRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("✅ API is running successfully on Vercel!");
});

// Error middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Only listen locally, not on Vercel
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5001;
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Graceful shutdown so nodemon restarts don't hit EADDRINUSE
  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

// ✅ Export for Vercel
export default app;
