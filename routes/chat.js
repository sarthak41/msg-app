var express = require("express");
var router = express.Router();

const chatController = require("../controllers/chat");
const msgController = require("../controllers/message");
const {verifyToken} = require("../controllers/user");

router.get("/", verifyToken, chatController.chatList);
router.post("/create/dm", verifyToken, chatController.createChat);
router.post("/create/group", verifyToken, chatController.createGroupChat);
router.patch("/:chatId/members", verifyToken, chatController.addToGroup);
router.patch("/:chatId/members/:userId", verifyToken, chatController.removeFromGroup);
router.post("/:chatId/messages", verifyToken, msgController.sendMessage);
router.patch("/:chatId/messages/:messageId", verifyToken, msgController.editMessage);
router.get("/:chatId", verifyToken, chatController.getChat);
router.get("/:chatId/messages", verifyToken, msgController.getMessages);

module.exports = router;