const { Router } = require("express");
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/users", requireAuth, userController.allUsers);
router.get("/users/:id", requireAuth, userController.singleUser);

module.exports = router;
