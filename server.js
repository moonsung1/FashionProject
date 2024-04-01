var http = require('http')             //기본적으로 깔리는 모듈
var express = require('express');   //express 모듈 부름
var app = express();   // app이 express 객체      
var fs = require('fs');

app.listen(1004, function(){
    console.log('listening on 1004')      //포트 접속하면 콘솔창에 메시지 출력


});                 // 여기까지 express 기본문법    1004 port 서버 띄워주세요


//누군가가 /pet 으로 방문을 하면
// pet 관련된 안내문을 띄워주자

app.get('/pet', function(req, res){
    res.send('펫용품 페이지입니다.');
});

app.get('/', function(req, res){         //     /는 홈페이지.    
    res.sendFile(__dirname + '/mainpage.html'); 
     });    //html을 전송

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


    
    
    
    
    
    
    
    
    