import React, { useRef, useState, useEffect } from "react";
import useSocket from "./util/useSocket";

function Input() {
  const [inputText, setInputText] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const inputRef = useRef(null);
  const [emitActiveElement, emitPassiveElement] = useSocket(inputRef);
  useEffect(() => {
    const timer = setTimeout(() => {
      emitPassiveElement(inputRef.current);
      inputRef.current.blur();
    }, 5000);
    return () => clearTimeout(timer);
  }, [inputText, activeInput]);

  const handleChange = (e) => {
    setInputText(e.target.value);
    setActiveInput(true);
    emitActiveElement(e.target);
  };
  const focus = (e) => {
    setActiveInput(true);
    emitActiveElement(e.target);
  };
  const blur = (e) => {
    setActiveInput(false);
    emitPassiveElement(e.target);
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

export default Input;
