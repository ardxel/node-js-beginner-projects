import AppError from "../errors/AppError";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof AppError.baseError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).send(
    JSON.stringify({
      success: false,
      error: 'Something went wrong try again later'
    })
  );
};

export default errorHandlerMiddleware;