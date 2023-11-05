const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RoleRepository {
  async defineAsDoctor(userId, doctorData) {
    try {
      // Atualize o tipo de usuário para 'DOCTOR'
      await prisma.user.update({
        where: { id: userId },
        data: { type: "DOCTOR" },
      });

      // Crie um novo registro de Médico
      await prisma.doctor.create({
        data: {
          ...doctorData,
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async defineAsPatient(userId, patientData) {
    try {
      // Atualize o tipo de usuário para 'PATIENT'
      await prisma.user.update({
        where: { id: userId },
        data: { type: "PATIENT" },
      });

      // Crie um novo registro de Paciente
      await prisma.patient.create({
        data: {
          ...patientData,
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoleRepository();
