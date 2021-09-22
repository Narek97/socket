import React, { useRef, useState, useEffect } from "react";
import useLockWatcher from "./util/useLockWatcher";

function Example() {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const { status, whenSendLockMessage, whenSendUnLockMessage } =
    useLockWatcher();

  useEffect(() => {
    status
      ? (inputRef.current.disabled = true)
      : (inputRef.current.disabled = false);
  }, [status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      status !== null && whenSendUnLockMessage();
      inputRef.current.blur();
    }, 5000);
    return () => clearTimeout(timer);
  }, [inputText, status]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const focus = () => {
    whenSendLockMessage();
  };
  const blur = () => {
    whenSendUnLockMessage();
  };

  return (
    <div>
      <input
        value={inputText}
        type="text"
        ref={inputRef}
        onChange={handleChange}
        onBlur={blur}
        onFocus={focus}
      />
    </div>
  );
}

export default Example;
