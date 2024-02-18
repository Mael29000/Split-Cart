const WebSocket = require('ws');
const { ShoppingList } = require('../models/shoppingList'); 

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        broadcast(wss, {type: "message", formatMessage: "Welcome !"})

        ws.on('message', async (message) => {
            //console.log('Received:', message);
            const messageString = message.toString();
            const messageObject = JSON.parse(messageString);
            

            //console.log('Received:', messageObject.name);
            try {
                    const shoppingLists = new ShoppingList({
                        name: messageObject.name,
                        price: messageObject.price,
                        units: messageObject.units,
                    });

                    //console.log(shoppingLists.name)
                    shoppingLists.save();
                
                    broadcast(wss, { type: "shoppingListAdded", data: shoppingLists });

            } catch (err) {
                console.error('Error handling message:', err);
                ws.send(JSON.stringify({ error: 'Error processing your request' }));
            }
        });
    });

    function broadcast(wss, data) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}

module.exports = setupWebSocketServer;
