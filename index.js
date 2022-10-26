require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  express.json({
    extended: false,
  })
);

app.use(cors());

app.use('/', require('./routers/index'))
app.use('/api/url', require('./routers/url'));



app.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
