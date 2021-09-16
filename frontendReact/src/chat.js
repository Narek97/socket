import React, { useState, useEffect } from "react";

function Chat({ socket, userName, userId }) {
  const [message, setMessage] = useState("");
  const [messageWhoTyping, setMessageWhoTyping] = useState("");
  const [letters, setLetters] = useState([]);
  const [inputDisable, setInputDisable] = useState(false);

  useEffect(() => {
    const getLettersData = async () => {
      const response = await fetch("http://localhost:8000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const letters = await response.json();
      if (letters.length) {
        setLetters(letters.map((el) => JSON.parse(el)));
      }
    };
    getLettersData();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      let arrayOfLetters = letters;
      arrayOfLetters.push({
        userId: data.userId,
        userName: data.userName,
        message: data.message,
      });
      setLetters([...arrayOfLetters]);
    });
    socket.on("disableInput", (userName) => {
      setInputDisable(true);
      setMessageWhoTyping(`${userName} typing please wait ...`);
    });
    socket.on("enableInput", () => {
      setInputDisable(false);
      setMessageWhoTyping("");
    });
  }, [socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // socket.emit("blur");
      console.log("error");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, inputDisable]);

  const focuses = () => {
    socket.emit("focuses", userName);
  };

  const blur = () => {
    socket.emit("blur");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit("focuses", userName);
  };

  const sendData = () => {
    if (message !== "") {
      socket.emit("sendData", {
        userId,
        userName,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="user-name">
        <h2>{userName}</h2>
      </div>
      <p>{messageWhoTyping}</p>
      <input
        type="message"
        value={message}
        disabled={inputDisable}
        onChange={(e) => handleChange(e)}
        onBlur={() => blur()}
        onFocus={() => focuses()}
      />
      <div className="send">
        <button onClick={sendData}>Send</button>
      </div>
      <div className="chat-message">
        {letters.map((user, index) => {
          if (user.userName === userName) {
            return (
              <div key={index} className="message">
                <span>{user.userName}</span>
                <p>{user.message}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="mess-right">
                <span>{user.userName}</span>
                <p>{user.message} </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
export default Chat;
