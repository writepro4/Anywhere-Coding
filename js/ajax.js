// 토큰 가져오는 함수
function get_csrf(callback) {
    console.log("실행");
    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/csrf_token'
        , data: ''
        , xhrFields: {
            withCredentials: true
        }
        , success: function (data) {
            console.log(data);
            // 콜백메소드로 토큰 값 반환
            $("#text").html(data);	// 전송받은 데이터와 전송 성공 여부를 보여줌.
            callback(data); // 받아온 csrf_token을 반환해주는 부분
        }
        , error: function (xhr, status, msg) {
            console.log(xhr);
            console.log(status);
            console.log(msg);
            console.log("토큰 발행 실패");
        }
    });
}

// 데이터 전송 함수
function test_ajax1(csrf_token) {
    console.log("데이터 전송 함수 실행");
    let login_data = {
        '_token': csrf_token, //이부분에서 '_token'이라는 key로 csrf_token값을 전달해 주어야 한다
        'id': "tip12",
        'pw': "honey"
    };
    console.log(login_data);

    // let myJSON = JSON.stringify(login_data);
    // console.log(myJSON);
    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/login/auth'
        // , dataType: JSON
        , data: login_data
        , xhrFields: {
            withCredentials: true
        }
        , success: function (data) {
            $("#text2").html(data);	// 전송받은 데이터와 전송 성공 여부를 보여줌.
            //json 해체
            data = JSON.parse(data);
            //위의 코드 없으면 문자형
            console.log(data);
            console.log("전송 성공");
        }
        , error: function (xhr, status, msg) {
            console.log(xhr);
            console.log("상태: " + status);
            console.log("메시지: " + msg);
            console.log("실패");
        }
    });
}

// (토큰,요청함수 묶은 메소드)
function get_token() {
    get_csrf(function (csrf_token) {
        test_ajax1(csrf_token)
    })
}