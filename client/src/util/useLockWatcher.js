import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("/");

const useLockWatcher = () => {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    socket.on("disableElement", () => {
      console.log("disableElement");
      whenReceiveLockMessage();
    });
    socket.on("enableElement", () => {
      console.log("enableElement");
      whenReceiveUnLockMessage();
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error socket due to ${err}`);
      whenReceiveLockMessage();
    });
  }, [socket]);

  const whenSendLockMessage = () => {
    socket.emit("activeElement");
  };

  const whenSendUnLockMessage = () => {
    socket.emit("passiveElement");
  };
  const whenReceiveLockMessage = () => {
    setStatus(true);
  };

  const whenReceiveUnLockMessage = () => {
    setStatus(false);
  };

  return {
    status,
    whenSendLockMessage,
    whenSendUnLockMessage,
  };
};

export default useLockWatcher;
