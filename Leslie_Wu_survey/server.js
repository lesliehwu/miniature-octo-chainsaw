var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"./static")));

app.set('view engine','ejs');
app.set("views",path.join(__dirname,'./views'));

app.get('/',function(request,response){
	response.render('index');
})

var server = app.listen(8000);

var io = require("socket.io").listen(server);

io.sockets.on('connection',function(socket){
	console.log("Client/socket is connected!");
	socket.on("posting_form",function(data){
		socket.emit("updated_message",{response:data});
		socket.emit("random_number",{response:Math.floor(Math.random()*1000)+1});
	})
});
