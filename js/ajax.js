// <--- 함수 리스트 --->
// 1. 토근 가져오는 함수
// 2. 관리자로그인 데이터 전송 함수
// 3. 관리자로그인 요청 함수 (1,2번 함수를 같이 실행한다.)


// 1. 토근 가져오는 함수
function getToken(callback) {
    console.log("실행");

    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/csrf_token'
        , data: ''
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            console.log(data);
            // 콜백메소드로 토큰 값 반환
            $("#text").html(data);	// 전송받은 데이터와 전송 성공 여부를 보여줌.
            callback(data); // 받아온 csrf_token을 반환해주는 부분
            console.log("받아온 토큰값: " + data);
        }
        , error: function (xhr, status, msg) {
            console.log(xhr);
            console.log(status);
            console.log(msg);
            console.log("토큰 발행 실패");
        }
    });
}

// 2. 관리자로그인 데이터 전송 함수
function adminLogin(token) {

    let adminId = $('#email').val();
    let adminPw = $('#password').val();
    //데이터 전송 예제
    let login_data = {
        '_token': token, //이부분에서 '_token'이라는 key로 csrf_token값을 전달해 주어야 한다
        'id': adminId,
        'pw': adminPw
    };
    console.log(login_data);

    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/login'
        , data: login_data
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            $("#text2").html(data);	// 전송받은 데이터와 전송 성공 여부를 보여줌.
            //json 해체
            let parseData = JSON.parse(data);
            //위의 코드 없으면 문자형
            console.log(parseData);
            console.log("전송 성공");
            let check = parseData.key;
            console.log(check);
            if (check === true) {
                window.location.replace("./administrator_page.html");
            } else {
                alert("로그인 실패");
            }
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

// 3. 관리자로그인 요청 함수
function get_token() {
    getToken(function (token) {
        adminLogin(token)
    })
}

