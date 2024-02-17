 const express = require("express");
 const router = express.Router();
 const { ShoppingList } = require("../models/shoppingList");
 const calculateCosts = require("../services/costCalculator");
 
 router.get('/calculateBalances', async(req, res) => {
    try {
        const shoppingList = await ShoppingList.find();
        const balances = await calculateCosts(shoppingList);
        res.send(balances);
    } catch (error) {
        res.status(500).send('An error occurred while calculating the balances.');
    }
 });

 module.exports = router;