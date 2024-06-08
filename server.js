var http = require('http')         //require로 모듈을 불러온다.
var express = require('express');
var app = express();   //express 모듈에서 가져온 함수, express 기능을 app으로 이용한다.
var fs = require('fs');  //파일 읽고 쓰는 모듈 (이미지)
  


app.listen(1004, function(){
    console.log('listening on 1004')      
}); 

app.use('/public', express.static('public')); //public 폴더내 정적 파일들을 이용 가능하게 한다. ex)js, css , 이미지

app.get('/', function(req, res){  
    res.sendFile(__dirname + '/mainpage.html');  
    //__dirname: 현재 실행 중인 스크립트의 디렉터리 경로 + 현재 디렉터리의 mainpage.html 파일을 응답으로 보낸다.
});    

app.get('/closet', function(req, res){         
    res.sendFile(__dirname + '/closet.html'); 
});

app.get('/pickolor', function(req, res){         
    res.sendFile(__dirname + '/pickolor.html'); 
});

app.get('/signup', function(req, res){         
    res.sendFile(__dirname + '/signup.html'); 
});
