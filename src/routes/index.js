// importacoes
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");

// criar rotas especificar
router.use("/users", userRoutes);

module.exports = router;
