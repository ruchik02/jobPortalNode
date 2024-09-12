// const express = require('express')
// API DOcumenATion
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import helmet from "helmet";
import xssPurge from "xss-purge";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import router from "./routes/router.js";
import AuthRoutes from "./routes/authRoutes.js";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";
import jobRoute from "./routes/jobRoutes.js";

const app = express();

dotenv.config();
connectDB();
// Swagger api config
// swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
          url: "https://jobportalnode.onrender.com"
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);
app.use(helmet());
app.use(xssPurge());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", router);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
//   console.log(
//     `Node Server running in ${process.env.DEV_MODE} mode on port no ${PORT}`
//       .bgCyan.bgWhite
//   );
});
