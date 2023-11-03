const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function connectDB() {
  try {
    await prismaClient.$connect();
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await prismaClient.$disconnect();
    console.log("Desconexão com o banco de dados realizada.");
  } catch (error) {
    console.error("Erro ao desconectar do banco de dados:", error);
    process.exit(1);
  }
}

module.exports = {
  prismaClient,
  connectDB,
  disconnectDB,
};
