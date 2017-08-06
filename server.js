var path = require('path');
var express=require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());

//your routes here
app.use(express.static('html/Login form'));
app.get('/',function(req,res)
{	
	res.sendFile(__dirname + '/html/Login form/login.html');
});

//Login page
app.use(express.static('html/Login form'));
app.get('/login',function(req,res)
{	
	res.sendFile(__dirname + '/html/Login form/login.html');
});

//SIGNUP PAGE
app.use(express.static('html/Login form'));
app.get('/signup',function(req,res)
{	
	res.sendFile(__dirname + '/html/Login form/signup.html');
});
	
//Read posts
app.use(express.static('html/blog pages'));
app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/html/blog pages/home.html');
});

//Write posts
app.use(express.static('html/blog pages'));
app.get('/writepost', function (req, res) {
    res.sendFile(__dirname + '/html/blog pages/writepost.html');
});

//SINGLE POST
app.use(express.static('html/blog pages'));
app.get('/singlepost', function (req, res) 
{
	res.sendFile(__dirname + '/html/blog pages/singlepost.html');
});

//Listening to port 8080
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
