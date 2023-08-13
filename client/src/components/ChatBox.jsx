import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChatBoxHeader from "./ChatBoxHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import socket from "../helpers/socket";

export default function ChatBox({ chat, messages, setMessages, token }) {
  useEffect(() => {
    socket.on("receive-message", (newMsg) => {
      if (newMsg.chat === chat._id)
        setMessages((prevMsgs) => [...prevMsgs, newMsg]);
      else
        document.getElementById(newMsg.chat).classList.add("bold");
    });

    return () => socket.off("receive-message");

    // socket.on("receive-message", (newMsg) => {
    //   console.log(newMsg.chat, chat._id);
    //   if (newMsg.chat == chat._id)
    //     setMessages([...messages, newMsg]);
    //   else 
    //     document.getElementById(newMsg.chat).classList.add("bold");

    //   return ()=>socket.off("receive-message");
    // });
  }, [chat]);

  return (
    chat &&
    <div className="chat-box-overlay grid">
      <ChatBoxHeader chat={chat} token={token} />
      <Messages messages={messages} />
      <SendMessage chatId={chat._id} messages={messages} token={token} setMessages={setMessages} />
    </div>
  );
}

ChatBox.propTypes = {
  chat: PropTypes.object
};
