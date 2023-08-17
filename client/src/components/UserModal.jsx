import { useState } from "react";
import "../assets/styles/modal.css";
import axios from "axios";
import Icon from "./Icon";
import closeIcon from "../assets/images/close.svg";
import PropTypes from "prop-types";

export default function UserModal({
  token,
  originalBio,
  originalColor,
  setShowUserModal,
  setUser,
}) {
  const [bio, setBio] = useState(originalBio);
  const [color, setColor] = useState(originalColor);
  const [image, setImage] = useState();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (
        image !== undefined &&
        (image.type === "image/jpeg" || image.type === "image/png")
      ) {
        const data = new FormData();
        data.append("image", image);

        const res = await axios.patch("/api/users/pfp", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const userToken = {
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          color: res.data.color,
          bio: res.data.bio,
          profilePicture: res.data.profilePicture,
          token,
        };

        localStorage.setItem("userToken", JSON.stringify(userToken));
        setUser(userToken);
        setImage(undefined);
        setLoading(false);
      }

      if (bio !== originalBio) {
        const res = await axios.patch(
          "/api/users/bio",
          { bio },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userToken = {
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          color: res.data.color,
          bio: res.data.bio,
          profilePicture: res.data.profilePicture,
          token,
        };

        localStorage.setItem("userToken", JSON.stringify(userToken));
        setUser(userToken);
      }

      if (color !== originalColor) {
        const res = await axios.patch(
          `/api/users/color/${color}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userToken = {
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          color: res.data.color,
          bio: res.data.bio,
          profilePicture: res.data.profilePicture,
          token,
        };

        localStorage.setItem("userToken", JSON.stringify(userToken));
        setUser(userToken);
      }

      setShowUserModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const colorList = [
    "white",
    "black",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "pink",
  ];

  return (
    <div className="modal-overlay absolute-center">
      <div className="modal absolute-center">
        <Icon
          src={closeIcon}
          alt="Close user settings"
          onClick={() => setShowUserModal(false)}
        />
        <form onSubmit={handleSubmit} className="flex-col gap-16">
          <div className="input flex-col gap-4">
            <label htmlFor="image">Profile Picture</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="input flex-col gap-4">
            <label htmlFor="bio" className="flex gap-4">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              maxLength={100}
            />
          </div>
          <div className="input flex-col gap-4">
            <label htmlFor="color" className="flex gap-4">
              Color
            </label>
            <div className="color-list grid gap-16">
              {colorList.map((c) => (
                <button
                  key={c}
                  style={{ backgroundColor: `var(--${c})` }}
                  className={`color ${color === c ? "selected" : ""}`}
                  onClick={() => setColor(c)}
                  type="button"
                ></button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="btn-submit flex justify-center align-center"
          >
            {!loading ? "Save" : <div className="spinner"></div>}
          </button>
        </form>
      </div>
    </div>
  );
}

UserModal.propTypes = {
  originalBio: PropTypes.string,
  setShowUserModal: PropTypes.func,
  token: PropTypes.string,
  originalColor: PropTypes.string,
  setUser: PropTypes.func,
};
