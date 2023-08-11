import { useState } from "react";
import Icon from "./Icon";
import sendIcon from "../assets/images/send.svg";

export default function SendMessage({chatId}) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {

  };

  return (
    <div className="send-message flex justify-start align-center">
      <form onSubmit={handleSubmit} className="relative flex justify-start align-center">
        <input
          type="text"
          id="send-msg"
          name="send-msg"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Send a message"
        />
        <Icon src={sendIcon} alt="Send message"/>
      </form>
    </div>
  );
}
