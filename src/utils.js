import { errApiMessage } from "./enum.js";

export const createDate = () => {
  const date = {
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return date;
};

export const responseJson = (h, status, message, data, code) => {
  if (status === "fail") {
    return h
      .response({
        status,
        message,
      })
      .code(code);
  } else {
    return h
      .response({
        status,
        message,
        data,
      })
      .code(code);
  }
};

export const handlePageReading = (h, payload, apiStatus) => {
  if (payload.readPage > payload.pageCount) {
    return responseJson(
      h,
      "fail",
      apiStatus === "add"
        ? errApiMessage.addPagesRead
        : errApiMessage.updatePagesRead,
      null,
      400
    );
  }
  return false;
};

export const handleNameBook = (h, payload, apiStatus) => {
  if (!payload.name) {
    return responseJson(
      h,
      "fail",
      apiStatus === "add"
        ? errApiMessage.addNameBook
        : errApiMessage.updateNameBook,
      null,
      400
    );
  }
  return false;
};

export const handleBookNotFound = (h, book, apiStatus) => {
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
    return responseJson(h, "fail", message, null, 404);
  }
  return false;
};
