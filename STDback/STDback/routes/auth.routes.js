const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");

const authController = require("../controllers/auth.controller");

router.post("/teacher/signup", authController.register);
router.post("/teacher/login", authController.login);
router.post("/student/signup", authController.register);
router.post("/student/login", authController.login);

router.get("/teacher/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the protected teacher dashboard!",
    user: req.user,
  });
});

module.exports = router;
