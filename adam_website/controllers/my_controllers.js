const findUsers = require('./../mydb').findUsers;

const postMessageController = function (req, res) {
  let messageData = {};
  console.log("Receiveing message");
  messageData = req.body;
  console.log(messageData);
  res.send({msg:'Got a POST request'})
  res.status(200).send();
}

const getMessageController =  function (req, res) {
  res.send(messageData);
  res.status(200).send();
}


const loginController = function(req, res){
  try {
    console.log('this is login route', req.body);
    const {username, password} = req.body;
    const user = findUsers(req.body);
    if(!user){
      throw new Error(`Couldn't find user ${username} with password ${password}`);
    }
    // TODO set cookie
    console.log('found user with id', user.userId);
    res.cookie('session-id', user.userId, { maxAge: 900000, httpOnly: true });
    res.send({msg: 'ok'});
  } catch (e){
    console.log(`failed to login`, e);
    res.status(500).send({message: e.message});
  }
}

const uploadController = function (req, res) {
  /*if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }*/
  let sampleFile = req.file;
  console.log(sampleFile);
  // console.log(sampleFile.data.toString());
  fs.writeFileSync(`adam${Date.now()}`, sampleFile.data);
  //res.send(fs.readFileSync(sampleFile.data));
  //if(err){return res.status(500).send(err);}
  res.send('File uploaded!');
}

const getFileController = function (req, res, next) {
  var fileAbsolutePath = path.resolve(req.params.name);
  res.sendFile(fileAbsolutePath, {} , function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileAbsolutePath);
    }
  });
}


exports.controllers = {
  postMessageController,
  getMessageController,
  loginController,
  uploadController,
  getFileController
}
