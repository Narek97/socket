import { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("/");

const useLockWatcher = ({
  lockOwner,
  topicName,
  onReceivedLockMessage,
  onReceivedUnLockMessage,
}) => {
  useEffect(() => {
    socket.emit("joinRoom", { lockOwner, topicName });
    socket.on("disableElement", () => {
      console.log("disableElement");
      onReceivedLockMessage();
    });
    socket.on("enableElement", () => {
      console.log("enableElement");
      onReceivedUnLockMessage();
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error socket due to ${err}`);
      onReceivedLockMessage();
    });
  }, [socket]);

  const whenSendLockMessage = (predicate) => {
    predicate() && socket.emit("activeElement", { lockOwner, topicName });
  };
  const whenSendUnLockMessage = (predicate) => {
    predicate() && socket.emit("passiveElement", { lockOwner, topicName });
  };
  return [whenSendLockMessage, whenSendUnLockMessage];
};

export default useLockWatcher;
