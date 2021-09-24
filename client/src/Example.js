import React, { useEffect, useRef, useState } from "react";
import useLockWatcher from "./util/useLockWatcher";

function Example({ lockOwner, topicName }) {
  const [inputText, setInputText] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [inputBlur, setInputBlur] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const inputRef = useRef(null);

  let [whenSendLockMessage, whenSendUnLockMessage] = useLockWatcher({
    lockOwner,
    topicName,
    onReceivedLockMessage: () => {
      inputRef.current.disabled = true;
    },
    onReceivedUnLockMessage: () => {
      inputRef.current.disabled = false;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeOver(true);
      inputRef.current.blur();
    }, 5000);
    return () => clearTimeout(timer);
  }, [inputText, inputFocus]);

  whenSendLockMessage(() => {
    return inputFocus && true;
  });

  whenSendUnLockMessage(() => {
    if (inputBlur || timeOver) {
      return true;
    } else {
      return false;
    }
  });

  const focus = () => {
    setInputFocus(true);
    setInputBlur(false);
    setTimeOver(false);
  };

  const blur = () => {
    setInputFocus(false);
    setInputBlur(true);
    setTimeOver(false);
  };

  return (
    <div>
      <input
        value={inputText}
        type="text"
        ref={inputRef}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={focus}
        onBlur={blur}
      />
    </div>
  );
}

export default Example;
