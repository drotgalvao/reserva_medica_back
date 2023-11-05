const roleService = require("../services/RoleService");

class RoleController {
  async defineAsDoctor(req, res) {
    const { id } = req.params;
    const doctorData = req.body;
    try {
      await roleService.defineAsDoctor(id, doctorData);
      res
        .status(200)
        .json({ message: "Usuário definido como Médico com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro.", error });
    }
  }

  async defineAsPatient(req, res) {
    const { id } = req.params;
    const patientData = req.body;
    try {
      await roleService.defineAsPatient(id, patientData);
      res
        .status(200)
        .json({ message: "Usuário definido como Paciente com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro.", error });
    }
  }
}

module.exports = new RoleController();
