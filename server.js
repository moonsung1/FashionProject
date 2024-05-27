var http = require('http')             //기본적으로 깔리는 모듈
var express = require('express');   //express 모듈 부름
var app = express();   // app이 express 객체      
var fs = require('fs');
var bodyParser = require('body-parser'); // POST 데이터 처리를 위한 모듈

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(1004, function(){
    console.log('listening on 1004')      //포트 접속하면 콘솔창에 메시지 출력
});                 // 여기까지 express 기본문법    1004 port 서버 띄워주라는 요청

app.use('/public', express.static('public'));
app.get('/', function(req, res){         //     /는 홈페이지.    
    res.sendFile(__dirname + '/mainpage.html'); 
});    //html을 전송

app.get('/closet', function(req, res){         
    res.sendFile(__dirname + '/closet.html'); 
});

app.get('/pickolor', function(req, res){         
    res.sendFile(__dirname + '/pickolor.html'); 
});

app.get('/signup', function(req, res){         
    res.sendFile(__dirname + '/signup.html'); 
});






app.post('/signup', function(req, res) {
    var username = req.body.username;
    var userId = req.body.name;
    var password = req.body.password;
    
    // 간단한 사용자 데이터를 저장할 객체 (실제 애플리케이션에서는 데이터베이스를 사용)
    var userData = {
        username: username,
        password: password
    };

    // 사용자 데이터를 파일에 저장
    fs.writeFile(`./users/${userId}.json`, JSON.stringify(userData), function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving user data.');
        } else {
            res.send('Sign up successful!');
        }
    });
});

























app.get('/mainPageImages', function(req,res){
    fs.readFile('./images/MainpageImage.png', function(err,data){
     res.writeHead(200, {'Content-Type': 'images/jpg'});
     res.end(data);
});
});

app.get('/images', function(req,res){
    fs.readFile('./images/denim.jpg', function(err,data){
     res.writeHead(200, {'Content-Type': 'images/jpg'});
     res.end(data);
});
});