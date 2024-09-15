import { Router } from "express";
import { addBook, deleteBook, getBooks, updateBook } from "./services.js";
import {
  handlePageReading,
  responseJson,
  handleNameBook,
  handleBookNotFound,
} from "./utils.js";

const controller = Router();

controller.post("/books", (req, res) => {
  const payload = req.body;
  if (handleNameBook(res, payload, "add")) return;
  if (handlePageReading(res, payload, "add")) return;
  const data = addBook(payload);
  responseJson(res, "success", "Buku berhasil ditambahkan", data, 201);
});

controller.get("/books/:id?", (req, res) => {
  const idBook = req.params.id;
  const { reading, finished, name } = req.query;
  const book = getBooks(idBook, reading, finished, name);

  if (idBook) {
    if (handleBookNotFound(res, book, "get")) return;
    return responseJson(
      res,
      "success",
      "Data berhasil didapatkan",
      { book: book },
      200
    );
  }

  responseJson(
    res,
    "success",
    "Data berhasil didapatkan",
    { books: book },
    200
  );
});

controller.put("/books/:id?", (req, res) => {
  const idBook = req.params.id;
  const payload = req.body;
  if (handleNameBook(res, payload, "update")) return;
  if (handlePageReading(res, payload, "update")) return;
  const book = getBooks(idBook);
  if (handleBookNotFound(res, book, "update")) return;
  const data = updateBook(idBook, payload);
  responseJson(res, "success", "Buku berhasil diperbarui", { book: data }, 200);
});

controller.delete("/books/:id?", (req, res) => {
  const idBook = req.params.id;
  const book = getBooks(idBook);
  if (handleBookNotFound(res, book, "delete")) return;
  deleteBook(idBook);
  responseJson(res, "success", "Buku berhasil dihapus", null, 200);
});

export default controller;
