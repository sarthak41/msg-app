const Message = require("../models/message");
const Chat = require("../models/chat");

exports.sendMessage = async (req, res) => {
  try {
    const {chatId} = req.params;
    const {content} = req.body;
    const user = req.user;

    if (content.trim() === "") {
      return res.status(400).json({message: "Empty message"});
    }
  
    const msg = await Message.create({
      content,
      sender: user._id,
      chat: chatId
    });

    const populatedMsg = await msg.populate("sender", "username color profilePicture");
  
    await Chat.findByIdAndUpdate(chatId, {latestMessage: msg._id}, {new: true});
    return res.status(200).json(populatedMsg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.editMessage = async (req, res) => {
  try {
    const {messageId} = req.params;
    const {content} = req.body;

    const msg = await Message.findByIdAndUpdate(messageId, {content: content}, {new: true});

    const populatedMsg = await msg.populate("sender", "username color profilePicture");

    return res.status(200).json(populatedMsg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.getMessages = async (req, res) => {
  try {
    const {chatId} = req.params;

    const messages = await Message.find({chat: chatId})
      .populate("sender", "username color profilePicture")
      .sort({createdAt: 1})

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}