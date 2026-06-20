const exp = require("express");
const {register,login} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { profile } = require("../controllers/authController");
const router = exp.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile",protect, profile);

module.exports = router;