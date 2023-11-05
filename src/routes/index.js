// importacoes
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const roleRoutes = require("./roleRoutes");

// criar rotas especificar
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);

module.exports = router;
