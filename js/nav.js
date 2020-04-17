//페이지가 로드되면 실행한다.

$(document).ready(function () {

    let loginCheck = sessionStorageGet('login');

    if (loginCheck === "로그인") {
        console.log("가져온 값 : "+sessionStorageGet(`login`));
        $("#header").load("headerLogin.html");
    } else {
        console.log("가져온 값 : "+sessionStorageGet(`login`));
        console.log("값 못가져옴");
        $("#header").load("header.html");

    }
    $("#footer").load("footer.html");

    //~이렇게 한줄만 해주면 알아서 contents에 testContents.html파일을 넣어 준다.

});


//7. sessionStorageGet 세션스토리지에 값 가져오는 함수.
function sessionStorageGet(key) {
    return window.sessionStorage.getItem(key);
}