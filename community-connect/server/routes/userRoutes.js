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

/** User Services History  routes **/
router.post(
  "/user/booking-history",
  isAuthenticated,
  userController.createBookingHistory
);

module.exports = router;
