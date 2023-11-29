require("dotenv").config();

const express = require("express");
const cors = require("cors");
const resetTasks = require("./utils/cron");

// routes - import
const apiRoute = require("./routes/api");
const authRoute = require("./routes/auth");

// Custom error handler
const errorHandler = require("./utils/errorHandler");

// middlewares
const { authMiddleware } = require("./middlewares/auth");

const app = express();
const port = process.env.PORT;
const localAddress = process.env.LOCAL_ADDRESS;

// cron
resetTasks()

// middlewares
app.use(express.json());
app.use(express.static("./public/"));
app.use(cors());

// routes - use
app.use("/auth", authRoute);
app.use("/api", authMiddleware, apiRoute);

// Error handler
app.use(errorHandler);

// listener
app.listen(Number(port), String(localAddress), function () {
  console.log("🚀 Server is running on port: " + port);
});
