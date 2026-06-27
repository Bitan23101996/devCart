const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();

//Routes
const productRouter = require('./routes/products.routes');
const authRouter = require('./routes/auth.routes');
const cartRouter = require('./routes/cart.routes');

//Utils
const authenticate = require('./utils/auth.utils');

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send('<h1>Welcome to server</h1>');
});
app.use("/", authRouter);
app.use("/api/products", authenticate, productRouter);
app.use("/api/cart", authenticate, cartRouter);
app.listen(process.env.PORT, () => console.log("devCart backend server running at port " + process.env.PORT + "..."));