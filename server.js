var http = require('http')             //기본적으로 깔리는 모듈
var express = require('express');   //express 모듈 부름
var app = express();   // app이 express 객체      
var fs = require('fs');

app.listen(1004, function(){
    console.log('listening on 1004')      //포트 접속하면 콘솔창에 메시지 출력
});                 // 여기까지 express 기본문법    1004 port 서버 띄워주라는 요청


app.get('/', function(req, res){         //     /는 홈페이지.    
    res.sendFile(__dirname + '/mainpage.html'); 
});    //html을 전송

app.get('/closet', function(req, res){         
    res.sendFile(__dirname + '/closet.html'); 
});

app.get('/weather', function(req, res){         
    res.sendFile(__dirname + '/weather.html'); 
});

app.get('/home', function(req, res){         
    res.sendFile(__dirname + '/mainpage.html'); 
});
    



app.get('/images', function(req,res){
    fs.readFile('./images/denim.jpg', function(err,data){
     res.writeHead(200, {'Content-Type': 'images/jpg'});
     res.end(data);
});
});

app.get('/image', function(req,res){
    fs.readFile('./images/북한돼지.jpg', function(err,data){
    res.writeHead(200, {'Content-Type': 'images/jpg'});
    res.end(data);
});
});


    
    
    
    
    
    
    
    
    