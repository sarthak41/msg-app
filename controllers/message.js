const Message = require("../models/message");
const Chat = require("../models/chat");

exports.sendMessage = async (req, res) => {
  try {
    const {chatId} = req.params;
    const {content} = req.body;
    const user = req.user;
  
    const msg = await Message.create({
      content,
      sender: user._id,
      chat: chatId
    });
  
    await Chat.findByIdAndUpdate(chatId, {latestMessage: msg._id}, {new: true});
    return res.status(200).json(msg);
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

    return res.status(200).json(msg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.getMessages = async (req, res) => {
  try {
    const {chatId} = req.params;

    const messages = await Message.find({chat: chatId})
      .populate("sender", "username")
      .sort({createdAt: -1})

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}