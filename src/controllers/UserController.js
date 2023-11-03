const userService = require("../services/UserService");

class UserController {
  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);

      if (newUser.code && newUser.message) {
        res.status(newUser.code).send({ message: newUser.message });
        return;
      }

      res.status(201).send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Houve um erro interno" });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);

      if (user.code && user.message) {
        res.status(user.code).send({ message: user.message });
        return;
      }

      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Houve um erro interno" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      if (users.code && users.message) {
        res.status(users.code).send({ message: users.message });
        return;
      }

      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Houve um erro interno" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedUser = await userService.updateUser(id, updateData);

      if (updatedUser.code && updatedUser.message) {
        res.status(updatedUser.code).send({ message: updatedUser.message });
        return;
      }

      res.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Houve um erro interno" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);

      if (deletedUser.code && deletedUser.message) {
        res.status(deletedUser.code).send({ message: deletedUser.message });
        return;
      }

      res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}

module.exports = new UserController();
