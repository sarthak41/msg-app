import formatTimestamp from "../helpers/formatTimestamp";
import PropTypes from "prop-types";
import Icon from "./Icon";
import editIcon from "../assets/images/edit.svg";
import axios from "axios";
import { useState } from "react";
import socket from "../helpers/socket";

export default function Msg({
  msgId,
  chatId,
  username,
  sender,
  color,
  content,
  timestamp,
  lastMessage,
  token,
  setMessages,
}) {
  const timeString = formatTimestamp(timestamp);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMsg, setEditedMsg] = useState(content);

  const startEdit = () => {
    setIsEditing(true);
  };

  const handleEdit = async (e) => {
    try {
      if (editedMsg === "") return;
      e.preventDefault();

      const res = await axios.patch(
        `${import.meta.env.VITE_API_ROUTE}/chat/${chatId}/messages/${msgId}`,
        { content: editedMsg },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prevMsgs) => {
        const newMsgs = prevMsgs.map((msg) =>
          msg._id === msgId ? { ...msg, content: editedMsg } : msg
        );
        return newMsgs;
      });

      socket.emit("edit-message", res.data);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="msg flex-col">
      {isEditing ? (
        <form
          onSubmit={handleEdit}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditedMsg(content);
            }
          }}
        >
          <div className="input">
            <input
              type="text"
              name="edit"
              id="edit"
              value={editedMsg}
              onChange={(e) => setEditedMsg(e.target.value.trim())}
            />
            <button type="submit" className="hidden"></button>
          </div>
        </form>
      ) : (
        <>
          {(lastMessage === null ||
            lastMessage.sender.username !== sender ||
            new Date(timestamp).getTime() -
              new Date(lastMessage.createdAt).getTime() >=
              300000) && (
            <div className="flex gap-8 justify-start align-center sender">
              <div className="sender" style={{ color: `var(--${color})` }}>
                {sender}
              </div>
              <span className="timestamp">{timeString}</span>
            </div>
          )}
          <div>{content}</div>
          {username === sender && (
            <Icon src={editIcon} alt="Edit message" onClick={startEdit} />
          )}
        </>
      )}
    </div>
  );
}
