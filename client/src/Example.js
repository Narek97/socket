import React, { useRef, useState } from "react";
import useLockWatcher from "./util/useLockWatcher";

function Example({ lockOwner, topicName }) {
  const [inputText, setInputText] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [inputBlur, setInputBlur] = useState(false);

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

  whenSendLockMessage(() => {
    return inputFocus && true;
  });

  whenSendUnLockMessage(() => {
    return inputBlur && true;
  });

  const focus = () => {
    setInputFocus(true);
    setInputBlur(false);
  };

  const blur = () => {
    setInputFocus(false);
    setInputBlur(true);
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
