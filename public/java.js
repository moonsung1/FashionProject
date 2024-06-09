/* 클라이언트 측 */
/* 걍 버튼 링크*/
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

document.addEventListener('DOMContentLoaded', () => {
    const uploadForms = document.querySelectorAll('form[id^="uploadForm"]');

    uploadForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const category = form.getAttribute('action').split('/').pop(); // 카테고리 추출

            try {
                const response = await fetch(`/upload/${category}`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                const imageUrl = data.imageUrl;
                
                // 이미지 출력
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.style.width = '400px'; // 이미지의 크기를 조정
                imageElement.style.height = '300px';
                
                const categoryDiv = document.getElementById(category);
                categoryDiv.appendChild(imageElement); // 기존 이미지 옆에 새로운 이미지 추가

                // 이미지 URL을 로컬 스토리지에 저장
                localStorage.setItem(`${category}ImageUrl`, imageUrl);
            } catch (error) {
                console.error('이미지 업로드 중 오류 발생:', error);
            }
        });
    });

    // 페이지가 로드될 때 저장된 이미지를 화면에 출력
    const displaySavedImages = () => {
        uploadForms.forEach(form => {
            const category = form.getAttribute('action').split('/').pop(); // 카테고리 추출
            const imageUrl = localStorage.getItem(`${category}ImageUrl`);
            if (imageUrl) {
                // 이미지 출력
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.style.width = '400px'; // 이미지의 크기를 조정
                imageElement.style.height = '300px';
                
                const categoryDiv = document.getElementById(category);
                categoryDiv.appendChild(imageElement); // 화면에 이미지 출력
            }
        });
    };

    // 페이지가 로드될 때 저장된 이미지를 화면에 출력
    displaySavedImages();
});



