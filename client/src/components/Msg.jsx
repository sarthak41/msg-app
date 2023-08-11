import formatTimestamp from "../helpers/formatTimestamp";
import PropTypes from "prop-types";

export default function Msg({username, content, timestamp, lastSender}) {
  const timeString = formatTimestamp(timestamp);
  console.log(lastSender);
  return (
    <div className="msg flex-col">
      {(lastSender !== username) &&
      <div className="flex gap-8 justify-start align-center sender">
        <div className="sender">{username}</div>
        <span className="timestamp">{timeString}</span>
      </div>}
      <div>{content}</div>
    </div>
  );
}


