var express = require("express");
var router = express.Router();

const userController = require("../controllers/user");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.patch("/bio", userController.verifyToken, userController.setBio);
router.patch("/color/:color", userController.verifyToken, userController.setColor);
router.patch("/pfp", userController.verifyToken, upload.single("image"), userController.setProfilePicture);

module.exports = router;