const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/TodoRoute");
const CounterModel = require("./models/CounterModel");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Connected to MongoDB`);
    // Ensure a Counter document exists
    initializeCounter();
  })
  .catch((error) => console.log(error));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});

async function initializeCounter() {
  try {
    const result = await CounterModel.findOne();
    if (!result) {
      const newCounter = new CounterModel();
      const savedCounter = await newCounter.save();
      console.log("Counter initialized:", savedCounter);
    }
  } catch (err) {
    console.log(err);
  }
}
