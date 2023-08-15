import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import UserModal from "./UserModal";
import "../assets/styles/chat.css";
import GroupModal from "./GroupModal";

export default function Chat({
  _id,
  email,
  username,
  color,
  bio,
  pfp,
  token,
  setUser,
}) {
  const [chat, setChat] = useState({});
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSidebar, setShowSideBar] = useState(true);

  useEffect(() => {
    const list = document.querySelector(".chat-list");

    if (showSidebar) {
      list.classList.remove("slide-out");
      list.classList.add("slide-in");
    }
  }, [showSidebar]);

  return (
    <>
      <div className="overlay chat grid">
        <ChatList
          _id={_id}
          email={email}
          username={username}
          pfp={pfp}
          token={token}
          setChat={setChat}
          setMessages={setMessages}
          setShowUserModal={setShowUserModal}
          chats={chats}
          setChats={setChats}
          showSidebar={showSidebar}
          setShowSideBar={setShowSideBar}
        />
        <ChatBox
          username={username}
          chat={chat}
          messages={messages}
          color={color}
          setMessages={setMessages}
          token={token}
          setShowGroupModal={setShowGroupModal}
          showSidebar={showSidebar}
          setShowSideBar={setShowSideBar}
        />
      </div>
      {showUserModal && (
        <UserModal
          setShowUserModal={setShowUserModal}
          originalColor={color}
          originalBio={bio}
          token={token}
          setUser={setUser}
        />
      )}
      {showGroupModal && (
        <GroupModal
          chat={chat}
          setChat={setChat}
          token={token}
          setShowUserModal={setShowGroupModal}
          setChats={setChats}
          userId={_id}
        />
      )}
    </>
  );
}

Chat.propTypes = {
  _id: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
  color: PropTypes.string,
  bio: PropTypes.string,
  pfp: PropTypes.string,
  setUser: PropTypes.func,
};
