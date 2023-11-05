const roleRepository = require("../repositories/RoleRepository");

class RoleService {
  async defineAsDoctor(userId, doctorData) {
    // Aqui você pode adicionar qualquer lógica de negócio necessária antes de salvar os dados
    // Em seguida, chame o repositório para salvar os dados no banco de dados
    try {
      await roleRepository.defineAsDoctor(userId, doctorData);
    } catch (error) {
      throw error;
    }
  }

  async defineAsPatient(userId, patientData) {
    // Aqui você pode adicionar qualquer lógica de negócio necessária antes de salvar os dados
    // Em seguida, chame o repositório para salvar os dados no banco de dados
    try {
      await roleRepository.defineAsPatient(userId, patientData);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoleService();
