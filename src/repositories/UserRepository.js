const { prismaClient } = require("../config/prismaClient");

class UserRepository {
  async createUser(userData) {
    return await prismaClient.user.create({
      data: userData,
    });
  }

  async findUserById(id) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      delete user.password;
    }
    return user;
  }

  async findUserByEmail(email) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      delete user.password;
    }
    return user;
  }

  async findUserByCpf(cpf) {
    const user = await prismaClient.user.findUnique({
      where: {
        cpf,
      },
    });
    if (user) {
      delete user.password;
    }
    return user;
  }

  async findUserByCellphone(cellphone) {
    const user = await prismaClient.user.findUnique({
      where: {
        cellphone,
      },
    });
    if (user) {
      delete user.password;
    }
    return user;
  }

  async getAllUsers() {
    return await prismaClient.user.findMany();
  }

  async updateUser(id, updateData) {
    return await prismaClient.user.update({
      where: { id: id },
      data: updateData,
    });
  }
}

module.exports = new UserRepository();
