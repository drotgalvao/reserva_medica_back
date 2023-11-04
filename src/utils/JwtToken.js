const jwt = require("jsonwebtoken");

class JwtToken {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }

  verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (ex) {
      return null;
    }
  }
}

module.exports = new JwtToken();
