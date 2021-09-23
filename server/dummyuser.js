let users = [];
let activeUser = [];

function joinUser(socketId, lockOwner, topicName) {
  const user = { socketId, lockOwner, topicName };
  users.push(user);
  return user;
}

function remove(name, id) {
  const index = name.findIndex(
    (user) => user.lockOwner === id || user.socketId === id
  );
  if (index !== -1) {
    return name.splice(index, 1)[0];
  }
}

function userDisconnect(id) {
  return remove(users, id);
}

function getCurrentUser(id) {
  return users.find((user) => user.lockOwner === id.toString());
}

function joinActiveUser(socketId, lockOwner, topicName) {
  const user = { socketId, lockOwner, topicName };
  activeUser.push(user);
}

function getActiveUser(topicName) {
  return activeUser.find((user) => user.topicName === topicName);
}

function removeActiveUser(id) {
  return remove(activeUser, id);
}

module.exports = {
  joinUser,
  userDisconnect,
  getCurrentUser,
  joinActiveUser,
  getActiveUser,
  removeActiveUser,
};
