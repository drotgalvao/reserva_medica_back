const { prismaClient } = require("../config/prismaClient");
const bcrypt = require("bcrypt");

class AuthRepository {
  async login(email, password) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      user.isPasswordCorrect = isPasswordCorrect;
      delete user.password;
    }

    return user;
  }
}

module.exports = new AuthRepository();