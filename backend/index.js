// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/event.routes");
const cors = require("cors");
const adminRoutes = require("./routes/admin.routes");
const userRoutes =  require("./routes/user.routes")
const path = require('path')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
