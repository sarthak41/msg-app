import PropTypes from "prop-types";
import Msg from "./Msg";
import { useEffect } from "react";

export default function Messages({messages}) {
  useEffect(()=>{
    const msgs = document.querySelector(".messages");
    msgs.scrollTop = msgs.scrollHeight;
  }, [messages]);

  return (
    messages &&
    <div className="messages">
      {messages.map((m, ind) =>
        <Msg 
          key={m._id} 
          username={m.sender.username}
          timestamp={m.createdAt}
          content={m.content}
          lastSender={ind >= 1 ? messages[ind-1].sender.username : ""}
        />
      )}
    </div>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
};
