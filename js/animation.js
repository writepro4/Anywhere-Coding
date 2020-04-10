// 1. index.html 파일 중단에 있는 텍스트 움직이는 함수

setInterval(animation, 3000);

function animation() {

    $('#bounce')
        .transition('jiggle');

}