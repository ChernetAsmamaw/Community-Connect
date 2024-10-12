const { Router } = require("express");
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/me", isAuthenticated, authController.profile);

module.exports = router;
