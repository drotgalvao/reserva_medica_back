const express = require("express");
const userController = require("../controllers/UserController");
const auth = require("../middlewares/Auth");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.patch("/:id", auth.authenticateToken, auth.verifySelf, userController.updateUser);
router.delete("/:id", userController.deleteUser);


module.exports = router;
