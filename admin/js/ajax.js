// 변수명은 메소드명은 낙타로 통일하기

// <--- 함수 리스트 --->
// 1. getToken 토근 가져오는 함수
// 2. adminLogin 관리자로그인 데이터 전송 함수
// 3. login 관리자로그인 요청 함수 (1,2번 함수를 같이 실행한다.)
// 4. imageUpload 글 등록 함수
//ㄴ> 이미지 업로드가 먼저 실행되고 서버로부터 이미지 url 주소를 반환받으면,
//ㄴ> 그 다음에 썸머노트에 작성한 내용을 가져오는 아래의 postForm함수를 실행시키고, 정보를 종합해 서버에 보내줌.
// 5. setCookie 쿠키 생성 함수
// 6. getCookie 쿠키 가져오기 함수
// 7. postForm 썸머노트 내용 가져오는 함수
// 8. writinglist 글 상세 내용 불러오는 함수
// 9. writingDelete 글 삭제 시키는 함수
// 10. categoryList 카테고리 목록 불어오는 함수
// 11. writingFix 관리자 글 수정 함수
// 12. preview 관리자 글 등록시 미리보기 기능 함수
// 13. getArticleList 카테고리 목록 리스트 가져오는 함수


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

    setCookie("adminId", adminId, 5);
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

// 4. 글 등록 함수
function imageUpload() {
    //누르자마자 썸머노트 내용 저장
    let summer = postForm();

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
                console.log("이미지 등록 완료!");

                //썸머노트 내용 주석
                console.log("내용" + summer);

                let image = data;
                console.log(data);


                let title = $('#title').val();
                let category = $('#category').val();
                let adminId = getCookie("adminId");
                let subTitle = $('#subTitle').val();


                console.log("제목" + title);
                console.log("카테고리" + category);
                console.log("관리자아이디" + adminId);
                console.log("부제목" + subTitle);
                console.log("썸머노트 내용" + summer);


                //JSON 더미데이터로 필요한 정보 넣어줌
                let postsData = {
                    'image': image,
                    'title': title,
                    'category': category,
                    'contents': summer,
                    'adminId': adminId,
                    'subTitle': subTitle
                };

                //이미지 파일이 업로드되면 다시 필요한 정보들을 보내줌
                $.post("https://honeytip.p-e.kr/posts",
                    postsData, // 서버가 필요한 정보를 같이 보냄.
                    function (data, status) {
                        let successCheck = JSON.parse(data); // JSON 형식의 문자열을 자바스크립트 객체로 변환함.
                        let keyCheck = successCheck.key;
                        if (keyCheck === true) {
                            alert("성공!");
                            // window.location.replace("./preview_contents.html");
                        } else {
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


// 7. 썸머노트 내용 가져오는 함수
function postForm() {
    let bar = $('textarea[name="content"]').val($('#summernote').summernote('code'));
    console.log(bar.val());
    return bar.val();
}


// 8. 글 상세 내용 불러오는 함수
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


// 9. writingDelete 글 삭제 시키는 함수
function writingDelete() {

    let form = new FormData();
    form.append("_method", "DELETE");

    $.ajax({
        type: 'post'
        , data: form
        , processData: false
        , contentType: false
        , url: 'https://honeytip.p-e.kr/posts/7'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let datakey = parseData.key;
            console.log("성공여부" + datakey);

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

// 10. categoryList 카테고리 목록 불어오는 함수
function categoryList() {

    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts/0/1'
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


// 11. writingFix 관리자 글 수정 함수
function writingFix() {

    let form = new FormData();
    form.append("_method", "PATCH");
    form.append("title", "제목");
    form.append("category", "생산성");
    form.append("image", "야스야스");
    form.append("contents", "내용");
    form.append("subTitle", "부제목");

    console.log("보내는 데이터: " + form);


    $.ajax({
        type: 'post'
        , data: form
        , processData: false
        , contentType: false
        , url: 'https://honeytip.p-e.kr/posts/8'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let datakey = parseData.key;
            console.log("성공여부" + datakey);

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

// 12. preview 관리자 글 등록시 미리보기 기능 함수
function preview() {
    //테스트 깃허브

}

// 13. 카테고리 목록 리스트 가져오는 함수
function getArticleList() {

    const categoryData = $('#seleteData').val();

    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/posts/${categoryData}/1`
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

                // 백엔드 : contents 내부 값들 글 제목 title,
                //     대표이미지 image ,
                //     부 제목(설명) subTitle ,
                //     날짜 date ,
                //     글 번호 indexPosts

                let html = `<div class="item">`;
                html += `<div class="image">`;
                html += `<img src=${titleImage} alt="image">`;
                html += `</div>`;
                html += `<div class="content">`;
                html += `<a class="header">${title}</a>`;
                html += `<div class="meta">`;
                html += `<span>${subTitle}</span>`;
                html += `</div>`;
                html += `<div class="description">`;
                html += `<p></p>`;
                html += `</div>`;
                html += `<div class="extra">`;
                html += `Additional Details`;
                html += `</div>`;
                html += `<div class="extra">`;
                html += `<div class="ui blue right floated button">`;
                html += `수정`;
                html += `</div>`;
                html += `<div class="ui red right floated button">`;
                html += `삭제`;
                html += `</div>`;
                html += `</div>`;
                html += `</div>`;
                html += `</div>`;

                $('#itemList').append(html);


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


