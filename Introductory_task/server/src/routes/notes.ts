import { Router } from "express";
import { z } from "zod";

import { authorizeRequest } from "../auth.js";
import { IGetAllNotesOptions, Notes } from "../database";

export const notesRouter = Router();

const GetNotesSchema = z
  .object({
    page: z.string().default("0"),
    pageSize: z.string().default("10"),
    searchString: z.string().optional(),
  })
  .transform(
    ({
      page,
      pageSize,
      searchString,
    }): Omit<IGetAllNotesOptions, "userId"> => ({
      page: Number(page),
      pageSize: Number(pageSize),
      searchString,
    }),
  );

notesRouter.get("/", (req, res) => {
  const userId = authorizeRequest(req);
  const queryParseResult = GetNotesSchema.safeParse(req.query);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  if (!queryParseResult.success) {
    return res.status(400).send(queryParseResult.error.message);
  }

  res.status(200).json(Notes.getAllForUser(userId, queryParseResult.data));
});

const CreateNoteSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(10),
});

notesRouter.post("/", async (req, res) => {
  const userId = authorizeRequest(req);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const bodyParseResult = CreateNoteSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const { text, title } = bodyParseResult.data;

  const post = await Notes.create(title, text, userId);

  res.status(201).send(post.id);
});
