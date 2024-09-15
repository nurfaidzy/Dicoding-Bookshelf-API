import { nanoid } from "nanoid";
import { createDate } from "./utils.js";
import { books } from "./mapper.js";

export const addBook = (payload) => {
  const margeData = {
    id: nanoid(),
    ...payload,
    finished: payload.readPage === payload.pageCount ? true : false,
    ...createDate(),
  };
  books.push(margeData);
  return {
    bookId: margeData.id,
  };
};

const handleBookReturn = (books) => {
  const data = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });
  return data;
};

export const getBooks = (id, reading, finished, name) => {
  if (id) {
    const book = books.find((book) => book.id === id);
    return book;
  }
  const filteredBooks = books.filter((book) => {
    const matchesReading = reading ? book.reading === (reading === "1") : true;
    const matchesFinished = finished
      ? book.finished === (finished === "1")
      : true;
    const matchesName = name
      ? book.name.toLowerCase().includes(name.toLowerCase())
      : true;

    return matchesReading && matchesFinished && matchesName;
  });
  return handleBookReturn(filteredBooks);
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
