var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var server = app.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});
var io = require('socket.io')(server);
app.use(express.static(__dirname));

var dbUrl = 'mongodb+srv://nodechat:<senha>@cluster0.vtmn2.mongodb.net/<db-name>?retryWrites=true&w=majority'
mongoose.connect(dbUrl , (err) => { 
   console.log('mongodb connected',err);
})
var Message = mongoose.model('Message',{ name : String, message : String})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})
app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
  	io.emit('message', req.body);
    res.sendStatus(200);
  })
})

io.on('connection', () =>{
 console.log('a user is connected')
})