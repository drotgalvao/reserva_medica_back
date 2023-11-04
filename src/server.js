// importacoes
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const finalErrorHandler = require("./middlewares/finalError");

const app = express();

// aplica as configuracoes nas rotas
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// insere as rotas no projeto
app.use(routes);
app.use(finalErrorHandler);

module.exports = { app };
