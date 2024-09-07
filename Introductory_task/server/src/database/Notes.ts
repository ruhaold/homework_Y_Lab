import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface INote {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: number;
}

const database = await JSONFilePreset<Record<string, INote>>("notes.json", {});

export interface IGetAllNotesOptions {
  page?: number;
  pageSize?: number;
  searchString?: string;
}

export interface IGetAllNotesResult {
  list: INote[];
  pageCount: number;
}

export class Notes {
  static getAllForUser(
    userId: string,
    { page, pageSize, searchString }: IGetAllNotesOptions = {},
  ): IGetAllNotesResult {
    let list = Object.values(database.data);
    let pageCount = 1;

    if (searchString) {
      list = list.filter((post) =>
        post.text.toLowerCase().includes(searchString.toLowerCase()),
      );
    }

    if (page !== undefined && pageSize !== undefined) {
      pageCount = Math.ceil(list.length / pageSize);
      list = list.slice(page * pageSize, (page + 1) * pageSize);
    }

    return {
      list,
      pageCount,
    };
  }

  static async create(
    title: string,
    text: string,
    userId: string,
  ): Promise<INote> {
    const note: INote = {
      id: randomUUID(),
      title,
      text,
      userId,
      createdAt: Date.now(),
    };

    await database.update((data) => {
      data[note.id] = note;
    });

    return note;
  }
}
