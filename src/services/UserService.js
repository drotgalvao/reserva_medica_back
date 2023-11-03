const userRepository = require("../repositories/UserRepository");
const { UserValidation } = require("../utils/UserValidation");
const ApiError = require("../utils/ApiError");

class UserService {
  async createUser(userData) {
    try {
      const {
        email,
        cpf,
        firstName,
        lastName,
        password,
        confirmPassword,
        cellphone,
        zipcode,
        addressDetails,
        type,
      } = userData;

      userData.cpf = cpf.replace(/[.-]/g, "");
      userData.cellphone = cellphone.replace(/[() -]/g, "");
      userData.zipcode = zipcode.replace(/[.-]/g, "");
      userData.type = "PATIENT";

      const isValidUser = UserValidation.isValidUser(userData);

      if (isValidUser) {
        const { code, message } = isValidUser;

        return { code, message };
      }

      const isEmailUnique = await userRepository.findUserByEmail(email);
      if (isEmailUnique) {
        return { code: 400, message: "Email já cadastrado em nosso sistema" };
      }

      const isCpfUnique = await userRepository.findUserByCpf(userData.cpf);
      if (isCpfUnique) {
        return { code: 400, message: "CPF já cadastrado em nosso sistema" };
      }

      const isCellphoneUnique =
        await userRepository.findUserByCellphone(userData.cellphone);
      if (isCellphoneUnique) {
        return { code: 400, message: "Celular já cadastrado em nosso sistema" };
      }

      delete userData.confirmPassword;
      const newUser = await userRepository.createUser(userData);
      delete newUser.password
      return newUser;
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Houve um erro interno" };
    }
  }

  async getUserById(id) {
    try {
      const user = await userRepository.findUserById(id);
      if (!user) {
        return { code: 404, message: "Usuário não encontrado" };
      }
      return user;
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Houve um erro interno" };
    }
  }

  async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Houve um erro interno" };
    }
  }

  async updateUser(id, updateData) {
    try {
      // Extract only the fields that can be updated
      const {
        firstName,
        lastName,
        cellphone,
        password,
        confirmPassword,
        zipcode,
        addressDetails,
      } = updateData;

      // Create a new object with only the fields to update
      const dataToUpdate = {
        firstName,
        lastName,
        cellphone,
        password,
        zipcode,
        addressDetails,
      };

      // Remove undefined properties
      Object.keys(dataToUpdate).forEach(
        (key) => dataToUpdate[key] === undefined && delete dataToUpdate[key]
      );

      // Validate each field if it exists in the updateData
      if (dataToUpdate.firstName) {
        const firstNameError = UserValidation.isValidFirstName(
          dataToUpdate.firstName
        );
        if (firstNameError) return firstNameError;
      }

      if (dataToUpdate.lastName) {
        const lastNameError = UserValidation.isValidLastName(
          dataToUpdate.lastName
        );
        if (lastNameError) return lastNameError;
      }

      if (dataToUpdate.cellphone) {
        dataToUpdate.cellphone = cellphone.replace(/[() -]/g, "");
        const cellphoneError = UserValidation.isValidCellphone(
          dataToUpdate.cellphone
        );
        if (cellphoneError) return cellphoneError;

        // Check if cellphone is unique
        const isCellphoneUnique =
          await userRepository.findUserByCellphone(cellphone);
        if (isCellphoneUnique && isCellphoneUnique.id !== id) {
          return {
            code: 400,
            message: "Celular já cadastrado em nosso sistema",
          };
        }
      }

      if (dataToUpdate.password) {
        const passwordError = UserValidation.isValidPassword(
          dataToUpdate.password,
          confirmPassword
        );
        if (passwordError) return passwordError;
      }

      if (dataToUpdate.zipcode) {
        dataToUpdate.zipcode = zipcode.replace(/[.-]/g, "");
        const zipcodeError = UserValidation.isValidZipcode(
          dataToUpdate.zipcode
        );
        if (zipcodeError) return zipcodeError;
      }

      // If all checks pass, update the user
      const updatedUser = await userRepository.updateUser(id, dataToUpdate);
      delete updatedUser.password
      return updatedUser;
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Houve um erro interno" };
    }
  }
}

module.exports = new UserService();
