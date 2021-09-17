import React, { useRef } from "react";

import useSocket from "./util/socket";

function App() {
  const inputRef = useRef(null);
  const [emitActiveElement, emitPassiveElement] = useSocket(inputRef);

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onFocus={() => emitActiveElement()}
        onBlur={() => emitPassiveElement()}
      />
    </div>
  );
}

export default App;
