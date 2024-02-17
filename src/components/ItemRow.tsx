import React from "react";
import { Item, ItemType, Status } from "./types";
import Box from "./Box";

interface ItemRowProps {
  type: ItemType;
  item: Item;
  updateOneItem: (item: Item) => void;
  removeOneItem: (item: Item) => void;
}

export default function ItemRow(props: ItemRowProps) {
  const { type, item, updateOneItem, removeOneItem } = props;

  const currentUser = localStorage.getItem("user") || "";

  const onBoxClick = (status: Status, index: number) => {
    if (status === "remaining") return;

    // if it's taken and the user is the current user, then it's a missing
    // if it's lock and the user is the current user, then it's a taken
    // if it's a missing, then it's a lock
    // otherwise, do nothing

    const currentUser = localStorage.getItem("user");

    if (status === "taken" && item.units[index].user === currentUser) {
      item.units[index] = { status: "missing", user: "" };
    } else if (status === "lock" && item.units[index].user === currentUser) {
      item.units[index] = { status: "taken", user: currentUser };
    } else if (status === "missing" && currentUser) {
      item.units[index] = { status: "lock", user: currentUser };
    }

    updateOneItem(item);
  };

  const addUnit = () => {
    if (type === "restant") {
      item.units.push({ status: "remaining", user: currentUser });
      updateOneItem(item);
      return;
    } else if (type === "besoin") {
      item.units.push({ status: "missing", user: "" });
      updateOneItem(item);
    }
  };

  const removeUnit = () => {
    if (type === "restant") {
      item.units.pop();
    } else if (type === "besoin") {
      const lastMissingIndex = item.units.reduce((acc, unit, index) => {
        if (unit.status === "missing") {
          return index;
        }

        return acc;
      }, -1);

      if (lastMissingIndex !== -1) {
        item.units.splice(lastMissingIndex, 1);
      }
    }

    if (item.units.length === 0) {
      removeOneItem(item);
    } else {
      updateOneItem(item);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{item.name}</p>
        <p>{item.price}€</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        {item.units.map((unit, index) => (
          <Box
            unit={unit}
            key={`${item.name}-${index}`}
            onClick={() => {
              onBoxClick(unit.status, index);
            }}
          />
        ))}
        <button
          style={{
            fontSize: "16px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            color: "#999999",
            marginLeft: "5px",
          }}
          onClick={addUnit}
        >
          +
        </button>

        <button
          style={{
            fontSize: "16px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            color: "red",
            fontWeight: "600",
          }}
          onClick={removeUnit}
        >
          -
        </button>
      </div>
    </div>
  );
}
