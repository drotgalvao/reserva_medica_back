const { prismaClient } = require("../config/prismaClient");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);

class UserRepository {
  async createUser(userData) {

    userData.password = await bcrypt.hash(userData.password, saltRounds);

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
    const users = await prismaClient.user.findMany();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }
  
  async updateUser(id, updateData) {

        if (updateData.password) {
          updateData.password = await bcrypt.hash(
            updateData.password,
            saltRounds
          );
        }

    return await prismaClient.user.update({
      where: { id: id },
      data: updateData,
    });
  }

  async deleteUser(id) {
    try {
      const deletedUser = await prismaClient.user.delete({
        where: { id: id },
      });
      return deletedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new UserRepository();
