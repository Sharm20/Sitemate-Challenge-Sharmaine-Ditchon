const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const bodyParser = require("body-parser");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("connected to database:", connection.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/issue", require("./routes/issue"));

app.listen(port, async () => {
  await connectDB();
  console.log(`server is running on ${port}`);
});
