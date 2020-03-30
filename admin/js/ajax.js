// 변수명은 메소드명은 낙타로 통일하기

// <--- 함수 리스트 --->
// 1. 토근 가져오는 함수
// 2. 관리자로그인 데이터 전송 함수
// 3. 관리자로그인 요청 함수 (1,2번 함수를 같이 실행한다.)
// 4. 이미지 업로드 함수
// 5. 쿠키 생성 함수
// 6. 쿠키 가져오기 함수


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

    setCookie("adminId",adminId,5);
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
function login() {
    getToken(function (token) {
        adminLogin(token)
    })
}

// 4. 이미지 업로드 함수
function imageUpload() {
    let imageForm = document.getElementById('image-form');
    let formData = new FormData(imageForm);

    let file = $('input[type="file"]').val().trim();

    if (!file) {
        console.log("이미지를 선택해주세요.");
    } else {
        $.ajax({
            url: "https://honeytip.p-e.kr/posts/image",
            type: "post",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                // let successCheck = JSON.parse(data); // JSON 형식의 문자열을 자바스크립트 객체로 변환함.
                // 이미지업로드가 성공하면 보내줘야할 데이터들을 담는작업 실행.

                // 클라이언트 : 글 제목  title , 카테고리  category ,  글 내용  contents ,
                //     관리자 아이디  adminId , 대표이미지 image , 부 제목 subTitle
                // 백엔드 :  true/false

                let title = $('#title').val();
                let category = $('#category').val();
                let contents = $('#summernote').val();
                let adminId = getCookie("adminId");
                let subTitle = $('#subTitle').val();


                //JSON 더미데이터로 필요한 정보 넣어줌
                let postsData = {
                    'image': data,
                    'title': title,
                    'category': category,
                    'contents': contents,
                    'adminId': adminId,
                    'subTitle': subTitle
                };

                //이미지 파일이 업로드되면 다시 필요한 정보들을 보내줌
                $.post("https://honeytip.p-e.kr/posts",
                    postsData, // 서버가 필요한 정보를 같이 보냄.
                    function (data, status) {
                        let successCheck = JSON.parse(data); // JSON 형식의 문자열을 자바스크립트 객체로 변환함.
                        if(successCheck === true){
                            alert("성공!");
                        }else{
                            alert("실패!");
                        }
                        console.log("이미지 요청 상태 : " + status);

                    }
                );
            }
        });
    }
}

// 5. 쿠키 생성 함수
function setCookie(cName, cValue, cDay) {
    let expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    let cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 6. 쿠키 가져오기 함수
function getCookie(cName) {
    cName = cName + '=';
    let cookieData = document.cookie;
    let start = cookieData.indexOf(cName);
    let cValue = '';
    if (start !== -1) {
        start += cName.length;
        let end = cookieData.indexOf(';', start);
        if (end === -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}


