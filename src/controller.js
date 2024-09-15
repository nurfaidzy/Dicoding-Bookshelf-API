import { addBook, deleteBook, getBooks, updateBook } from "./services.js";
import {
  handlePageReading,
  responseJson,
  handleNameBook,
  handleBookNotFound,
} from "./utils.js";

const controller = [
  {
    method: "POST",
    path: "/books",
    handler: (request, h) => {
      const payload = request.payload;
      const statusBook = handleNameBook(h, payload, "add");
      if (statusBook) return statusBook;
      const statusPage = handlePageReading(h, payload, "add");
      if (statusPage) return statusPage;
      const data = addBook(payload);
      return responseJson(h, "success", "Buku berhasil ditambahkan", data, 201);
    },
  },
  {
    method: "GET",
    path: "/books/{id?}",
    handler: (request, h) => {
      const idBook = request.params.id;
      const { reading, finished, name } = request.query;
      const book = getBooks(idBook, reading, finished, name);

      if (idBook) {
        const statusBook = handleBookNotFound(h, book, "get");
        if (statusBook) return statusBook;
        return responseJson(
          h,
          "success",
          "Data berhasil didapatkan",
          { book: book },
          200
        );
      }

      return responseJson(
        h,
        "success",
        "Data berhasil didapatkan",
        { books: book },
        200
      );
    },
  },
  {
    method: "PUT",
    path: "/books/{id?}",
    handler: (request, h) => {
      const idBook = request.params.id;
      const payload = request.payload;
      const statusBook = handleNameBook(h, payload, "update");
      if (statusBook) return statusBook;
      const statusPage = handlePageReading(h, payload, "update");
      if (statusPage) return statusPage;
      const book = getBooks(idBook);
      const bookNotFound = handleBookNotFound(h, book, "update");
      if (bookNotFound) return bookNotFound;
      const data = updateBook(idBook, payload);
      return responseJson(
        h,
        "success",
        "Buku berhasil diperbarui",
        { book: data },
        200
      );
    },
  },
  {
    method: "DELETE",
    path: "/books/{id?}",
    handler: (request, h) => {
      const idBook = request.params.id;
      const book = getBooks(idBook);
      const bookNotFound = handleBookNotFound(h, book, "delete");
      if (bookNotFound) return bookNotFound;
      deleteBook(idBook);
      return responseJson(h, "success", "Buku berhasil dihapus", null, 200);
    },
  },
];

export default controller;
