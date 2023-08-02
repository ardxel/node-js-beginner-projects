import express from "express";
import authenticationMiddleware from "../middleware/auth";
import { dashboard, login } from "../controllers/main";

const loginRoute = express.Router();

loginRoute.get('/dashboard', [ authenticationMiddleware ], dashboard);
loginRoute.get('/login', [], login);

export default loginRoute;