const authService = require("../services/AuthService");
const jwtToken = require("../utils/JwtToken");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);

      if (user instanceof Error) {
        return res.status(400).json({ message: user.message });
      }

      const token = jwtToken.sign({ userId: user.id, type: user.type });

      res.cookie("token", token, { httpOnly: true });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Houve um erro interno" });
    }
  }
}

module.exports = new AuthController();
