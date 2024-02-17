import { Item, Part, User } from "./types";

const items: Item[] = [
  {
    id: "1",
    name: "Coca-Cola",
    price: 10,
    units: [
      { status: "taken", user: "Jayce" },
      { status: "lock", user: "Jayce" },
    ],
  },
  {
    id: "2",
    name: "Pringles",
    price: 20,
    units: [{ status: "missing", user: "" }],
  },
  {
    id: "3",
    name: "Coca-Cola",
    price: 10,
    units: [
      { status: "remaining", user: "Ting" },
      { status: "remaining", user: "Ting" },
    ],
  },
  {
    id: "4",
    name: "Pringles",
    price: 20,
    units: [{ status: "remaining", user: "Antonin" }],
  },
];

const users: User[] = ["Ting", "Jayce", "Antonin"];

const repartitions: Part[] = [
  {
    user: "Ting",
    total: -20,
  },
  {
    user: "Jayce",
    total: 30,
  },
  {
    user: "Antonin",
    total: -10,
  },
];

export const getAllItems = async () => {
  return items;
};

export const updateItem = async (item: Item) => {
  const newItems = items.map((i) => {
    if (i.id === item.id) {
      return item;
    }

    return i;
  });
  return newItems;
};

export const addItems = async (item: Item) => {
  items.push(item);
  return items;
};

export const removeItem = async (item: Item) => {
  const newItems = items.filter((i) => i.id !== item.id);
  return newItems;
};

export const getUsers = async () => {
  return users;
};

export const addUser = (user: string) => {
  users.push(user);
};

export const getRepartition = async () => {
  return repartitions;
};
