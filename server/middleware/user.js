import jwt from "jsonwebtoken";
import { config } from "../config.js";

import * as userRepository from "../data/user.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log("1");
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      console.log("2");
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      console.log("3");

      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};
