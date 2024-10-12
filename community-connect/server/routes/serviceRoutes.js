const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.post(
  "/service/create",
  isAdmin,
  isAuthenticated,
  serviceController.createService
);
router.get("/services", serviceController.getAllServices);
router.get("/service/:id", serviceController.getServiceById);
router.put(
  "/service/update/:service_id",
  isAdmin,
  isAuthenticated,
  serviceController.updateService
);

module.exports = router;
