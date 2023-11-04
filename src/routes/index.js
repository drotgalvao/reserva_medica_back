// importacoes
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

// criar rotas especificar
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
