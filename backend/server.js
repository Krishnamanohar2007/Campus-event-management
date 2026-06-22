require("dotenv").config();

const exp = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = exp();

connectDB();

app.use(cors());
app.use(exp.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Campus Event Management API");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);