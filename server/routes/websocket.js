const WebSocket = require("ws");
const { ShoppingList } = require("../models/shoppingList");
const calculateCosts = require("../services/costCalculator");

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");
    broadcast(wss, { type: "message", formatMessage: "Welcome !" });

    ws.on("message", async (message) => {
      //console.log('Received:', message);
      const messageString = message.toString();
      console.log("Received:", messageString);
      //const messageObject = JSON.parse(messageString);
      console.log("Received:", messageString);
      const { action, payload } = JSON.parse(messageString);
      console.log("Received:", action);
      console.log("Received:", payload);

      //console.log('Received:', messageObject.name);
      try {
        switch (action) {
          case "create":
            await handleCreateAction(payload, wss);
            break;
          case "update":
            await handleUpdateAction(payload, wss);
            break;
          case "delete":
            await handleDeleteAction(payload, wss);
            break;
          case "get":
            await handleGetAction(ws);
            break;
          case "calculateBalances":
            await handleCalculateBalancesAction(ws);
            break;
          default:
            ws.send(JSON.stringify({ error: "Invalid action" }));
        }
      } catch (err) {
        console.error("Error handling message:", err);
        ws.send(JSON.stringify({ error: "Error processing your request" }));
      }
    });
  });

  async function handleCreateAction(payload, wss) {
    const shoppingList = new ShoppingList({
      name: payload.name,
      price: payload.price,
      units: payload.units,
    });
    await shoppingList.save();
    broadcast(wss, { type: "shoppingListAdded", data: shoppingList });
  }

  async function handleUpdateAction(payload, wss) {
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      payload._id,
      {
        name: payload.name,
        price: payload.price,
        units: payload.units,
      },
      { new: true }
    );
    if (updatedShoppingList) {
      broadcast(wss, {
        type: "shoppingListUpdated",
        data: updatedShoppingList,
      });
    } else {
      wss.send(JSON.stringify({ error: "Shopping list not found" }));
    }
  }

  async function handleDeleteAction(payload, wss) {
    const shoppingListToDelete = await ShoppingList.findByIdAndDelete(
      payload._id
    );
    if (shoppingListToDelete) {
      broadcast(wss, {
        type: "shoppingListDeleted",
        data: shoppingListToDelete,
      });
    } else {
      wss.send(JSON.stringify({ error: "Shopping list not found" }));
    }
  }

  async function handleGetAction(ws) {
    try {
      const shoppingLists = await ShoppingList.find();
      ws.send(JSON.stringify({ type: "shoppingLists", data: shoppingLists }));
    } catch (err) {
      console.error("Error fetching shopping lists:", err);
      ws.send(JSON.stringify({ error: "Error fetching shopping lists" }));
    }
  }

  async function handleCalculateBalancesAction(ws) {
    try {
      const shoppingList = await ShoppingList.find();
      const balances = await calculateCosts(shoppingList);
      ws.send(JSON.stringify({ type: "balances", data: balances }));
    } catch (error) {
      ws.send(
        JSON.stringify({
          error: "An error occurred while calculating the balances.",
        })
      );
    }
  }

  function broadcast(wss, data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

module.exports = setupWebSocketServer;
