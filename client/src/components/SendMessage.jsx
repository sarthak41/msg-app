import { useState } from "react";
import Icon from "./Icon";
import sendIcon from "../assets/images/send.svg";
import axios from "axios";
import socket from "../helpers/socket";

export default function SendMessage({
  chatId,
  messages,
  setMessages,
  token,
  setIsTyping,
  username,
}) {
  const [content, setContent] = useState("");

  const sendMessage = async (e) => {
    try {
      e.preventDefault();

      if (content.trim() !== "") {
        const res = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/chat/${chatId}/messages`,
          {
            content: content.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(chatId);

        setMessages([...messages, res.data]);
        socket.emit("new-message", res.data);

        setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeySubmit = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const handleSubmit = (e) => {
    sendMessage(e);
  };

  const handleTyping = (e) => {
    const text = e.target.value.trim();
    setContent(text);

    const startTime = new Date().getTime();

    if (text !== "") {
      socket.emit("typing", username, chatId);

      setTimeout(() => {
        if (new Date().getTime() - startTime > 3000) {
          socket.emit("stop-typing", username, chatId);
        }
      }, 3000);
    } else {
      socket.emit("stop-typing", username, chatId);
    }
  };

  return (
    <div className="send-message flex justify-start align-center">
      <form
        onKeyDown={handleKeySubmit}
        className="relative flex justify-start align-center"
      >
        <textarea
          type="text"
          id="send-msg"
          name="send-msg"
          value={content}
          onChange={handleTyping}
          placeholder="Send a message"
        />
        <Icon src={sendIcon} alt="Send message" onClick={handleSubmit} />
      </form>
    </div>
  );
}
