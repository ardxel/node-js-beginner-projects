import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";
import config from "../config";

const authenticationMiddleware = async (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth || !auth.startsWith('Bearer')) {
    throw new AppError.unauthorizedError('No token provided');
  }

  const token = auth.split(' ')[1];
  const decoded = jwt.verify(token, config.jwt.JWT_SECRET) as { id: string, username: string };

  req.user = { id: decoded.id, username: decoded.username };
  next();

};
export default authenticationMiddleware;