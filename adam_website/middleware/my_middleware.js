const COOKIE_NAME='session-id';
const findUserById = require('./../mydb').findUserById;

exports.userMiddleware = (req, res, next) => {
  console.log('in user middleware');
  const cookie = req.cookies[COOKIE_NAME];
  if (!cookie) {
    console.log("Your session has expired please log out and log in again");
    return res.status(401).send();
  }
  const userId = cookie;
  const user = findUserById(userId);
  if (!user) {
    console.log('no such user', userId);
    return res.status(500).send();
  } else {
    console.log('user found');
    req.user = user;
    next();
  }
}
