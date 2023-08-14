import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import UserModal from "./UserModal";
import "../assets/styles/chat.css";

export default function Chat({
  _id,
  email,
  username,
  color,
  bio,
  token,
  setUser,
}) {
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <>
      <div className="overlay chat grid">
        <ChatList
          _id={_id}
          email={email}
          username={username}
          token={token}
          setChat={setChat}
          setMessages={setMessages}
          setShowUserModal={setShowUserModal}
        />
        <ChatBox
          username={username}
          chat={chat}
          messages={messages}
          color={color}
          setMessages={setMessages}
          token={token}
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
    </>
  );
}

Chat.propTypes = {
  _id: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
};
