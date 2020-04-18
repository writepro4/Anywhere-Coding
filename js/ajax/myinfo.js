// <--- 함수 리스트 --->
// 1. getMyInformation 내 정보 가져오는 함수.
// 2. withdrawal 회원탈퇴 함수.
// 3. localStorageGet 로컬스토리지 값 가져오는 함수.

$(document).ready(function () {

    let name = localStorageGet('name');
    let avatar = localStorageGet('avatar');

    const uid = sessionStorageGet('cf');

    console.log("uid확인 : " + uid);
    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/user/${uid}`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;
            console.log("데이터 확인 : " + data);
            let userInfo = parseData.userInfo;
            let name = userInfo[0].name;
            let image = userInfo[0].avatar;
            let badge = userInfo[0].badge;

            console.log("유저 이름 : " + name);
            console.log("유저 이미지 : " + image);
            console.log("유저 뱃지 : " + badge);

            let cardView = `<div class="ui card">`;
            cardView += `<div class="image">`;
            cardView += `<img src=${image}>`;
            cardView += `</div>`;
            cardView += `<div class="content">`;
            cardView += `<a class="header">${name}</a>`;
            cardView += `<div class="meta">`;
            cardView += `<span class="date">반갑습니다.</span>`;
            cardView += `</div>`;
            cardView += `</div>`;
            cardView += `<div class="extra content">`;
            // cardView += `<a>`;
            // cardView += `<i class="user icon"></i>`;
            // cardView += `22 Friends`;
            // cardView += `</a>`;
            cardView += `</div>`;
            cardView += `</div>`;

            $('#cardProfile').append(cardView);


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

});

//1.내 정보 가져오는 함수.
function getMyInformation() {

    // 유저정보페이지
    // (get) https://honeytip.p-e.kr/user/{uid}
    //     클라이언트 :  uid (구글회원번호 로그인시 전달해주는 값)
    // 백엔드 : false / true 유저 이름(name), 유저 프로필사진 (avatar) , [나중에] 뱃지(badge)


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
function withdrawal() {

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

//3. 로컬스토리지 값 가져오는 함수.
function localStorageGet(nameValue) {
    return window.localStorage.getItem(nameValue); //값을 가져 옵니다.
}
