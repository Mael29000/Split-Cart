export type Item = {
  id: string;
  name: string;
  price: number;
  units: Unit[];
};

export type Status = "taken" | "missing" | "lock" | "remaining";

export interface Unit {
  status: Status;
  user: string;
}

export type ItemType = "restant" | "besoin";

export type User = string;

export interface Part {
  user: User;
  total: number;
}

export interface Data {
  items: Item[];
  users: User[];
  repartitions: Part[];
}
