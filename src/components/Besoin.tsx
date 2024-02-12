import React from "react";
import { Item } from "./Restants";
import Box from "./Box";

export default function Besoin() {
  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign: "center" }}>Besoin</h2>
      <div style={{ padding: "25px" }}>
        {items.map((item, index) => (
          <BesoinItem item={item} key={`${item.name}-${index}`} />
        ))}
      </div>
    </div>
  );
}

interface BesoinItemProps {
  item: Item;
}

const BesoinItem = (props: BesoinItemProps) => {
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

const items: Item[] = [{ name: "Coca-Cola", price: 10, status: ["lock"] }];
