import { Router } from "express";
import { addBook, getBooks } from "./services.js";
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

controller.get("/books/:id?", (req, res) => {
  const idBook = req.params.id;
  const book = getBooks(idBook);
  if (!req.params.id) {
    return responseJson(
      res,
      "success",
      "Data berhasil didapatkan",
      { books: book },
      200
    );
  }
  if (!book) {
    return responseJson(res, "fail", "Buku tidak ditemukan", null, 404);
  }
  if (book.readPage === book.pageCount) {
    responseJson(
      res,
      "success",
      "Data berhasil didapatkan",
      {
        book: {
          ...book,
          finished: true,
        },
      },
      200
    );
  }
  responseJson(res, "success", "Data berhasil didapatkan", { book: book }, 200);
});

export default controller;
