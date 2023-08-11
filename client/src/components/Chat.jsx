import { PropTypes } from "prop-types";
import ChatList from "./ChatList";
import { useState } from "react";
import ChatBox from "./ChatBox";
import "../assets/styles/chat.css";

export default function Chat({_id, email, username, token}) {
  const [chat, setChat] = useState();

  return (
    <div className="overlay chat grid">
      <ChatList _id={_id} email={email} username={username} token={token} setChat={setChat}/>
      <ChatBox chat={chat} />
    </div>
  );
}

Chat.propTypes = {
  _id: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
};