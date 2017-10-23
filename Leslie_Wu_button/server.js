var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname,"./static")));

app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.get('/',function(request,response){
	response.render("index");
})

var server = app.listen(8000,function(){
	console.log("listening on port 8000");
});

var io = require("socket.io").listen(server);

io.sockets.on("connection",function(socket){
	console.log("Client/socket is connected!");
	console.log("Client/socket id is : ", socket.id);
	var score;
	socket.on("button_clicked",function(score){
		console.log("Button was clicked!");
		io.emit("score",{score:score});
	})
	socket.on("reset_clicked",function(score){
		console.log("Reset score!");
		io.emit("score",{score:score});
	})
});
