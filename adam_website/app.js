const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const findUsers = require('./mydb').findUsers;
const userMiddleware = require('./middleware/my_middleware').userMiddleware;
const controllers = require('./controllers/my_controllers').controllers;
const cookieParser = require('cookie-parser');
const findUserById = require('./mydb').findUserById;

app.use(bodyParser());

app.use(cookieParser());

const options = {
  index: 'index.html',
  extensions: ['html', 'htm']
}

app.use(express.static(__dirname+'/public', options));

app.use(fileUpload());


app.use('/user', userMiddleware);

app.get('/user/info', (req, res) => {
  // TODO: remove password
  console.log('getting user info');
  res.send(req.user);
});

app.post('/message', controllers.postMessageController);
app.get('/message', controllers.getMessageController);
app.post('/login', controllers.loginController);
app.post('/upload', controllers.uploadController);
app.get('/upload/:name', controllers.getFileController);



app.listen(port)
