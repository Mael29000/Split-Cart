import React from "react";
import { Item, ItemType, Unit } from "./types";
import ItemRow from "./ItemRow";
import { useShoppingList } from "../contexts/ShoppingList";
import useWebSocket from "react-use-websocket";

interface ItemListProps {
  type: ItemType;
}

export default function ItemList(props: ItemListProps) {
  const { shoppingList } = useShoppingList();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:3001"
  ); // Replace with your server URL

  const { type } = props;
  const filterItems = (items: Item[]) => {
    if (type === "restant") {
      return items.filter((item) => {
        return item.units.every((unit: Unit) => {
          return unit.status === "remaining";
        });
      });
    } else {
      return items.filter((item) => {
        return item.units.every((unit: Unit) => {
          return unit.status !== "remaining";
        });
      });
    }
  };
  const [items, setItems] = React.useState<Item[]>(filterItems(shoppingList));

  React.useEffect(() => {
    setItems(filterItems(shoppingList));
  }, [shoppingList]);

  const [tempItems, setTempItems] = React.useState<Item>();

  const updateOneItem = (item: Item) => {
    // use the websocket to send the updated item to the server
    sendMessage(
      JSON.stringify({
        action: "update",
        payload: {
          _id: item.id,
          name: item.name,
          price: item.price,
          units: item.units.map((unit) => ({
            user: unit.user,
            status: unit.status,
          })),
        },
      })
    );
  };

  const addATempItem = () => {
    if (!tempItems) {
      setTempItems({
        id: "-1",
        name: "Nouveau besoin",
        price: 0,
        units: [
          { status: type === "besoin" ? "missing" : "remaining", user: "" },
        ],
      });
    }
  };

  const addOneItem = (item: Item) => {
    // use the websocket to send the new item to the server
    sendMessage(
      JSON.stringify({
        action: "create",
        payload: {
          _id: item.id,
          name: item.name,
          price: item.price,
          units: item.units.map((unit) => ({
            user: unit.user,
            status: unit.status,
          })),
        },
      })
    );
  };

  const removeOneItem = (item: Item) => {
    sendMessage(
      JSON.stringify({
        action: "delete",
        payload: {
          _id: item.id,
          name: item.name,
          price: item.price,
          units: item.units.map((unit) => ({
            user: unit.user,
            status: unit.status,
          })),
        },
      })
    );
  };

  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign: "center" }}>
        {type === "besoin" ? "Besoin" : "Restants"}
      </h2>
      <div style={{ padding: "25px" }}>
        {items.map((item, index) => (
          <ItemRow
            type={type}
            item={item}
            key={`${item.name}-${index}`}
            updateOneItem={updateOneItem}
            removeOneItem={removeOneItem}
          />
        ))}
      </div>
      {tempItems && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            marginTop: "-15px",
            padding: "0 25px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              style={{
                fontSize: "16px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                fontFamily: 'Montserrat, "sans-serif"',
              }}
              value={tempItems.name}
              onChange={(e) => {
                setTempItems({ ...tempItems, name: e.target.value });
              }}
            />

            <div style={{ display: "flex" }}>
              <input
                style={{
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "30px",
                  fontFamily: 'Montserrat, "sans-serif"',
                  textAlign: "end",
                }}
                value={tempItems.price}
                onChange={(e) => {
                  setTempItems({
                    ...tempItems,
                    price: parseInt(e.target.value),
                  });
                }}
              />
              €
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button
              style={{
                fontSize: "16px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                outline: "none",
                color: "#999999",
              }}
              onClick={() => {
                addOneItem(tempItems);
                setTempItems(undefined);
              }}
            >
              Valider
            </button>
          </div>
        </div>
      )}
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          outline: "none",
          alignSelf: "center",
          width: "100%",
          color: "#999999",
        }}
        onClick={addATempItem}
      >
        {`+ Ajouter un ${type === "besoin" ? "besoin" : "article restant"}`}
      </button>
    </div>
  );
}
