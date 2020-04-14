// <--- 함수 리스트 --->
// 1. getMyInformation 내 정보 가져오는 함수.
// 2. withdrawal 회원탈퇴 함수.

//TODO 아직 처리방식 정하지 않아 작업된게 없음.

//1.내 정보 가져오는 함수.
function getMyInformation(){

    // 유저정보페이지
    // (get) https://honeytip.p-e.kr/user/{uid}
    //     클라이언트 :  uid (구글회원번호 로그인시 전달해주는 값)
    // 백엔드 : false / true 유저 이름(name), 유저 프로필사진 (avatar) , [나중에] 뱃지(badge)

    //TODO 로그인 아이디 로컬스토리지에 존재하는지 유무 확인후에 ajax 통신 실행하게

    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/user/{uid}`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;



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

//2. 회원탈퇴 함수
function withdrawal(){

// 회원탈퇴
// (DELETE) https://honeytip.p-e.kr/user/{uid}
//     클라이언트 : x
// 백엔드 : true/false

    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/user/{uid}`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;



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
