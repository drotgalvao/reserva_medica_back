const authRepository = require("../repositories/AuthRepository");

class AuthService {
  async login(email, password) {
    const user = await authRepository.login(email, password);

    if (!user) {
      return new Error("Usuário não encontrado");
    }

    if (!user.isPasswordCorrect) {
      return new Error("Senha incorreta");
    }

    return user;
  }

  

}

module.exports = new AuthService();
