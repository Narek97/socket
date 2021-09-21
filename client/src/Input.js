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
  };
  const focus = () => {
    setActiveInput(true);
    emitActiveElement();
  };
  const blur = () => {
    setActiveInput(false);
    emitPassiveElement();
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
