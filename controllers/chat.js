const Message = require("../models/message");
const Chat = require("../models/chat");
const User = require("../models/user");
// const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

exports.chatList = async (req, res) => {
  try {
    const user = req.user;
    
    let chats = await Chat.aggregate([
      {
        $match: {members: new ObjectId(user._id)}
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "members"
        }
      },
      {
        $project: {
          members: {
            password: 0
          }
        }
      },
      {
        $lookup: {
          from: "messages",
          localField: "latestMessage",
          foreignField: "_id",
          as: "latestMessage"
        }
      },
      {
        $unwind: {
          path: "$latestMessage",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          "latestMessage.createdAt" : -1
        }
      }
    ]);
  
    return res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.getChat = async (req, res) => {
  try {
    const username = req.user.username;
    const {chatId} = req.params;

    let chat = await Chat.findById(chatId).populate("members", "_id username bio color");

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.createChat = async (req, res) => {
  try {
    const user = req.user;
    
    const {username} = req.body;
    const friend = await User.findOne({username: username});

    if (!friend) {
      return res.status(400).json({message: "- username doesn't exist."});
    }

    const chatExists = await Chat.findOne({members: [user._id, friend._id]});
    if (chatExists) {
      return res.status(400).json({message: "- already have a chat with that person"});
    }

    const chat = await Chat.create({members: [user._id, friend._id]});
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.createGroupChat = async (req, res) => {
  try {
    const user = req.user;

    const {chatName} = req.body;

    const chat = await Chat.create({chatName, members: [user._id], isGroup: true});
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.addToGroup = async (req, res) => {
  try {
    const {username} = req.body;
    const {chatId} = req.params;
    const person = await User.findOne({username});
    if (!person) {
      return res.status(400).json({message: "That username doesn't exist."});
    }

    const chat = await Chat.findByIdAndUpdate(chatId, {$addToSet: {members: person._id}}, {new: true});
    
    const populatedChat = await chat.populate("members", "-password");
    return res.status(200).json(populatedChat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}

exports.removeFromGroup = async (req, res) => {
  try {
    const {chatId, userId} = req.params;

    const chat = await Chat.findByIdAndUpdate(chatId, {$pull: {members: userId}}, {new: true});

    const populatedChat = await chat.populate("members", "-password");
    return res.status(200).json(populatedChat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error"});
  }
}