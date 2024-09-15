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
