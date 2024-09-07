import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IUser {
  id: string;
  username: string;
  email: string;
}

export const database = await JSONFilePreset<Record<string, IUser>>(
  "users.json",
  {},
);

export class Users {
  static getOne(id: string): IUser | undefined {
    return database.data[id];
  }

  static getAll(): IUser[] {
    return Object.values(database.data);
  }

  static findOne(predicate: (users: IUser) => boolean): IUser | undefined {
    return Users.getAll().find(predicate);
  }

  static async create(username: string, email: string): Promise<IUser> {
    if (Users.findOne((user) => user.email === email)) {
      throw new Error("Email already in use");
    }

    const user: IUser = {
      id: randomUUID(),
      email,
      username,
    };

    await database.update((data) => {
      data[user.id] = user;
    });

    return user;
  }
}
