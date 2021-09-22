let userId = null;

function joinUser(id) {
  userId = id;
}

function userDisconnect(id) {
  userId = null;
}

function getUserId() {
  return userId;
}

module.exports = { getUserId, joinUser, userDisconnect };
