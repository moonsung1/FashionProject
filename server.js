var http = require('http')         //require로 모듈을 불러온다.
var express = require('express');
var app = express();   //express 모듈에서 가져온 함수, express 기능을 app으로 이용한다.
/*이미지 출력(파일)*/
var fs = require('fs');  //파일 읽고 쓰는 모듈 (이미지)

/*회원정보 저장*/
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


/*주피터 노트북 실행*/
const { exec } = require('child_process');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

var users = [];

const jupyterPath = 'C:\\Users\\moonsung1\\anaconda3\\Scripts\\jupyter.exe';

app.post('/run-notebook', (req, res) => {
    const notebookPath = path.join(__dirname, 'chatWithChatGPT.ipynb');
    exec(`"${jupyterPath}" nbconvert --to notebook --execute "${notebookPath}" --output output_notebook.ipynb`, (error, stdout, stderr) => {
        if (error) {
            console.error(`노트북 실행 중 오류 발생: ${error.message}`);
            return res.status(500).send('노트북 실행 중 오류 발생');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('노트북이 성공적으로 실행되었습니다.(새로고침(F5) 하세요.)');

    });
});


/*페이지 이동*/
app.post('/signup', function(req, res) {
    var uid = req.body.uid;
    var id = req.body.id;
    var password = req.body.password;
    var user = {
        uid: uid,
        id: id,
        password: password
    };
    users.push(user);
    
    console.log('회원가입 요청:', user);

    var redirectScript = `<script>window.location.href = '/';</script>`;
    res.send(redirectScript);

});

app.post('/', function(req, res) {
    var id = req.body.id;
    var password = req.body.password;
    
    console.log('로그인 요청:', id, password);


    var authenticatedUser = users.find(function(user) {
        return user.id === id && user.password === password;
    });

    if (authenticatedUser) {
        var redirectScript = `<script>window.location.href = '/closet';</script>`;
        res.send(redirectScript);
    } else {
        res.send('아이디 또는 비밀번호가 잘못되었습니다.');
    }
});

/* 이미지 업로드를 위한 것*/
var multer = require('multer');


// 이미지를 저장할 디렉토리 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const category = req.params.category; // 클라이언트로부터 전달된 카테고리 정보 읽기
        cb(null, `./public/uploads/${category}`);
    },
    filename:(req, file, done) => {
        const ext = path.extname(file.originalname)
        const fielname = path.basename(file.originalname, ext) + '_' + Date.now() + ext
        done(null, filename)
     }
});

// 이미지를 업로드할 미들웨어 설정
const upload = multer({ storage: storage });

// 이미지 업로드 요청 처리
app.post('/upload/:category', upload.single('image'), function (req, res) {
    // 업로드된 이미지의 경로 반환
    const imageUrl = req.file ? `/public/uploads/${req.params.category}/${req.file.filename}` : null;
    res.json({ imageUrl: imageUrl });
});


/* 1004번 포트*/
app.listen(1004, function(){
    console.log('listening on 1004')      
}); 
/* public 폴더내 정적 파일들을 이용 가능하게 한다. ex)js, css , 이미지 */
app.use('/public', express.static('public'));
/* 라우팅*/
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



app.use(express.static('public'));

// public/uploads/ai 폴더 경로 지정
const folderPath = path.resolve(__dirname, 'public', 'uploads', 'ai');

app.get('/get_latest_image', (req, res) => {
    console.log('Scanning folder:', folderPath); // 폴더 경로 출력

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Unable to scan folder:', err);
            return res.status(500).send('Unable to scan folder: ' + err);
        }

        console.log('Files found:', files); // 폴더 내 파일 목록 출력

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        if (imageFiles.length === 0) {
            console.log('No images found in the specified folder.');
            return res.status(404).send('No images found in the specified folder.');
        }

        const latestImage = imageFiles
            .map(file => ({
                file,
                time: fs.statSync(path.join(folderPath, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0].file;

        const imagePath = path.join(folderPath, latestImage);
        console.log('Latest image path:', imagePath);
        res.sendFile(imagePath);
    });
});
