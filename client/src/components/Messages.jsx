import PropTypes from "prop-types";
import Msg from "./Msg";

export default function Messages({messages}) {
  console.log(messages);
  return (
    messages &&
    <div className="messages flex-col gap-4">
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
