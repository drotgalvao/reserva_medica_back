const { ApiError } = require("./ApiError");

class UserValidation {
  static isValidUser(userData) {
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

    const errors = [];

    errors.push(UserValidation.isValidEmail(email));
    errors.push(UserValidation.isValidCpf(cpf));
    errors.push(UserValidation.isValidFirstName(firstName));
    errors.push(UserValidation.isValidLastName(lastName));
    errors.push(UserValidation.isValidPassword(password, confirmPassword));
    errors.push(UserValidation.isValidCellphone(cellphone));
    errors.push(UserValidation.isValidZipcode(zipcode));

    for (const error of errors) {
      if (error) {
        return error;
      }
    }

    return null;
  }

  static isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      return new ApiError(400, "O e-mail é obrigatório.");
    }

    if (!emailRegex.test(email)) {
      return new ApiError(400, "O e-mail está no formato inválido.");
    }

    return null;
  }

  static isValidCpf(cpf) {
    if (cpf.length !== 11) {
      return new ApiError(400, "O CPF deve conter exatamente 11 dígitos.");
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return new ApiError(
        400,
        "O CPF não pode conter todos os dígitos iguais."
      );
    }

    const calcDigit = (str, factor) => {
      const sum = str
        .split("")
        .map((digit) => parseInt(digit, 10))
        .reduce((acc, value, idx) => acc + value * (factor - idx), 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calcDigit(cpf.substring(0, 9), 10);
    if (parseInt(cpf.charAt(9), 10) !== digit1) {
      return new ApiError(
        400,
        "O primeiro dígito verificador do CPF é inválido."
      );
    }

    const digit2 = calcDigit(cpf.substring(0, 10), 11);
    if (parseInt(cpf.charAt(10), 10) !== digit2) {
      return new ApiError(
        400,
        "O segundo dígito verificador do CPF é inválido."
      );
    }

    return null;
  }

  static isValidFirstName(firstName) {
    const nameRegex = /^[a-zA-Z]{2,}$/;

    if (!firstName) {
      return new ApiError(400, "O primeiro nome é obrigatório.");
    }

    if (!nameRegex.test(firstName)) {
      return new ApiError(400, "O primeiro nome é inválido.");
    }

    return null;
  }

  static isValidLastName(lastName) {
    const nameRegex = /^[a-zA-Z]{2,}$/;

    if (!lastName) {
      return new ApiError(400, "O sobrenome é obrigatório.");
    }

    if (!nameRegex.test(lastName)) {
      return new ApiError(400, "O sobrenome é inválido.");
    }

    return null;
  }

  static isValidPassword(password, confirmPassword) {
    if (!password) {
      return new ApiError(400, "A senha é obrigatória.");
    }

    if (!confirmPassword) {
      return new ApiError(400, "A confirmação da senha é obrigatória.");
    }

    if (password !== confirmPassword) {
      return new ApiError(400, "As senhas não conferem.");
    }

    if (password.length < 8) {
      return new ApiError(400, "A senha deve ter pelo menos 8 caracteres.");
    }

    if (password.length > 20) {
      return new ApiError(400, "A senha deve ter no maximo 20 caracteres.");
    }

    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,20}$/;

    // if (!passwordRegex.test(password)) {
    //   return new ApiError(
    //     400,
    //     "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo."
    //   );
    // }

    const lowercaseRegex = /^(?=.*[a-z])/;
    if (!lowercaseRegex.test(password)) {
      return new ApiError(
        400,
        "A senha deve conter pelo menos uma letra minúscula."
      );
    }

    const uppercaseRegex = /^(?=.*[A-Z])/;
    if (!uppercaseRegex.test(password)) {
      return new ApiError(
        400,
        "A senha deve conter pelo menos uma letra maiúscula."
      );
    }

    const digitRegex = /^(?=.*\d)/;
    if (!digitRegex.test(password)) {
      return new ApiError(400, "A senha deve conter pelo menos um número.");
    }

    const symbolRegex = /^(?=.*[!@#$%^&*()])/;
    if (!symbolRegex.test(password)) {
      return new ApiError(400, "A senha deve conter pelo menos um símbolo.");
    }

    return null;
  }

  static isValidCellphone(cellphone) {
    const cellphoneRegex = /^[0-9]{10,11}$/;

    if (!cellphone) {
      return new ApiError(400, "O celular é obrigatório.");
    }

    if (!cellphoneRegex.test(cellphone)) {
      return new ApiError(400, "O celular está no formato inválido.");
    }

    return null;
  }

  static isValidZipcode(zipcode) {
    const zipcodeRegex = /^[0-9]{8}$/;

    if (!zipcode) {
      return new ApiError(400, "O CEP é obrigatório.");
    }

    if (zipcode.length > 8) {
      return new ApiError(
        400,
        "O CEP deve conter exatamente 8 dígitos numéricos."
      );
    }

    if (!zipcodeRegex.test(zipcode)) {
      return new ApiError(
        400,
        "O CEP está no formato inválido. Deve conter exatamente 8 dígitos numéricos."
      );
    }

    return null;
  }
}

module.exports = { UserValidation };
