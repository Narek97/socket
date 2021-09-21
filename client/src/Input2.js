import React, { useRef, useState, useEffect } from "react";
import useLockWatcher from "./util/useLockWatcher";

function Input2() {
  const [inputText, setInputText] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const inputRef = useRef(null);

  const { lockStatus, whenSendLockMessage, whenSendUnLockMessage } =
    useLockWatcher(inputRef);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current.blur();
    }, 5000);
    return () => clearTimeout(timer);
  }, [inputText, activeInput]);

  const handleChange = (e) => {
    setInputText(e.target.value);
    setActiveInput(true);
  };
  const focus = () => {
    console.log("focus");
    whenSendLockMessage();
    setActiveInput(true);
  };
  const blur = () => {
    console.log("blur");
    whenSendUnLockMessage();
    setActiveInput(false);
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

export default Input2;
