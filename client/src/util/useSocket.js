// import io from "socket.io-client";
// const socket = io.connect("/");

// const useSocket = (ref) => {
//   const emitActiveElement = () => {
//     socket.emit("activeElement");
//   };
//   const emitPassiveElement = () => {
//     socket.emit("passiveElement");
//   };
//   socket.on("disableElement", () => {
//     if (ref) {
//       ref.current.disabled = true;
//     }
//   });
//   socket.on("enableElement", () => {
//     console.log("enableElement");
//     if (ref) {
//       ref.current.disabled = false;
//     }
//   });
//   socket.on("connect_error", (err) => {
//     console.log(`connect_error socket due to ${err}`);
//     if (ref) {
//       ref.current.disabled = true;
//     }
//   });
//   return [emitActiveElement, emitPassiveElement];
// };

// export default useSocket;
