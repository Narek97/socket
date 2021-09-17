import io from "socket.io-client";
const useSocket = (element) => {
  const socket = io.connect("/");

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
