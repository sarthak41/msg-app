import { PropTypes } from "prop-types";
import ChatList from "./ChatList";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import "../assets/styles/chat.css";

export default function Chat({_id, email, username, token}) {
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);

  return (
    <div className="overlay chat grid">
      <ChatList _id={_id} email={email} username={username} token={token} setChat={setChat} setMessages={setMessages}/>
      <ChatBox chat={chat} messages={messages} setMessages={setMessages} token={token}/>
    </div>
  );
}

Chat.propTypes = {
  _id: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
};