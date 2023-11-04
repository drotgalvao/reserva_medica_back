const authService = require("../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      if (token instanceof Error) {
        return res.status(400).json({ message: token.message });
      }

      // Armazenar o token em um cookie
      res.cookie("token", token, { httpOnly: true });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Houve um erro interno" });
    }
  }
}

module.exports = new AuthController();
