const express = require("express");
const router = require("./routes/urlRoutes");
const path = require("path");
const Url = require("./models/modelUrl");
const staticRoutes = require("./routes/staticRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config({ path: "./backend/.env" });
app.set("view engine", "ejs");
app.set("views", path.resolve("backend/views"));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on Port - ${PORT}`);
});

// database connection
const connectDB = require("./connection");
connectDB();

// test api route
app.get("/api/test", async (req, res) => {
  const allUrls = await Url.find({});
  // res.json(allUrls);
  return res.render("home", { urls: allUrls });
});

// routes
app.use("/", staticRoutes);
app.use("/api", router);
