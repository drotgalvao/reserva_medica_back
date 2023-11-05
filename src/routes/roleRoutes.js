const express = require("express");
const roleController = require("../controllers/RoleController");

const router = express.Router();

router.post("/:id/doctor", roleController.defineAsDoctor);

router.post("/:id/patient", roleController.defineAsPatient);

module.exports = router;
