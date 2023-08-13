import { useState } from "react";
import Icon from "./Icon";
import sendIcon from "../assets/images/send.svg";
import axios from "axios";
import socket from "../helpers/socket";

export default function SendMessage({ chatId, messages, setMessages, token }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && content.trim() !== "") {
      e.preventDefault();

      const res = await axios.post(`${import.meta.env.VITE_API_ROUTE}/chat/${chatId}/messages`, {
        content: content.trim()
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(chatId);

      setMessages([...messages, res.data]);
      socket.emit("new-message", res.data);

      setContent("");
    }
  };

  return (
    <div className="send-message flex justify-start align-center">
      <form onKeyDown={handleSubmit} className="relative flex justify-start align-center">
        <input
          type="text"
          id="send-msg"
          name="send-msg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Send a message"
        />
        <Icon src={sendIcon} alt="Send message" />
      </form>
    </div>
  );
}
