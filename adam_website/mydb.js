const users = [
  {
    userId: "id",
    username: "adam",
    password: "password"
  },
  {
    userId: "id2",
    username: "adam2",
    password: "secret"
  }
]


const findUsers = ({username, password}) => {
  return users.find(u => u.username === username && u.password === password);
};

const findUserById = (userId) => {
  const user = users.find(u => u.userId === userId);
  if (user) {
    const {password, ...userData} = user;
    return userData;
  }
  return user;
};

module.exports = {
  findUsers,
  findUserById
}
