import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChatBoxHeader from "./ChatBoxHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import socket from "../helpers/socket";

export default function ChatBox({
  chat,
  messages,
  setMessages,
  token,
  username,
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [typers, setTypers] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (newMsg) => {
      if (newMsg.chat === chat._id)
        setMessages((prevMsgs) => [...prevMsgs, newMsg]);
      else document.getElementById(newMsg.chat).classList.add("unread");
    });

    socket.on("is-typing", (typer, chatId) => {
      if (chatId === chat._id) {
        setTypers((prevTypers) => {
          const isAlreadyTyping = prevTypers.find((t) => t === typer);
          if (!isAlreadyTyping) return [...prevTypers, typer];
          return prevTypers;
        });
        setIsTyping(true);
      }
    });

    socket.on("isnt-typing", (typer, chatId) => {
      if (chatId === chat._id) {
        setTypers([]);
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("receive-message");
      socket.off("is-typing");
    };
  }, [chat]);

  return (
    chat && (
      <div className="chat-box-overlay grid">
        <ChatBoxHeader chat={chat} token={token} />
        <Messages
          messages={messages}
          isTyping={isTyping}
          typers={typers}
          username={username}
        />
        <SendMessage
          chatId={chat._id}
          messages={messages}
          username={username}
          token={token}
          setMessages={setMessages}
          setIsTyping={setIsTyping}
        />
      </div>
    )
  );
}

ChatBox.propTypes = {
  chat: PropTypes.object,
};
