const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

// Define user as a doctor
router.post("/users/:id/doctor", userController.defineAsDoctor);

// Define user as a patient
router.post("/users/:id/patient", userController.defineAsPatient);

module.exports = router;
