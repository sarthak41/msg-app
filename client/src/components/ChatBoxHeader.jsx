import PropTypes from "prop-types";
import addUserIcon from "../assets/images/user-plus.svg";
import usersIcon from "../assets/images/users.svg";

import Icon from "./Icon";

export default function ChatBoxHeader({ chat, token, setShowGroupModal }) {
  return (
    <div className="flex justify-between align-center chat-header">
      <h3>{chat.chatName}</h3>
      {chat.isGroup && (
        <div className="flex gap-8">
          <Icon
            src={usersIcon}
            alt="Member List"
            onClick={() => setShowGroupModal(true)}
          />
        </div>
      )}
    </div>
  );
}

ChatBoxHeader.propTypes = {
  chat: PropTypes.object,
};
