import React, { useState } from "react";
import Chat from "./chat";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("/");

function App() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = () => {
    setUserId(Date.now().toString());
    setOpen(true);
  };

  return (
    <div className="App">
      {open ? (
        <Chat socket={socket} userName={userName} userId={userId} />
      ) : (
        <>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <button
            disabled={userName.length < 2 ? true : false}
            onClick={() => login()}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default App;
