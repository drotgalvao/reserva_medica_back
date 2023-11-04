const jwtToken = require("../utils/JwtToken");

class Auth {
  authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    try {
      const decoded = jwtToken.verify(token);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).json({ message: "Token inválido." });
    }
  }

  authorizePatient(req, res, next) {
    if (req.user.type !== "PATIENT") {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para acessar este recurso.",
      });
    }
    next();
  }

  authorizeDoctor(req, res, next) {
    if (req.user.type !== "DOCTOR") {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para acessar este recurso.",
      });
    }
    next();
  }

  authorizeAdmin(req, res, next) {
    if (req.user.type !== "ADMIN") {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para acessar este recurso.",
      });
    }
    next();
  }

  verifySelf(req, res, next) {
    const { id } = req.params;

    if (String(req.user.userId) !== String(id)) {
      return res.status(403).json({
        message:
          "Você não tem permissão para atualizar os dados de outro usuário.",
      });
    }

    next();
  }
}

module.exports = new Auth();
