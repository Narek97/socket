import io from "socket.io-client";
const socket = io.connect("/");

const useSocket = (element) => {
  const emitActiveElement = () => {
    socket.emit("activeElement");
  };
  const emitPassiveElement = () => {
    socket.emit("passiveElement");
  };
  socket.on("disableElement", () => {
    element.current.disabled = true;
  });
  socket.on("enableElement", () => {
    element.current.disabled = false;
  });

  return [emitActiveElement, emitPassiveElement];
};

export default useSocket;
