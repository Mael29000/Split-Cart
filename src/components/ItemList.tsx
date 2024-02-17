import React from "react";
import { Item, ItemType, Unit } from "./types";
import { addItems, getAllItems, removeItem, updateItem } from "./mocks";
import ItemRow from "./ItemRow";

interface ItemListProps {
  type: ItemType;
}

export default function ItemList(props: ItemListProps) {
  const { type } = props;

  const [items, setItems] = React.useState<Item[]>([]);
  const [tempItems, setTempItems] = React.useState<Item>();

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

  const updateOneItem = (item: Item) => {
    updateItem(item).then((items) => {
      setItems(filterItems(items));
    });
  };

  const addATempItem = () => {
    if (!tempItems) {
      setTempItems({
        id: "-1",
        name: "Nouveau besoin",
        price: 0,
        units: [{ status: "missing", user: "" }],
      });
    }
  };

  const addOneItem = (item: Item) => {
    addItems(item).then((items) => {
      setItems(filterItems(items));
    });
  };

  const removeOneItem = (item: Item) => {
    removeItem(item).then((items) => {
      setItems(filterItems(items));
    });
  };

  React.useEffect(() => {
    // get all the items from the server
    getAllItems().then((items: Item[]) =>
      // remove all the remaining items

      setItems(filterItems(items))
    );
  }, []);

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
