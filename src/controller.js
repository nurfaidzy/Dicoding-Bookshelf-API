const express = require("express");
const router = express.Router();

router.post("/books", (req, res) => {
    const payload = req.body;
    console.log(payload);

  res.send("Hello Worsld!");
});

module.exports = router;
