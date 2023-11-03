const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


module.exports = router;
