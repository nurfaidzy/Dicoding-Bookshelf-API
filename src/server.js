import express, { json, urlencoded } from "express";
import controller from "./controller.js";
const app = express();
const port = 9000;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/", controller);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
