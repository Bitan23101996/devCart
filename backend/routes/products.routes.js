const express = require('express');
const { readDB, writeDB } = require('../utils/dbReadWrite.utils');
const response = require('./../libs/responseLib');

const router = express.Router();

router.get("/", (req, res) => {
    const { name } = req.query;
    const db = readDB();
    let results = db.products;
    if (name) {
        results = results.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
    res.status(200).json(response.generate(false, 'Product(s) fetched succesfully', 200, results));
    // res.status(200).json(results);
})

router.post("/", (req, res) => {
    const { category, price, name, description } = req.body;
    if (category && price && name && description) {
        const data = { ...req.body, id: Date.now() };
        const db = readDB();
        db.products.push(data);
        writeDB(db);
        // res.status(201).json({ message: 'Products added successfully', product: data });
        res.status(201).json(response.generate(false, 'Product(s) added successfully', 201, data));

    }
    else {
        // res.status(400).json({ message: 'Bad request' });
        res.status(400).json(response.generate(true, 'Bad request', 400, null));

    }

})

router.get("/:productId", (req, res) => {
    console.log("products param", req.params.productId);
    const { productId } = req.params;
    if (productId && typeof +productId === 'number') {
        const db = readDB();
        const product = db.products.find(p => p.id === +productId);
        if (product) {
            // res.status(200).json({ message: 'Product fetched successfully', product: product });
            res.status(200).json(response.generate(false, 'Product fetched successfully', 200, product));

        }
        else {
            // res.status(200).json({ message: 'No product found', product: [] });
            res.status(200).json(response.generate(false, 'No product found', 200, null));

        }
    }
    else {
        // res.status(400).json({ message: 'Bad request' });
        res.status(400).json(response.generate(true, 'Bad request', 400, null));

    }

})
module.exports = router;