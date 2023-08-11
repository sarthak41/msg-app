import PropTypes from "prop-types";
import ChatBoxHeader from "./ChatBoxHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export default function ChatBox({chat}) {
  return (
    chat &&
    <div className="chat-box-overlay grid">
      <ChatBoxHeader chat={chat.chat}/>
      <Messages messages={chat.messages}/>
      <SendMessage chatId={chat._id}/>
    </div>
  );
}

ChatBox.propTypes = {
  chat: PropTypes.object
};
