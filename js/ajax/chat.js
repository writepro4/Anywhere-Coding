// 댓글쓰기
// (post) https://honeytip.p-e.kr/comments
//     클라이언트 : , 카테고리 category , 댓글 comment , 유저 이름 userName , 글 번호 postNum
// 백엔드 : true/false
//
// 댓글 수정하기위해 작성했던 댓글 내용가져오기 (edit)
// (get) https://honeytip.p-e.kr/comments/{댓글 번호}/edit
//     클라이언트 : x
// 백엔드 : 댓글 comment
//
// 댓글 수정(일부 수정)
// (PUT [comment]) https://honeytip.p-e.kr/comments/{댓글 번호}
//     클라이언트 : 댓글 내용 comment
// 백엔드 : true (트루 폴스 확인 불가능 추후 더 알아보고 수정하겠음)
//
// 댓글 삭제
// (DELETE [comment]) https://honeytip.p-e.kr/comments/{댓글 번호}
//     클라이언트 : x
// 백엔드 : true/false (edited)

// <--- 함수 리스트 --->
// 1. getToken 토근 가져오는 함수

// 1. 댓글 작성 함수.
function writeAComment() {

    const category = 0;
    const comment = "안녕";
    const userName = "가소롭군";
    const postNum = "0";

    let commentData = {
        'category': token, //이부분에서 '_token'이라는 key로 csrf_token값을 전달해 주어야 한다
        'comment': adminId,
        'userName': adminPw,
        'postNum' : postNum
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

            console.log("성공여부입니다.: "+keyCheck);





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
