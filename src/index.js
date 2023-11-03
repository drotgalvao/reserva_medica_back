// importacoes
const { app } = require("./server");
const { connectDB, disconnectDB } = require("./config/prismaClient");

const port = process.env.PORT || 3000;

// inicia o app
const startApp = async () => {
  try {
    // inicia o banco e o server
    await connectDB(); // Conecta ao banco de dados
    app.listen(port, () => {
      console.log(`Servidor ouvindo na porta ${port}`);
    });

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];

    // escuta os sinais de saida
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          // desconecta o banco e encerra o server
          await disconnectDB();
          console.log("App encerrou com sucesso");
          process.exit(0);
        } catch (err) {
          console.log(`App terminou com falha: ${err}`);
          process.exit(1);
        }
      })
    );
  } catch (error) {
    console.error("Ocorreu um erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
};

startApp();
