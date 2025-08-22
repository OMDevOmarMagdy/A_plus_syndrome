const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./utils/swaggerOptions");

const authRouter = require("./Routes/authRoutes");
const bookRouter = require("./Routes/bookRoutes");
const userRouter = require("./Routes/userRoutes");
const courseRouter = require("./Routes/courseRoutes");
const activityRouter = require("./Routes/activityRoutes");
const promoCodeRouter = require("./Routes/promoCodeRoutes");

const allRouter = require("./Routes/allRoutes");
const activitylogsRouter = require("./Routes/activityRoutes");

const uploadRouter = require("./Routes/uploadRoutes");

// ============= Create the App =============
const app = express();

// ============= Cors =============
const cors = require("cors");
const { updateBook } = require("./Controllers/bookController");
app.use(cors());

// ============= Middlewares =============
app.use(express.json());

// ============= Swagger =============
const swaggerDocs = swaggerJsDoc(swaggerOptions);

//  ============= Database Connection =============
const db = process.env.DB_CONNECTION;
mongoose.connect(db).then(() => {
  console.log("DB Connect Successfully");
});

// ============= Routes =============
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/promocodes", promoCodeRouter);
app.use("/api/v1/all", allRouter);
app.use("/api/v1/activitylogs", activitylogsRouter);

// Upload image or vidoes and get it
app.use("/api/v1/upload", uploadRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Global error middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: err.status,
    message: err.message || "Something went wrong",
  });
});

// Listen to the Server
app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
