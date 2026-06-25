/**
 * Vercel serverless entry point.
 * This file is used ONLY for Vercel deployment.
 * Local development uses index.js instead.
 */

import express from "express";
import dotenv from "dotenv";
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

// Connect to MongoDB Atlas on cold start
connectDB();

const app = express();

// ── Security headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://sdp-client-cy7h.vercel.app",
  "https://sdp-client-tau.vercel.app",
  "https://sdp-doddabhathi.vercel.app",
  "https://sdp-goa.vercel.app",
  // Add your new frontend Vercel URL below after deploying
  // "https://kle-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// ── Body parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Rate limiting on auth endpoints ──────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: 429,
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// ── Health check (no DB required) ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mongo_configured: !!process.env.MONGO_URI,
    jwt_configured: !!process.env.JWT_SECRET,
    encryption_configured: !!process.env.ENCRYPTION_KEY,
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/location", locationRoutes);
app.use("/api/user/login", authLimiter);
app.use("/api/user/sendresetlink", authLimiter);
app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/camp", campRoutes);
app.use("/api/iot", iotRoutes);
app.use("/api/prediction", predictionRoutes);

// ── Error handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Export for Vercel serverless ──────────────────────────────────────────────
export default app;
