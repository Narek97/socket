import { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("/");

const useLockWatcher = (lockOwner, elementName) => {
  const lockStatus = () => {};

  const whenSendLockMessage = () => {
    console.log("lock");
    socket.emit("activeElement");
    socket.on("disableElement", () => {
      console.log("disableElement");
      onReceivedLockMessage();
    });
  };
  const whenSendUnLockMessage = () => {
    console.log("unlock");
    socket.emit("passiveElement");
    socket.on("enableElement", () => {
      console.log("enableElement");
      onReceivedUnLockMessage();
    });
  };
  const onReceivedLockMessage = () => {
    console.log("onReceivedLockMessage");
    lockOwner.current.disabled = true;
  };
  const onReceivedUnLockMessage = () => {
    console.log("onReceivedUnLockMessage");
    lockOwner.current.disabled = false;
  };

  return { lockStatus, whenSendLockMessage, whenSendUnLockMessage };
};

export default useLockWatcher;
