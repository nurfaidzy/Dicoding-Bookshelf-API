import { nanoid } from "nanoid";
import { createDate } from "./utils.js";
import { books } from "./mapper.js";

export const addBook = (payload) => {
  const margeData = {
    id: nanoid(),
    ...payload,
    finished: false,
    ...createDate(),
  };
  books.push(margeData);
  return {
    bookId: margeData.id,
  };
};

export const getBooks = (id) => {
  if (id) {
    const book = books.find((book) => book.id === id);
    return book;
  }
  const book = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });

  return book;
};

export const updateBook = (id, payload) => {
  const bookToUpdate = books.find((book) => book.id === id);

  const updatedData = {
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  const index = books.indexOf(bookToUpdate);
  books[index] = {
    ...bookToUpdate,
    ...updatedData,
  };
  return books[index];
};

export const deleteBook = (id) => {
  const index = books.findIndex((book) => book.id === id);
  books.splice(index, 1);
};
