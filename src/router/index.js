const express = require("express");
const sendBep = require("../controller/index");

const router = express.Router();

router.post("/send", sendBep.sendBep);

router.get("/", (req, res) => {
  res.send("ok");
});

module.exports = router;
