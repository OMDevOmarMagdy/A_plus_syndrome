const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const authRouter = require("./Routes/authRoutes");

dotenv.config();

// ============= Create the App =============
const app = express();

// ============= Middlewares =============
app.use(express.json());

// ============= Swagger =============
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cources API",
      version: "1.0.0",
      description: "API documentation for Cources site",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// ============= Database Connection =============
const db = process.env.DB_CONNECTION;
mongoose.connect(db).then(() => {
  console.log("DB Connect Successfully");
});

// ============= Routes =============
app.use("/api/v1/auth", authRouter);
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
