import io from "socket.io-client";
const socket = io.connect("/");

const useSocket = () => {
  let element = null;
  const emitActiveElement = (ref) => {
    element = ref;
    socket.emit("activeElement");
  };
  const emitPassiveElement = (ref) => {
    element = ref;
    socket.emit("passiveElement");
  };
  socket.on("disableElement", () => {
    if (element) {
      element.disabled = true;
    }
  });
  socket.on("enableElement", () => {
    if (element) {
      element.disabled = false;
    }
  });
  return [emitActiveElement, emitPassiveElement];
};

export default useSocket;
