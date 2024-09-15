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
