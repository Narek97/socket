let userId = null;

function join_User(id) {
  userId = id;
}

function user_Disconnect(id) {
  userId = null;
}

function getUserId() {
  return userId;
}

module.exports = { getUserId, join_User, user_Disconnect };
