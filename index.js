// ================== Environment Variables ==================
require("dotenv").config();

// ================== Core Imports ==================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./utils/swaggerOptions");

// ================== Routers ==================
const authRouter = require("./Routes/authRoutes");
const bookRouter = require("./Routes/bookRoutes");
const userRouter = require("./Routes/userRoutes");
const courseRouter = require("./Routes/courseRoutes");
const activityRouter = require("./Routes/activityRoutes");
const promoCodeRouter = require("./Routes/promoCodeRoutes");
const allRouter = require("./Routes/allRoutes");
// const activityLogsRouter = require("./Routes/activityRoutes");
const uploadRouter = require("./Routes/uploadRoutes");
const blockEmailsRouter = require("./Routes/blockedEmailRoutes");

// ================== App Initialization ==================
const app = express();

// ================== Security & Performance Middlewares ==================
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Allow cross-origin requests
app.use(compression()); // Compress responses

// Logging (only in dev mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parsers
app.use(express.json({ limit: "10kb" })); // Prevent huge payloads
app.use(express.urlencoded({ extended: true }));

// Rate Limiting → 100 requests / 15 min per IP
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// ================== Swagger ==================
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Data Sanitization → prevent NoSQL injection & XSS attacks
app.use(xss()); // Prevents malicious HTML/JS in inputs

// ================== Conditional mongoSanitize ==================
app.use((req, res, next) => {
  // Skip Swagger and auth routes
  if (req.path.startsWith("/api-docs") || req.path.startsWith("/api/v1/auth")) {
    return next();
  }
  mongoSanitize()(req, res, next);
});

// ================== Database ==================
const db = process.env.DB_CONNECTION;
mongoose
  .connect(db)
  .then(() => console.log("✅ DB connected successfully"))
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });

// ================== Routes ==================
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/promocodes", promoCodeRouter);
app.use("/api/v1/all", allRouter);
// app.use("/api/v1/activitylogs", activityLogsRouter);
app.use("/api/v1/block-emails", blockEmailsRouter);
app.use("/api/v1/upload", uploadRouter);

// Health check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy 🚀" });
});

// ================== Global Error Handling ==================
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
});

// ================== Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
