//페이지가 로드되면 실행한다.

$(document).ready(function () {

    const loginCheck = sessionStorageGet('login');
    const adminCheck = sessionStorageGet(`cf`);

    // 112020533574226006231 민찬이 uid
    // 100755251287940797090 내 uid

    if (loginCheck === "로그인") {
        if (adminCheck === "112020533574226006231" || adminCheck === "100755251287940797090") {
            $("#header").load("./headerAdmin.html");
        } else {
            $("#header").load("headerLogin.html");
        }
    } else {
        $("#header").load("header.html");

    }
    $("#footer").load("footer.html");

    //~이렇게 한줄만 해주면 알아서 contents에 testContents.html파일을 넣어 준다.

});


//7. sessionStorageGet 세션스토리지에 값 가져오는 함수.
function sessionStorageGet(key) {
    return window.sessionStorage.getItem(key);
}