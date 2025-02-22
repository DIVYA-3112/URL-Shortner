const express = require("express");
const router = require("./routes/urlRoutes");
const path = require("path");

require("dotenv").config({ path: "./backend/.env" });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on Port - ${PORT}`);
});

// database connection
const connectDB = require("./connection");
connectDB();

app.use("/api", router);
