// <--- 함수 리스트 --->
//1. localStorageSet 로컬스토리지에 저장하는 함수.
//2. idUrl URL데이터 가져오는 함수.
//3. localStorageGet 로컬스토리지 값 가져오는 함수.
//4. 로그인 처리 함수(조건문으로 로그인 상태를 확인함).
//5. loginRequest 로그인 요청 함수.
//6. sessionStorageSet 세션스토리지에 정보 저장하는 함수.
//7. sessionStorageGet 세션스토리지에 값 가져오는 함수.

//1. 로컬스토리지에 저장하는 함수.
function localStorageSet(name, localValue) {
    window.localStorage.setItem(name, localValue); //값을 설정합니다.
}

//2. URL데이터 가져오는 함수.
function idUrl() {
    return location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
}

//3. 로컬스토리지 값 가져오는 함수.
function localStorageGet() {
    return window.localStorage.getItem('cf'); //값을 가져 옵니다.
}

//4. 로그인 처리 함수.
$(document).ready(function () {
    let confirmId = idUrl();


    let confirmIdReplce = confirmId.replace("#", '');
    console.log(confirmIdReplce);


    const adminCheck = sessionStorageGet(`cf`);

    //세션스토리지 전체 삭제
    // localStorage.clear();
    // sessionStorage.clear();

    if (confirmId === `https://honeytip.kro.kr/` && sessionStorageGet('cf') === null) {
        console.log("로그인 안된상태.");
        $("#header").load("header.html");
        $("#footer").load("footer.html");
    } else if (confirmId === `https://honeytip.kro.kr/index.html` && sessionStorageGet(`cf`) === null) {
        console.log("로그인 안된상태");
        $("#header").load("header.html");
        $("#footer").load("footer.html");
    } else if (confirmId === `https://honeytip.kro.kr/` && sessionStorageGet('cf') !== null) {
        console.log("로그인 로컬에 저장된 상태");
        if (adminCheck === "112020533574226006231#" || adminCheck === "100755251287940797090") {
            $("#header").load("./headerAdmin.html");
            $("#footer").load("footer.html");
        } else {
            $("#header").load("headerLogin.html");
            $("#footer").load("footer.html");
        }
        loginRequest();
    } else if (confirmId === `https://honeytip.kro.kr/index.html` && sessionStorageGet(`cf`) !== null) {
        console.log("로그인 로컬에 저장된 상태");
        if (adminCheck === "112020533574226006231#" || adminCheck === "100755251287940797090") {
            $("#header").load("./headerAdmin.html");
            $("#footer").load("footer.html");
        } else {
            $("#header").load("headerLogin.html");
            $("#footer").load("footer.html");
        }
        loginRequest();
    } else {
        sessionStorageSet('cf', confirmIdReplce);
        const adminCheck = sessionStorageGet(`cf`);
        if (adminCheck === "112020533574226006231#" || adminCheck === "100755251287940797090") {
            $("#header").load("headerAdmin.html");
            $("#footer").load("footer.html");
            loginRequest();
        } else {
            $("#header").load("headerLogin.html");
            $("#footer").load("footer.html");
            loginRequest();
        }
    }

});

// 5. 로그인 요청 함수.
function loginRequest() {

    // 로그인 ID 변수
    let loginData = sessionStorageGet('cf');

    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/user/${loginData}`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            let parseData = JSON.parse(data);

            let keyCheck = parseData.key;
            let userInfo = parseData.userInfo;

            let name = userInfo[0].name;
            let avatar = userInfo[0].avatar;
            let badge = userInfo[0].badge;
            console.log("유저 이름 : " + name);
            console.log("유저 아바타 : " + avatar);
            console.log("유저 뱃지 : " + badge);

            sessionStorageSet(`name`, name);
            sessionStorageSet(`avatar`, avatar);
            sessionStorageSet(`badge`, badge);

            //로그인 유무를 판단하기 위해 login이라는 값도 저장시켜준다.
            sessionStorageSet(`login`, "로그인");

            let state = {'page_id': 1, 'user_id': 5};
            let title = 'Hello World';
            let url = 'https://honeytip.kro.kr/';

            // history.pushState(state, title, url);


        }
        //에러 종류 조건문으로 걸러내기
        , error: function (jqXHR, exception) {

            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status === 400) {
                alert('Server understood the request, but request content was invalid. [400]');
            } else if (jqXHR.status === 401) {
                alert('Unauthorized access. [401]');
            } else if (jqXHR.status === 403) {
                alert('Forbidden resource can not be accessed. [403]');
            } else if (jqXHR.status === 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status === 500) {
                alert('Internal server error. [500]');
            } else if (jqXHR.status === 503) {
                alert('Service unavailable. [503]');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed. [Failed]');
            } else if (exception === 'timeout') {
                alert('Time out error. [Timeout]');
            } else if (exception === 'abort') {
                alert('Ajax request aborted. [Aborted]');
            } else {
                alert('Uncaught Error.n');
            }
            console.log("상태: " + status);
            console.log("실패");
        }
    });


}

//6. sessionStorageSet 세션스토리지에 정보 저장하는 함수.
function sessionStorageSet(key, value) {
    window.sessionStorage.setItem(key, value);
}

//7. sessionStorageGet 세션스토리지에 값 가져오는 함수.
function sessionStorageGet(key) {
    return window.sessionStorage.getItem(key);
}