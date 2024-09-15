const express = require("express");
const app = express();
const port = 9000;
const controller = require("./controller");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", controller);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
