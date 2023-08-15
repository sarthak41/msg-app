import PropTypes from "prop-types";
import usersIcon from "../assets/images/users.svg";
import menuIcon from "../assets/images/menu-outline.svg";

import Icon from "./Icon";
import { useState, useEffect } from "react";

export default function ChatBoxHeader({
  chat,
  setShowGroupModal,
  setShowSideBar,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 600) setIsMobile(true);
  }, []);

  return (
    <div className="flex justify-between align-center chat-header">
      {isMobile && (
        <Icon
          src={menuIcon}
          alt="Show chat list"
          onClick={() => {
            setShowSideBar(true);
            const list = document.querySelector(".chat-list");
            if (list) {
              list.classList.remove("slide-in");
              list.classList.add("slide-out");
            }
          }}
        />
      )}
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
      {isMobile && !chat.isGroup && <div></div>}
    </div>
  );
}

ChatBoxHeader.propTypes = {
  chat: PropTypes.object,
  setShowGroupModal: PropTypes.func,
  setShowSideBar: PropTypes.func,
};
