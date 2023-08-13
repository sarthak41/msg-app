import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import socket from "../helpers/socket";

export default function ChatList({
  uid,
  email,
  username,
  token,
  setChat,
  setMessages,
}) {
  const [chats, setChats] = useState();
  const [friendUsername, setFriendUsername] = useState("");
  const [groupName, setGroupName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const getChatList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_ROUTE}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const chats = res.data.map((chat) => {
        if (!chat.isGroup) {
          const chatName = chat.members.find(
            (mem) => mem.username !== username
          ).username;
          return { chatName, ...chat };
        } else {
          return chat;
        }
      });

      setChats(chats);
      console.log(chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatList();
  }, [token]);

  const getChat = async (chatId) => {
    try {
      const messages = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/chat/${chatId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let chat = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/chat/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!chat.data.isGroup) {
        const chatName = chat.data.members.find(
          (mem) => mem.username !== username
        ).username;
        chat = { chatName, ...chat.data };
      } else {
        chat = chat.data;
      }

      setChat(chat);
      socket.emit("join-chat", chatId);
      setMessages(messages.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/chat/create/dm`,
        { username: friendUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.querySelector(".new-dm").classList.add("hidden");
      setFriendUsername("");
      setErrMsg("");
    } catch (error) {
      const errMsg = error.response.data.message;
      setErrMsg(errMsg);
    }
  };

  const createNewGroup = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/chat/create/group`,
        { chatName: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.querySelector(".new-group").classList.add("hidden");
      setGroupName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-list flex-col gap-8">
      <button
        type="button"
        onClick={() =>
          document.querySelector(".new-dm").classList.remove("hidden")
        }
        className="btn-submit"
      >
        New DM
      </button>
      <form className="flex-col gap-16 hidden new-dm">
        <div className="input flex-col gap-4">
          <div className="flex justify-between align-center">
            <label htmlFor="email" className="required flex gap-4">
              {"Friend's username"} <div className="error">{errMsg}</div>
            </label>
            <button
              onClick={() => {
                document.querySelector(".new-dm").classList.add("hidden");
                setFriendUsername("");
                setErrMsg("");
              }}
            >
              X
            </button>
          </div>
          <input
            type="text"
            id="friend-username"
            name="friend-username"
            value={friendUsername}
            onChange={(e) => {
              setFriendUsername(e.target.value);
            }}
            required
          />
          <button onClick={createNewChat} className="btn-submit">
            Create
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={() =>
          document.querySelector(".new-group").classList.remove("hidden")
        }
        className="btn-submit green-btn"
      >
        New Group
      </button>
      <form className="flex-col gap-16 hidden new-group">
        <div className="input flex-col gap-4">
          <div className="flex justify-between align-center">
            <label htmlFor="email" className="required flex gap-4">
              {"Group Name"}
            </label>
            <button
              onClick={() => {
                document.querySelector(".new-group").classList.add("hidden");
                setGroupName("");
              }}
            >
              X
            </button>
          </div>
          <input
            type="text"
            id="group-name"
            name="group-name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            required
          />
          <button onClick={createNewGroup} className="btn-submit">
            Create
          </button>
        </div>
      </form>
      {chats && (
        <div className="flex-col people">
          {chats.map((ch) => (
            <button
              key={ch._id}
              type="submit"
              onClick={(e) => {
                getChat(ch._id);
                e.target.classList.remove("unread");
              }}
              className="flex align-start gap-8"
              id={ch._id}
            >
              {ch.chatName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ChatList.propTypes = {
  uid: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
  setChat: PropTypes.func,
};
