var express = require("express");
var app = express();
var bodyParser =require('body-parser');
var session = require("express-session");

app.use(session({
	secret:'deedleleedleloo',
	resave:true,
	saveUninitialized:true
}));
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

var counter = 0;

app.get('/',function(req,res){
	counter++;
	res.render('index',{counter:counter});
});

app.get('/two',function(req,res){
	counter++;
	res.redirect('/');
});

app.get('/reset',function(req,res){
	counter = 0;
	res.redirect('/');
});

app.listen(8000)
