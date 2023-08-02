import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";

export const login: RequestHandler = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError.badRequestError('username or password is not transferred. Please, provide username and password');
  }

  const token = jwt.sign({ username, password }, config.jwt.JWT_SECRET, { expiresIn: '20m' });

  res.status(200).json({ message: 'hello world', token });
};

export const dashboard = (req, res) => {
  const user = req.user;
  const luckyNumber = Math.random().toFixed(2);
  res.status(200).json({ secret: `Hello ${ user.username } ${ luckyNumber }` });
};