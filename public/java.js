document.getElementById('homeBtn').addEventListener('click', function() {
window.location.href = '/';       //현재 페이지의 URL을 루트 경로('/')로 변경합니다.
});

document.getElementById('closetBtn').addEventListener('click', function() {
    window.location.href = '/closet';
});

document.getElementById('pickolorBtn').addEventListener('click', function() {
    window.location.href = '/pickolor';
});

document.getElementById('signupBtn').addEventListener('click', function() {
    window.location.href = '/signup';
});