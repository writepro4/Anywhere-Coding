// 댓글 수정하기위해 작성했던 댓글 내용가져오기 (edit)
// (get) https://honeytip.p-e.kr/comments/{댓글 번호}/edit
//     클라이언트 : x
// 백엔드 : 댓글 comment


// <--- 함수 리스트 --->
// 1. writeAComment 댓글작성 함수
// 2. editComment 댓글수정 함수
// 3. deleteComment 댓글삭제 함수
// 4. loadingComments 댓글목록 불러오는 함수


// 1. 댓글 작성 함수.
function writeAComment() {

    const category = 0;
    const comment = "안녕";
    const userName = "가소롭군";
    const postNum = "0";

    let commentData = {
        'category': category, //이부분에서 '_token'이라는 key로 csrf_token값을 전달해 주어야 한다
        'comment': comment,
        'userName': userName,
        'postNum': postNum
    };


    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/comments'
        , data: commentData
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;

            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 작성 성공여부입니다.: " + keyCheck);


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

// 2. 댓글수정 함수
function editComment() {

    let form = new FormData();
    form.append("_method", "PATCH");
    form.append("comment", "안녕하세요.");

    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/comments/0'
        , data: form
        , processData: false
        , contentType: false
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;

            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 수정 성공여부입니다.: " + keyCheck);


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

// 3. 댓글삭제 함수
function deleteComment() {


    let form = new FormData();
    form.append("_method", "DELETE");

    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/comments/5'
        , data: form
        , processData: false
        , contentType: false
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;

            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 삭제 성공여부입니다.: " + keyCheck);


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

// 4. 댓글목록 불러오는 함수
function loadingComments() {


// (get) https://honeytip.p-e.kr/comments/{글 번호}/{댓글 페이징 번호} // 댓글 페이징번호 1번부터 시작
    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/comments/1/1'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;

            let contents = parseData.contents;

            let listOfComments = contents.length;

            // 댓글 comment ,
            // 유저 이름 userName ,
            // 날짜 date ,
            // 글 번호 indexComments ,

            console.log("키 값 : " + keyCheck);
            console.log("데이터 전체 : " + data);
            console.log("글 목록 리스트 데이터  : " + listOfComments[1]);
            console.log("글 배열 리스트 : " + contents);

            let parse = parseFloat(contents);
            console.log(parse);


            if (keyCheck === true) {
                for (let i = 0; i < listOfComments; i++) {

                    let comment = contents[i].comment;
                    let userName = contents[i].userName;
                    let date = contents[i].date;
                    let indexComments = contents[i].indexComments;

                    console.log(comment);


                    let chat = `<div class="comment">`;
                    chat += `<a class="avatar">`;
                    chat += `<img src="images/plant.jpg" alt="image">`;
                    chat += `</a>`;
                    chat += `<div class="content">`;
                    chat += `<a class="author"><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">조`;
                    chat += `헨더슨</span></span></a>`;
                    chat += `<div class="metadata">`;
                    chat += `<span class="date"><span style="vertical-align: inherit;"><span`;
                    chat += `style="vertical-align: inherit;">5 일전</span></span></span>`;
                    chat += `</div>`;
                    chat += `<div class="text"><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">`;
                    chat += `${comment} </span><span style="vertical-align: inherit;">정말 고마워`;
                    chat += `</span></span></div>`;
                    chat += `<div class="actions">`;
                    chat += `<a class="reply"><span style="vertical-align: inherit;"><span`;
                    chat += `style="vertical-align: inherit;">댓글</span></span></a>`;
                    chat += `</div>`;
                    chat += `</div>`;
                    chat += `</div>`;

                    $('#comments').append(chat);
                }
            } else {
                alert("정보가 없어요 !");
            }


            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 목록리스트 체크 " + keyCheck);
            console.log("댓글 목록 리스트 : " + contents);


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

