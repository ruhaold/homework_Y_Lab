import { Router } from "express";

import { authorizeRequest } from "../auth.js";
import { Users } from "../database";

export const usersRouter = Router();

usersRouter.get("/me", (req, res) => {
  const userId = authorizeRequest(req);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const user = Users.getOne(userId);

  if (!user) {
    return res.status(404).send("Пользователь не найден");
  }

  res.status(200).json(user);
});
