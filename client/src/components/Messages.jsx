import PropTypes from "prop-types";
import Msg from "./Msg";
import { useEffect } from "react";

export default function Messages({
  messages,
  isTyping,
  typers,
  username,
  token,
  setMessages,
}) {
  console.log(messages);

  useEffect(() => {
    const msgs = document.querySelector(".messages");
    msgs.scrollTop = msgs.scrollHeight;
  }, [messages]);

  return (
    messages && (
      <div className="message-box relative grid">
        <div className="messages">
          {messages.map((m, ind) => (
            <Msg
              chatId={m.chat}
              key={m._id}
              msgId={m._id}
              sender={m.sender.username}
              username={username}
              color={m.sender.color}
              pfp={m.sender.profilePicture}
              timestamp={m.createdAt}
              content={m.content}
              lastMessage={ind >= 1 ? messages[ind - 1] : null}
              token={token}
              setMessages={setMessages}
            />
          ))}
        </div>

        <div className="typing-indicator flex gap-4 justify-start align-center">
          {isTyping && (
            <>
              <div className="dot dot1"></div>
              <div className="dot dot2"></div>
              <div className="dot dot3"></div>
              <div>
                <span style={{ fontWeight: "bold", marginLeft: "0.5rem" }}>
                  {typers.length <= 5 ? typers.join(", ") : "Several people"}
                </span>
                {typers.length === 1 ? " is" : " are"} typing
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
  typers: PropTypes.array,
  isTyping: PropTypes.bool,
  username: PropTypes.string,
  token: PropTypes.string,
  setMessages: PropTypes.func,
};
