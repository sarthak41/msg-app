import Icon from "./Icon";
import closeIcon from "../assets/images/close.svg";
import "../assets/styles/modal.css";
import { useState } from "react";
import axios from "axios";
import removeIcon from "../assets/images/remove-circle-outline.svg";
import PropTypes from "prop-types";

export default function GroupModal({
  userId,
  chat,
  setChat,
  setChats,
  token,
  setShowUserModal,
}) {
  const [addUsername, setAddUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_API_ROUTE}/api/chat/${chat._id}/members`,
        { username: addUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChat(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSubmit = async (e, memId) => {
    try {
      e.preventDefault();

      const res = await axios.patch(
        `${import.meta.env.VITE_API_ROUTE}/api/chat/${
          chat._id
        }/members/${memId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    chat && (
      <div className="modal-overlay absolute-center">
        <div className="modal absolute-center member-list flex-col gap-16">
          <Icon
            src={closeIcon}
            alt="Close user settings"
            onClick={() => setShowUserModal(false)}
          />
          <form onSubmit={handleAddSubmit} className="flex-col gap-16">
            <div className="input flex-col gap-8">
              <label htmlFor="add-username" className="flex gap-4">
                Add someone by their username
              </label>
              <input
                type="text"
                id="add-username"
                name="add-username"
                value={addUsername}
                onChange={(e) => {
                  setAddUsername(e.target.value);
                }}
                maxLength={50}
              />
              <button
                type="submit"
                className="btn-submit flex justify-center align-center"
              >
                {!loading ? "Add" : <div className="spinner"></div>}
              </button>
            </div>
          </form>
          <div className="members flex-col gap-4">
            <h2>Members</h2>
            {chat.members.map((mem) => (
              <div key={mem._id} className="member">
                <div className="avatar-container">
                  <img
                    src={mem.profilePicture}
                    alt="User avatar"
                    className="avatar"
                  />
                </div>
                <div className="user-info">
                  <div
                    style={{ color: `var(--${mem.color})`, fontWeight: 700 }}
                  >
                    {mem.username}
                  </div>
                  {mem.bio && <div style={{ fontWeight: 400 }}>{mem.bio}</div>}
                </div>
                {userId === chat.admin && (
                  <Icon
                    src={removeIcon}
                    onClick={(e) => {
                      handleRemoveSubmit(e, mem._id);
                      if (mem._id === userId) {
                        setChat({});
                        setChats((prevChats) =>
                          prevChats.filter(
                            (prevChat) => prevChat._id !== chat._id
                          )
                        );
                        setShowUserModal(false);
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

GroupModal.propTypes = {
  userId: PropTypes.string,
  chat: PropTypes.object,
  token: PropTypes.string,
  setChat: PropTypes.func,
  setChats: PropTypes.func,
  setShowUserModal: PropTypes.func,
};
