const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.messages_get);

router.post("/", messageController.message_post);

router.post("/delete-message", messageController.delete_message_post);

module.exports = router;
