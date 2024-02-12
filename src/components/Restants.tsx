import React from "react";
import Box, { Status } from "./Box";

export default function Restants() {
  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign: "center" }}>Restants</h2>
      <div style={{ padding: "25px" }}>
        {items.map((item, index) => (
          <RestantItem item={item} key={`${item.name}-${index}`} />
        ))}
      </div>
    </div>
  );
}

export type Item = {
  name: string;
  price: number;
  status: Status[];
};

interface RestantItemProps {
  item: Item;
}

const RestantItem = (props: RestantItemProps) => {
  const { item } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{item.name}</p>
      <div style={{ display: "flex" }}>
        {item.status.map((status, index) => (
          <Box status={status} key={`${item.name}-${index}`} />
        ))}
      </div>
    </div>
  );
};

const items: Item[] = [
  { name: "Coca-Cola", price: 10, status: ["taken", "taken"] },
  { name: "Pringles", price: 20, status: ["taken"] },
];
