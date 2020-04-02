// 변수명은 메소드명은 낙타로 통일하기

// <--- 함수 리스트 --->
// 1. getToken 토근 가져오는 함수
// 2. setCookie 쿠키 생성 함수
// 3. getCookie 쿠키 가져오기 함수
// 4. writinglist 글 상세 내용 불러오는 함수
// 5. categoryList 카테고리 목록 불어오는 함수
// 6. categoryCheck카테고리 선택시 해당 카테고리로 이동하는 함수
// 7. ajax로 데이터를 가져오고 페이지 갱신없이 주소 변경하는 함수.

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


// 2. 쿠키 생성 함수
function setCookie(cName, cValue, cDay) {
    let expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    let cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 3. 쿠키 가져오기 함수
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


// 4. 글 상세 내용 불러오는 함수
function writinglist() {

    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts/8'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;

            let postInfo = parseData.postInfo;

            let title = postInfo.title;
            let content = postInfo.contents;
            let date = postInfo.date;
            let viewCounts = postInfo.viewCounts;

            console.log("key" + keyCheck);
            console.log("제목" + title);
            console.log("내용" + content);
            console.log("날짜" + date);
            console.log("본 횃수" + viewCounts);


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


// 5. categoryList 카테고리 목록 불어오는 함수
function categoryList() {


    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts/1/1'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            //json 파싱하기
            let parseData = JSON.parse(data);
            console.log("데이터 파싱전: " + data);
            let keyCheck = parseData.key;
            console.log("데이터 성공여부 : " + keyCheck);

            let postInfoData = parseData.contents;

            let postingListData = postInfoData.length;

            console.log("받아온 데이터 확인: " + postingListData);

            for (let i = 0; i < postingListData; i++) {


                let title = postInfoData[i].title;
                let titleImage = postInfoData[i].image;
                let subTitle = postInfoData[i].sub_title;
                let indexPosts = postInfoData[i].index_posts;
                let adminId = postInfoData[i].admin_id;
                let contents = postInfoData[i].contents;
                let viewCount = postInfoData[i].view_count;
                let category = postInfoData[i].category;
                let date = postInfoData[i].date;

                console.log("제목" + title);
                console.log("날짜" + date);
                console.log("타이틀 이미지" + titleImage);
                console.log("글 아이디" + indexPosts);
                console.log("관리자 아이디" + adminId);
                console.log("글 내용" + contents);
                console.log("조회수" + viewCount);
                console.log("카테고리 종류" + category);
                console.log("서브 제목" + subTitle);

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


// 6. 카테고리 선택시 해당 카테고리로 이동하는 함수
function categoryCheck(category) {
    let categoryData = category.id;
    console.log(categoryData);
    setCookie("category", categoryData, 5);
    getCookie("category");
    console.log(getCookie("category"));
    window.location.replace("./category_page.html");
}

// 7. ajax로 데이터를 가져오고 페이지 갱신없이 주소 변경하는 함수.
$(document).ready(function () {
    const state = {'page_id': 1, 'user_id': 5};

    history.pushState(state, "title", "home");

});

