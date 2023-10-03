// index.js
const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;

const router = require("./src/router");

// Parse JSON data in the request body
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use("/api", router);
