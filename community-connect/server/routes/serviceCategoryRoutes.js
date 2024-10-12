const { Router } = require("express");
const serviceCategoryController = require("../controllers/serviceCategoryController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/category/create",
  isAuthenticated,
  serviceCategoryController.createServiceCategory
);
router.get("/category/all", serviceCategoryController.getAllServiceCategories);
router.get("/category/:id", serviceCategoryController.getServiceCategoryById);

module.exports = router;
