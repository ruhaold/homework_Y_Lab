import { useEffect, useState } from "react";
import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});

export type Note = z.infer<typeof NoteSchema>;

export const NotesList = z.array(NoteSchema);

export type NotesList = z.infer<typeof NotesList>;

export const FetchNotesListSchema = z.object({
  list: NotesList,
  pageCount: z.number(),
});

type FetchNotesListResponse = z.infer<typeof FetchNotesListSchema>;

export function fetchNotesList(): Promise<FetchNotesListResponse> {
  return fetch("/api/notes")
    .then((response) => response.json())
    .then((data) => FetchNotesListSchema.parse(data));
}

interface IdleRequestState {
  status: "idle";
}

interface LoadingRequestState {
  status: "pending";
}

interface SuccessRequestState {
  status: "success";
  data: FetchNotesListResponse;
}
interface ErrorRequestState {
  status: "error";
  error: unknown;
}

type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | SuccessRequestState
  | ErrorRequestState;

export function useNotesList() {
  const [state, setState] = useState<RequestState>({ status: "idle" });

  useEffect(() => {
    if (state.status === "pending") {
      fetchNotesList()
        .then((data) => {
          setState({ status: "success", data });
        })
        .catch((error) => setState({ status: "error", error }));
    }
  }, [state]);

  useEffect(() => {
    setState({ status: "pending" });
  }, []);

  const refetch = () => {
    setState({ status: "pending" });
  };

  return {
    state,
    refetch,
  };
}

export function createNote(title: string, text: string): Promise<void> {
  return fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text }),
  })
    .then(validateResponse)
    .then(() => undefined);
}
