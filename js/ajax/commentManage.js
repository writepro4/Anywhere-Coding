//작성된 댓글 목록 불러오는 함수.


//1.내 정보 가져오는 함수.
$(document).ready(function () {
    $.ajax({
        type: 'get'
        // https://honeytip.p-e.kr/comments/{페이징번호}
        , url: `https://honeytip.p-e.kr/comments/1`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            console.log("데이터 확인 : "+ data);
            const parseData = JSON.parse(data);
            const keyCheck = parseData.key;

            const {contents} = parseData;
            // console.table(contents);
            console.table(contents);

            let CommentList = contents.length;

            for (let i = 0; i < CommentList; i++) {

                const {userName} = contents[i];
                const {category} = contents[i];
                const {date} = contents[i];
                const {indexComments} = contents[i];
                const {comment} = contents[i];
                const {postNum} = contents[i];

                const categoryPost = category + `_` + postNum;

                const chatData = `<div class="item ui segment" id=${indexComments}>
                <div class="right floated content">
                <div class="ui red button" onclick="deleteComment(this)" id=${indexComments}>삭제</div>
                <div class="ui olive button" onclick="detailPage(this)" id=${categoryPost}>페이지로 이동</div>
                <div class="content">작성날짜 : ${date}</div>
<!--                <div class="ui blue button" onclick="writingFix()">수정</div>-->
                </div>
                <div class="header">작성자 : ${userName}</div>
                <div class="content">
                내용 : ${comment}
                </div>
                <br>
                <div class="content">
                <i class="pencil icon"></i>카테고리 : ${category}
                </div>
                </div>`;


                $(`#listOfComments`).append(chatData);


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

});
