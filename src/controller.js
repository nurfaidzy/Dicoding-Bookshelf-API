import { Router } from "express";
import { addBook, deleteBook, getBooks, updateBook } from "./services.js";
import { responseJson } from "./utils.js";
import { errApiMessage } from "./enum.js";

const controller = Router();

const handlePageReading = (res, payload, apiStatus) => {
  if (payload.readPage > payload.pageCount) {
    responseJson(
      res,
      "fail",
      apiStatus === "add"
        ? errApiMessage.addPagesRead
        : errApiMessage.updatePagesRead,
      null,
      400
    );
    return true;
  }
};

const handleNameBook = (res, payload, apiStatus) => {
  if (!payload.name) {
    responseJson(
      res,
      "fail",
      apiStatus === "add"
        ? errApiMessage.addNameBook
        : errApiMessage.updateNameBook,
      null,
      400
    );
    return true;
  }
};

const handleBookNotFound = (res, book, apiStatus) => {
  let message = "";
  if (apiStatus === "get") {
    message = errApiMessage.getIdNotFound;
  } else if (apiStatus === "update") {
    message = errApiMessage.updateIdNotFound;
  } else if (apiStatus === "add") {
    message = errApiMessage.addIdNotFound;
  } else {
    message = errApiMessage.deleteIdNotFound;
  }
  if (!book) {
    responseJson(res, "fail", message, null, 404);
    return true;
  }
};

controller.post("/books", (req, res) => {
  const payload = req.body;
  if (handleNameBook(res, payload, "add")) return;
  if (handlePageReading(res, payload, "add")) return;
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
  if (handleBookNotFound(res, book, "get")) return;
  if (book.readPage === book.pageCount) {
    return responseJson(
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
