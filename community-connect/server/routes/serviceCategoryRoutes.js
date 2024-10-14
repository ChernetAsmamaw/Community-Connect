const { Router } = require("express");
const serviceCategoryController = require("../controllers/serviceCategoryController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/category/create",
  isAuthenticated,
  isAdmin,
  serviceCategoryController.createServiceCategory
);
router.get("/categories", serviceCategoryController.getAllServiceCategories);
router.get("/category/:id", serviceCategoryController.getServiceCategoryById);
router.put(
  "/category/update/:category_id",
  isAuthenticated,
  isAdmin,
  serviceCategoryController.updateServiceCategory
);
router.delete(
  "/category/delete/:category_id",
  isAuthenticated,
  isAdmin,
  serviceCategoryController.deleteServiceCategory
);

module.exports = router;
