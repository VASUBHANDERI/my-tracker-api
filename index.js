require("./src/Models/User");
require("./src/Models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes");
const trackRoutes = require("./src/routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./src/middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://Vasu_002:passwordpassword@cluster0.id8dlgg.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo cluster");
});

mongoose.connection.on("error", (err) => {
  console.error("Can't Connect to Mongo Server", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email : ${req.user.email}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening Port 3000");
});
