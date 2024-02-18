import React from "react";

import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import MidPannel from "../components/MidPanel";
import { Item } from "../components/types";
import { useShoppingList } from "../contexts/ShoppingList";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRepartition } from "../contexts/RepartitionContext";

export default function Home() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:3001"
  ); // Replace with your server URL

  const { shoppingList, setShoppingList } = useShoppingList();
  const { repartition, setRepartition } = useRepartition();

  React.useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ action: "get" }));
    }
  }, [readyState, sendMessage]);

  // Update data when a new message is received
  React.useEffect(() => {
    console.log("lastMessage", lastMessage);

    if (lastMessage?.data) {
      const data = JSON.parse(lastMessage.data);

      console.log("data", data);

      if (data.type === "shoppingLists") {
        let itemData: Item[] = [];

        data.data.forEach((item: any) => {
          itemData.push({
            id: item._id,
            name: item.name,
            price: item.price,
            units: item.units.map((unit: any) => ({
              status: unit.status,
              user: unit.user,
            })),
          });
        });

        setShoppingList(itemData);
      }

      if (data.type === "shoppingListAdded") {
        setShoppingList([
          ...shoppingList,
          {
            id: data.data._id,
            name: data.data.name,
            price: data.data.price,
            units: data.data.units.map((unit: any) => ({
              status: unit.status,
              user: unit.user,
            })),
          },
        ]);
      }

      if (data.type === "shoppingListDeleted") {
        setShoppingList(
          shoppingList.filter((item) => item.id !== data.data._id)
        );
      }

      if (data.type === "shoppingListUpdated") {
        setShoppingList(
          shoppingList.map((item) => {
            if (item.id === data.data._id) {
              return {
                id: data.data._id,
                name: data.data.name,
                price: data.data.price,
                units: data.data.units.map((unit: any) => ({
                  status: unit.status,
                  user: unit.user,
                })),
              };
            }

            return item;
          })
        );
      }

      if (data.type === "calculateBalances") {
        setRepartition(
          data.data.map((part: any) => ({
            user: part.user,
            total: part.total,
          }))
        );
      }
    }
  }, [lastMessage, setShoppingList]);

  return (
    <>
      <Header />
      <div
        style={{
          padding: "50px",
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "50px",
          height: "calc(100vh - 200px)",
        }}
      >
        <LeftPanel />
        <MidPannel />
        {/* <RightPanel /> */}
      </div>
    </>
  );
}
