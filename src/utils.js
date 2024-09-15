import { errApiMessage } from "./enum.js";

export const createDate = () => {
  const date = {
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return date;
};

export const responseJson = (res, status, message, data, code) => {
  if (status === "fail") {
    return res.status(code).json({
      status,
      message,
    });
  } else {
    return res.status(code).json({
      status,
      message,
      data,
    });
  }
};

export const handlePageReading = (res, payload, apiStatus) => {
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

export const handleNameBook = (res, payload, apiStatus) => {
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

export const handleBookNotFound = (res, book, apiStatus) => {
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
