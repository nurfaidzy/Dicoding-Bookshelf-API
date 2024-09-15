import { Router } from "express";
import { addBook } from "./services.js";
import { responseJson } from "./utils.js";

const controller = Router();

controller.post("/books", (req, res) => {
  const payload = req.body;
  if (!payload.name) {
    return responseJson(
      res,
      "fail",
      "Gagal menambahkan buku. Mohon isi nama buku",
      null,
      400
    );
  }
  if (payload.readPage > payload.pageCount) {
    return responseJson(
      res,
      "fail",
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      null,
      400
    );
  }
  const data = addBook(payload);
  responseJson(res, "success", "Buku berhasil ditambahkan", data, 201);
});

export default controller;
