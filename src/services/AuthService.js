const authRepository = require("../repositories/AuthRepository");
const jwt = require("jsonwebtoken");

class AuthService {
  async login(email, password) {
    const user = await authRepository.login(email, password);

    if (!user) {
      return new Error("Usuário não encontrado");
    }

    if (!user.isPasswordCorrect) {
      return new Error("Senha incorreta");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
}

module.exports = new AuthService();
