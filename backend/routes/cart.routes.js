const express = require('express');
const { readDB, writeDB } = require('../utils/dbReadWrite.utils');
const response = require('./../libs/responseLib');

const router = express.Router();



router.post("/", (req, res) => {
    const { username } = req.body;

    if (username) {
        const db = readDB();

        const results = db.cart.filter(
            p => p.username === username
        );

        return res.status(200).json(
            response.generate(false, 'Cart fetched successfully', 200, results)
        );
    }

    return res.status(400).json(
        response.generate(true, 'Invalid input', 400, null)
    );
});

router.post("/addCart", (req, res) => {
    const { username, productId } = req.body;
    if (username && productId && typeof productId === 'number') {
        const db = readDB();
        const availableProduct = db.cart.find(p => p.id === +productId && p.username === username);
        if (availableProduct) {
            const updatedCartList = db.cart.map(p => {
                if (p.id === +productId && p.username === username) {
                    return {
                        ...p,
                        quantity: p.quantity + 1
                    }
                }
                return p;
            })
            db.cart = updatedCartList;
            writeDB(db);

            //Only return loggedin user details
            const userCart = db.cart.filter(
                p => p.username === username
            );

            // res.status(200).json({ message: 'Cart updated successfully', ...req.body });
            return res.status(200).json(response.generate(false, 'Cart updated successfully', 200, userCart));

        }
        const results = db.products.find(p => p.id === +productId);
        if (results) {
            db.cart.push({
                ...results,
                username: username,
                quantity: 1
            });
            writeDB(db);
            //Only return loggedin user details
            const userCart = db.cart.filter(
                p => p.username === username
            );

            // res.status(200).json({ message: 'Cart added successfully', ...req.body });
            return res.status(200).json(response.generate(false, 'Cart added successfully', 200, userCart));
        } else {
            // res.status(400).json({ message: 'No product found', ...req.body });
            return res.status(400).json(response.generate(false, 'No product found', 400, null));

        }

    }
})

router.post("/deleteCart", (req, res) => {
    const { username, productId } = req.body;
    if (username && productId && typeof productId === 'number') {
        const db = readDB();
        const availableProduct = db.cart.find(p => p.id === +productId && p.username === username);
        if (availableProduct && availableProduct.quantity > 1) {
            updatedCartList = db.cart.map(p => {
                if (p.id === +productId && p.username === username) {
                    return {
                        ...p,
                        quantity: p.quantity - 1
                    }
                }
                return p;
            })
            db.cart = updatedCartList;
            writeDB(db);
            //Only return loggedin user details
            const userCart = db.cart.filter(
                p => p.username === username
            );

            // res.status(200).json({ message: 'Item from cart reduced successfully', ...req.body });
            res.status(200).json(response.generate(false, 'Item from cart reduced successfully', 200, userCart));

            return;
        }
        results = db.cart.filter(p => !(p.id === +productId && p.quantity === 1 && p.username === username));
        db.cart = results;
        writeDB(db);

        const userCart = db.cart.filter(
            p => p.username === username
        );

        // res.status(200).json({ message: 'Item from cart deleted successfully', ...req.body });
        return res.status(200).json(response.generate(false, 'Item from cart deleted successfully', 200, userCart));

    }
})

router.post("/clearCart", (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json(
            response.generate(true, "Username is required", 400, null)
        );
    }

    const db = readDB();

    // Check if user has any cart items
    const userCart = db.cart.filter(item => item.username === username);

    if (userCart.length === 0) {
        return res.status(404).json(
            response.generate(true, "Cart is already empty", 404, null)
        );
    }

    // Remove all cart items for the user
    db.cart = db.cart.filter(item => item.username !== username);

    writeDB(db);

    return res.status(200).json(
        response.generate(false, "Cart cleared successfully", 200, [])
    );
});

module.exports = router;