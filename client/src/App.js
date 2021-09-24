import React, { useState } from "react";
import Example from "./Example";

function App() {
  const [topicName, setTopicName] = useState("");
  const [id, setId] = useState("");
  const [login, setLogin] = useState(false);

  return (
    <div>
      {!login ? (
        <>
          <input
            type="text"
            placeholder="room name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <input
            type="text"
            placeholder="user id"
            id={topicName}
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={() => setLogin(true)}>Login</button>
        </>
      ) : (
        <Example lockOwner={id} topicName={topicName} />
      )}
    </div>
  );
}

export default App;
