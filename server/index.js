const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express({ origin: "http://localhost:5000/" });

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/favoritesRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
