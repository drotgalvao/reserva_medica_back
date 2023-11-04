const userRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async login(email, password) {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      return new Error("User not found");
    }

    console.log(password , user)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return new Error("Incorrect password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
}

module.exports = new AuthService();
