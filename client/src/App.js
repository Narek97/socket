import React, { useState } from "react";
import Example from "./Example";

function App() {
  const [topicName, setTopicName] = useState("");
  const [login, setLogin] = useState(false);

  return (
    <div>
      {!login ? (
        <>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <button onClick={() => setLogin(true)}>Login</button>
        </>
      ) : (
        <Example lockOwner={Date.now().toString()} topicName={topicName} />
      )}
    </div>
  );
}

export default App;
