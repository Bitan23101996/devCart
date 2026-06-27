const express = require("express");
const jwt = require("jsonwebtoken");
const { readDB, writeDB } = require("../utils/dbReadWrite.utils");
const response = require("./../libs/responseLib");
const bcrypt = require("bcrypt");
const router = express.Router();
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, password, name } = req.body;
  const db = readDB();

  if (!username || !password || !name) {
    return res
      .status(400)
      .json(response.generate(true, "Bad request", 400, null));
  }

  const user = db.users.find((u) => u.username === username);

  if (user) {
    return res
      .status(400)
      .json(response.generate(true, "User already exists.", 400, null));
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  db.users.push({
    name,
    username,
    password: hashedPassword,
  });

  writeDB(db);

  res
    .status(201)
    .json(response.generate(false, "Registration successful.", 201, null));
});

//Login route
router.post("/login", async (req, res) => {
  const { username = "", password = "" } = req.body;
  const db = readDB();

  if (!username || !password) {
    return res
      .status(400)
      .json(response.generate(true, "Bad request", 400, null));
  }

  const user = db.users.find((u) => u.username === username);

  if (!user) {
    return res
      .status(401)
      .json(response.generate(true, "Invalid credentials", 401, null));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(401)
      .json(response.generate(true, "Invalid credentials", 401, null));
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  res.status(200).json(
    response.generate(false, "User logged in successfully.", 200, {
      token,
      name: user.name,
      userid: user.username,
    }),
  );
});

module.exports = router;
