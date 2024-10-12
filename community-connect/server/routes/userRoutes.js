const { Router } = require("express");
const userController = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.get("/users", isAuthenticated, isAdmin, userController.allUsers);
router.get("/user/:id", isAuthenticated, userController.singleUser);
router.put("/user/edit/:id", isAuthenticated, userController.updateProfile);

/** Admin routes **/
router.delete(
  "/admin/user/delete/:id",
  isAuthenticated,
  isAdmin,
  userController.deleteUser
);

module.exports = router;
