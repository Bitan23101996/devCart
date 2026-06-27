const express = require('express');
const { readDB, writeDB } = require('../utils/dbReadWrite.utils');
const response = require('./../libs/responseLib');

const router = express.Router();


router.post("/placeOrder", (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    const db = readDB();

    const userCartItems = db.cart.filter((item) => item.username === username);

    if (userCartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    if (!db.orders) {
        db.orders = [];
    }

    db.orders.push({
        orderId: Date.now(),
        username,
        items: userCartItems,
        orderDate: new Date().toISOString(),
    });

    // Remove all cart items for this user
    db.cart = db.cart.filter((item) => item.username !== username);

    writeDB(db);

    return res.status(200).json({
        message: "Order placed successfully",
        username,
    });
});