// <--- 함수 리스트 --->
// 1. writeAComment 댓글작성 함수
// 2. editComment 댓글수정 함수
// 3. deleteComment 댓글삭제 함수
// 4. loadingComments 댓글목록 불러오는 함수
// 5. getArticleNumber 글번호 가져오는 함수
// 6. categoryImport 카테고리 가져오는 함수
// 7. editCommentWindow 댓글수정 창 호출하는 함수
// 8. largeComment 대댓글 작성 함수
// 9. aLargeCommentWindow 대댓글 창 호출 함수.
// 10. editComments 대댓글 수정 함수.
// 11. deleteAdminComments 대댓글 삭제 함수.
// 13. pagingTreatment 페이징 처리 함수.
// 14. sessionStorageGet 세션스토리지에 값 가져오는 함수.
// 15. editCommentsWindow 대댓글수정 창 호출하는 함수
// 16. checkIn 로그인 체크 함수


// 1. 댓글 작성 함수.
function writeAComment() {

    //로그인 했는지 체크하는 함수.
    checkIn();

    const postNum = getArticleNumber();
    const categoryUrl = categoryImport();


    const comment = $('#replyForm').val();
    const userName = sessionStorageGet(`name`);
    const id = sessionStorageGet('cf');

    const avatar = sessionStorageGet(`avatar`);
    console.log(avatar);


    let commentData = {
        'category': categoryUrl,
        'comment': comment,
        'userName': userName,
        'postNum': postNum,
        'uid': id
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
            const commentID = parseData.commentIndex;


            const chatData = `<div class="ui comments" id=${commentID}>
                <div class="ui segment">
                <div class="comment"><a class="avatar"><img src=${avatar}></a>
                <div class="content" id="addAdminComments${commentID}"><a class="author">${userName}</a>
                <div class="metadata">
                <span class="date">방금전</span>
                </div>
                <div class="text" id="text${commentID}">${comment}</div>
                <div class="actions"><a class="reply" href="javascript:void(0);"
                onclick="deleteComment(this)" id=${commentID}>삭제</a><a class="save"
                href="javascript:void(0);"
                onclick="editCommentWindow(this)"
                id=${commentID}>수정</a><a
                class="reply" href="javascript:void(0);" onclick="aLargeCommentWindow(this)"
                id=${commentID}>댓글 달기</a></div>
                </div>
                </div>
                </div>
                </div>`;


            $('#comments').append(chatData);
            $('#replyForm').val('');


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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });


}

// 2. 댓글수정 함수
function editComment(crystalID) {

    // 수정할 글 번호
    const editCommentID = crystalID.id;
    //console.log(editCommentID);

    const comment = $(`#formreply`).val();
    //console.log("입력된 데이터 값 : " + comment);

    let form = new FormData();
    form.append("_method", "PATCH");
    form.append("comment", comment);

    $.ajax({
        type: 'post'
        , url: `https://honeytip.p-e.kr/comments/${editCommentID}`
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
            //console.log("댓글 수정 성공여부입니다.: " + keyCheck);

            // 수정창 삭제
            document.getElementById(`crystalWindow`).remove();

            $(`#text${editCommentID}`).text(comment);

            //댓글 호출 창 변수 false로 값 변경해주기.
            crystalWindowCheck = false


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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });

}

// 3. 댓글삭제 함수
function deleteComment(deleteId) {

    const deleteIdData = deleteId.id;

    let form = new FormData();
    form.append("_method", "DELETE");

    $.ajax({
        type: 'post'
        , url: `https://honeytip.p-e.kr/comments/${deleteIdData}`
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


            document.getElementById(deleteIdData).remove();


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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });


}

// 4. 댓글목록 불러오는 함수
document.addEventListener("DOMContentLoaded", function () {


    const postNum = getArticleNumber();

    $.ajax({
            type: 'get'
            , url: `https://honeytip.p-e.kr/comments/${postNum}/1`
            , xhrFields: {
                withCredentials: false
            }
            , success: function (data) {
                //json 파싱하기
                let parseData = JSON.parse(data);
                let keyCheck = parseData.key;


                // 받아온 값이 true일 경우엔 댓글목록을 같이 생성
                if (keyCheck === true) {

                    let contents = parseData.contents;

                    let listOfComments = contents.length;


                    //상단 댓글 텍스트 불러오는 곳
                    let chatTitle = `<h3 class="ui dividing header"><span style="vertical-align: inherit;"><span`;
                    chatTitle += ` style="vertical-align: inherit;"><p id="chatCount"><i class="comment icon"></i>댓글  </p> </span></span></h3>`;
                    chatTitle += `<div class="ui header center aligned comment content" onclick="pagingTreatment()"><a class="author" style="font-size: 18px; color:rgba(0, 0, 0, 0.8); ">이전 댓글보기</a></div>`;
                    chatTitle += `<br>`;

                    $('#replyTitle').append(chatTitle);

                    //댓글 창 보여지는 곳
                    let commentForm = `<br><br><form class="ui reply form">`;
                    commentForm += `<div class="field">`;
                    commentForm += `<label>`;
                    commentForm += `<textarea id="replyForm" placeholder="로그인하고 댓글을 작성해보세요!"></textarea>`;
                    commentForm += `</label>`;
                    commentForm += `</div>`;
                    commentForm += `<div class="ui olive labeled submit icon button" onclick="writeAComment()">`;
                    commentForm += `<i class="icon edit"></i><span style="vertical-align: inherit;"><span`;
                    commentForm += `style="vertical-align: inherit;"> 댓글 작성`;
                    commentForm += `</span></span></div>`;
                    commentForm += `</form>`;

                    $('#formId').append(commentForm);

                    for (let i = 0; i < listOfComments; i++) {

                        let comment = contents[i].comment;
                        let userName = contents[i].userName;
                        let date = contents[i].date;
                        // 댓글마다 각각 그 숫자가 증가한다 -> 다 다른값
                        let indexComments = contents[i].indexComments;
                        //얼마나 깊은지 나타내는 class
                        let classNum = contents[i].class;
                        //몇번째 대댓글인지 나타내는 order
                        let orderNum = contents[i].order;
                        let categoryNum = contents[i].category;
                        let postNum = contents[i].postNum;
                        //어떤 그룹번호에 속해 있는지 나타내는 groupNum
                        //그룹 번호는 그 댓글 번호와 같다 .
                        let groupNum = contents[i].groupNum;
                        let uid = contents[i].uid;
                        const avatar = contents[i].avatar;
                        // console.log(avatar)
                        //자신이 작성한 댓글인지 확인하는 변수.
                        const uidCheck = sessionStorageGet('cf');

                        //자신이 작성한 댓글이라면 수정,삭제 메뉴 뜸.
                        if (uidCheck === uid) {

                            // 클래스 번호가 1일 경우엔 대댓글 처리를 해준다.
                            if (classNum === 1) {

                                let adminComments = `<div class="comments" id=${indexComments}>`;
                                adminComments += `<div class="ui segment">`;
                                adminComments += `<div class="comment">`;
                                adminComments += `<a class="avatar">`;
                                adminComments += `<img src=${avatar}>`;
                                adminComments += `</a>`;
                                adminComments += `<div class="content">`;
                                adminComments += `<a class="author">${userName}</a>`;
                                adminComments += `<div class="metadata">`;
                                adminComments += `<span class="date">${date}</span>`;
                                adminComments += `</div>`;
                                adminComments += `<div class="text" id="text${indexComments}">`;
                                adminComments += `${comment}`;
                                adminComments += `</div>`;
                                adminComments += `<div class="actions">`;
                                adminComments += `<a class="reply" onclick="deleteAdminComments(this)" id=${indexComments}>삭제</a>`;
                                adminComments += `<a class="reply" onclick="editCommentsWindow(this)" id=${indexComments}>수정</a>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;

                                $(`#addAdminComments${groupNum}`).append(adminComments);
                                //console.log("실행합니다. index값 확인 : " + indexComments);


                            } else {


                                let chatData = `<div class="ui comments" id=${indexComments}>`;
                                chatData += `<div class="ui segment">`;
                                chatData += `<div class="comment">`;
                                chatData += `<a class="avatar">`;
                                chatData += `<img src=${avatar}>`;
                                chatData += `</a>`;
                                chatData += `<div class="content" id="addAdminComments${indexComments}">`;
                                chatData += `<a class="author">${userName}</a>`;
                                chatData += `<div class="metadata">
                                    <span class="date">${date}</span>
                                </div>`;
                                chatData += `<div class="text" id="text${indexComments}">`;
                                chatData += `${comment}`;
                                chatData += `</div>`;
                                chatData += `<div class="actions">`;
                                chatData += `<a class="reply" href="javascript:void(0);" onclick="deleteComment(this)" id=${indexComments}>삭제</a>`;
                                chatData += `<a class="save" href="javascript:void(0);" onclick="editCommentWindow(this)" id=${indexComments}>수정</a>`;
                                chatData += `<a class="reply" href="javascript:void(0);" onclick="aLargeCommentWindow(this)" id=${indexComments}>댓글 달기</a>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;


                                $('#comments').append(chatData);


                            }

                            //자신이 작성한 댓글이 아니라면 수정,삭제 메뉴를 포함시키지 않는다.
                        } else {

                            // 클래스 번호가 1일 경우엔 대댓글 처리를 해준다.
                            if (classNum === 1) {

                                let adminComments = `<div class="comments" id=${indexComments}>`;
                                adminComments += `<div class="ui segment">`;
                                adminComments += `<div class="comment">`;
                                adminComments += `<a class="avatar">`;
                                adminComments += `<img src=${avatar}>`;
                                adminComments += `</a>`;
                                adminComments += `<div class="content">`;
                                adminComments += `<a class="author">${userName}</a>`;
                                adminComments += `<div class="metadata">`;
                                adminComments += `<span class="date">${date}</span>`;
                                adminComments += `</div>`;
                                adminComments += `<div class="text" id="text${indexComments}">`;
                                adminComments += `${comment}`;
                                adminComments += `</div>`;
                                // adminComments += `<div class="actions">`;
                                // adminComments += `<a class="reply" onclick="deleteAdminComments(this)" id=${indexComments}>삭제</a>`;
                                // adminComments += `<a class="reply" onclick="editCommentsWindow(this)" id=${indexComments}>수정</a>`;
                                // adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;

                                $(`#addAdminComments${groupNum}`).append(adminComments);
                                //console.log("실행합니다. index값 확인 : " + indexComments);


                            } else {


                                let chatData = `<div class="ui comments" id=${indexComments}>`;
                                chatData += `<div class="ui segment">`;
                                chatData += `<div class="comment">`;
                                chatData += `<a class="avatar">`;
                                chatData += `<img src=${avatar}>`;
                                chatData += `</a>`;
                                chatData += `<div class="content" id="addAdminComments${indexComments}">`;
                                chatData += `<a class="author">${userName}</a>`;
                                chatData += `<div class="metadata">
                                    <span class="date">${date}</span>
                                </div>`;
                                chatData += `<div class="text" id="text${indexComments}">`;
                                chatData += `${comment}`;
                                chatData += `</div>`;
                                chatData += `<div class="actions">`;
                                // chatData += `<a class="reply" href="javascript:void(0);" onclick="deleteComment(this)" id=${indexComments}>삭제</a>`;
                                // chatData += `<a class="save" href="javascript:void(0);" onclick="editCommentWindow(this)" id=${indexComments}>수정</a>`;
                                chatData += `<a class="reply" href="javascript:void(0);" onclick="aLargeCommentWindow(this)" id=${indexComments}>댓글 달기</a>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;


                                $('#comments').append(chatData);


                            }


                        }


                    }

                    // 받아온 값이 false일 경우엔 댓글목록 없이 댓글 입력창만 출력
                } else if (keyCheck === false) {

                    let chatTitle = `<h3 class="ui dividing header"><span style="vertical-align: inherit;"><span`;
                    chatTitle += `style="vertical-align: inherit;"><i class="comment icon"></i>댓글</span></span></h3>`;
                    chatTitle += `<h3 class="ui dividing header reply center aligned"><span style="font-size: 16px; color:rgba(0, 0, 0, 0.8); ">이전 댓글보기</span></h3>`;
                    chatTitle += `<br>`;

                    $('#replyTitle').append(chatTitle);

                    let commentForm = `<br><br><form class="ui reply form">`;
                    commentForm += `<div class="field">`;
                    commentForm += `<label>`;
                    commentForm += `<textarea id="replyForm" placeholder="로그인하고 댓글을 작성해보세요!"></textarea>`;
                    commentForm += `</label>`;
                    commentForm += `</div>`;
                    commentForm += `<div class="ui olive labeled submit icon button" onclick="writeAComment()">`;
                    commentForm += `<i class="icon edit"></i><span style="vertical-align: inherit;"><span`;
                    commentForm += `style="vertical-align: inherit;"> 댓글 작성`;
                    commentForm += `</span></span></div>`;
                    commentForm += `</form>`;

                    $('#formId').append(commentForm);
                    //댓글 버튼 확인하고 댓글창 닫음.
                }


            }
            //에러 종류 조건문으로 걸러내기
            ,
            error: function (jqXHR, exception) {

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
                //console.log("상태: " + status);
                //console.log("실패");
            }
        }
    )
    ;

});

// 5. 글번호 가져오는 함수
function getArticleNumber() {
    const postNumber = location.href.substr(
        location.href.lastIndexOf('_') + 1
    );

    return postNumber;
}

// 6. 카테고리 가져오는 함수
function categoryImport() {
    const categoryNum = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );

    const categoryNumber = categoryNum.split('_');
    return categoryNumber[0];
}

//수정창이 열려 있는지 확인하는 변수
let crystalWindowCheck = false;

// 7. 댓글수정 창 호출하는 함수
function editCommentWindow(crystalID) {

    if (crystalWindowCheck === false) {
        console.log("수정창 true.")
        crystalWindowCheck = true;

        // 수정할 글 번호
        const editCommentID = crystalID.id;

        let formData = `<form class="ui reply form" id="crystalWindow">`;
        formData += `<div class="field">`;
        formData += `<textarea id="formreply" spellcheck="true"></textarea>`;
        formData += `</div>`;
        formData += `<div class="ui blue labeled submit icon button" onclick="editComment(this)" id=${editCommentID}>`;
        formData += `<i class="icon edit"></i> 수정하기`;
        formData += `</div>`;
        formData += `</form>`;

        $(`#${editCommentID}`).append(formData);

    } else {
        console.log("수정창 false")
        crystalWindowCheck = false;
        $(`#crystalWindow`).remove();
    }


}

// 8. largeComment 대댓글 댓글 작성 함수
function largeComment(commentID) {

    // 대댓글 작성 번호
    const editCommentID = commentID.id;

    const comment = $(`#formreply`).val();

    const postNum = getArticleNumber();
    const categoryUrl = categoryImport();

    const uid = sessionStorageGet('cf');

    //console.log(comment);
    const userName = sessionStorageGet(`name`);


    let commentData = {
        'indexComments': editCommentID,
        'postNum': postNum,
        'comment': comment,
        'userName': userName,
        'uid': uid
    };
    console.table(editCommentID, postNum, comment, userName, uid)


    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/reply'
        , data: commentData
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;
            const commentID = parseData.commentsIndex;

            //console.log("반환 데이터 확인 : " + data);
            // true/false 둘 중 하나를 반환한다.
            //console.log("댓글 작성 성공여부입니다.: " + keyCheck);
            //console.log("아이디 값 확인 : " + commentID);

            let adminComments = `<div class="comments" id=${commentID}>`;
            adminComments += `<div class="ui segment">`;
            adminComments += `<div class="comment">`;
            adminComments += `<a class="avatar">`;
            adminComments += `<img src="/images/avatarMan.png">`;
            adminComments += `</a>`;
            adminComments += `<div class="content">`;
            adminComments += `<a class="author">${userName}</a>`;
            adminComments += `<div class="metadata">`;
            adminComments += `<span class="date">방금</span>`;
            adminComments += `</div>`;
            adminComments += `<div class="text">`;
            adminComments += `${comment}`;
            adminComments += `</div>`;
            adminComments += `<div class="actions">`;
            adminComments += `<a class="reply" onclick="deleteAdminComments(this)" id=${commentID}>삭제</a>`;
            adminComments += `<a class="reply" onclick="editCommentsWindow(this)" id=${commentID}>수정</a>`;
            adminComments += `</div>`;
            adminComments += `</div>`;
            adminComments += `</div>`;
            adminComments += `</div>`;
            adminComments += `</div>`;

            $(`#addAdminComments${editCommentID}`).append(adminComments);
            $(`#crystalWindow`).remove();


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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });


}

// 9. aLargeCommentWindow 대댓글 댓글 창 호출 함수.
function aLargeCommentWindow(crystalID) {

    if (crystalWindowCheck === false) {

        crystalWindowCheck = true;
        // 수정할 글 번호
        const editCommentID = crystalID.id;

        let formData = `<form class="ui reply form" id="crystalWindow">`;
        formData += `<div class="field">`;
        formData += `<textarea id="formreply" spellcheck="true"></textarea>`;
        formData += `</div>`;
        formData += `<div class="ui red labeled submit icon button" onclick="largeComment(this)" id=${editCommentID} ">`;
        formData += `<i class="icon edit"></i> 답글 달기`;
        formData += `</div>`;
        formData += `</form>`;

        $(`#${editCommentID}`).append(formData);


    } else {
        crystalWindowCheck = false;
        $(`#crystalWindow`).remove();

    }


}

// 10. editComments 대댓글 댓글 수정 함수
function editComments(largeCommentNumber) {

    // 수정할 글 번호
    const editCommentID = largeCommentNumber.id;
    //console.log("대댓글번호 : " + editCommentID);

    const comment = $(`#formreply`).val();
    //console.log("입력된 데이터 값 : " + comment);

    let form = new FormData();
    form.append("_method", "PUT");
    form.append("comment", comment);

    $.ajax({
        type: 'post'
        , url: `https://honeytip.p-e.kr/reply/${editCommentID}`
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
            //console.log("댓글 수정 성공여부입니다.: " + keyCheck);

            // 수정창 삭제
            document.getElementById(`crystalWindow`).remove();

            $(`#text${editCommentID}`).text(comment);


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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });

}

// 11. deleteAdminComments 대댓글 댓글 삭제 함수.
function deleteAdminComments(adminCommentNumber) {

    const deleteID = adminCommentNumber.id;

    let form = new FormData();
    form.append("_method", "DELETE");

    $.ajax({
        type: 'post'
        , url: `https://honeytip.p-e.kr/reply/${deleteID}`
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

            //console.log("댓글 삭제 성공여부입니다.: " + keyCheck);

            document.getElementById(deleteID).remove();


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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });


}

// 페이징 적용하기 위한 변수
let paging = 2;

// 13. pagingTreatment 페이징 처리 함수
function pagingTreatment() {
    //console.log("페이징 실행");
    const postNum = getArticleNumber();
    console.log("페이징 실행");

    $.ajax({
            type: 'get'
            , url: `https://honeytip.p-e.kr/comments/${postNum}/${paging}`
            , xhrFields: {
                withCredentials: false
            }
            , success: function (data) {

                let parseData = JSON.parse(data);
                let keyCheck = parseData.key;

                if (keyCheck === true) {

                    //댓글 창 삭제.
                    $('#commentWindow').remove();

                    //삭제한 후에 다시 div목록들을 담아줌.
                    let commentWindow = `<div id="commentWindow">`;
                    commentWindow += `<div id="replyTitle"></div>`;
                    commentWindow += `<div id="comments"></div>`;
                    commentWindow += `<div id="formId"></div>`;
                    commentWindow += `</div>`;

                    $('#commentCreationWindow').append(commentWindow);

                    let contents = parseData.contents;


                    let listOfComments = contents.length;


                    let chatTitle = `<h3 class="ui dividing header"><span style="vertical-align: inherit;"><span`;
                    chatTitle += `style="vertical-align: inherit;"><i class="comment icon"></i>댓글 </span></span></h3>`;
                    chatTitle += `<h1 class="ui dividing header reply center aligned" onclick="loadingComments()"><span style="font-size: 16px; color:rgba(0, 0, 0, 0.8); ">이전 댓글보기</span></h1>`;
                    chatTitle += `<br>`;

                    $('#replyTitle').append(chatTitle);

                    let commentForm = `<br><br><form class="ui reply form">`;
                    commentForm += `<div class="field">`;
                    commentForm += `<label>`;
                    commentForm += `<textarea id="replyForm" placeholder="로그인하고 댓글을 작성해보세요!"></textarea>`;
                    commentForm += `</label>`;
                    commentForm += `</div>`;
                    commentForm += `<div class="ui olive labeled submit icon button" onclick="writeAComment()">`;
                    commentForm += `<i class="icon edit"></i><span style="vertical-align: inherit;"><span`;
                    commentForm += `style="vertical-align: inherit;"> 댓글 작성`;
                    commentForm += `</span></span></div>`;
                    commentForm += `</form>`;

                    $('#formId').append(commentForm);

                    for (let i = 0; i < listOfComments; i++) {

                        let comment = contents[i].comment;
                        let userName = contents[i].userName;
                        let date = contents[i].date;
                        // 댓글마다 각각 그 숫자가 증가한다 -> 다 다른값
                        let indexComments = contents[i].indexComments;
                        //얼마나 깊은지 나타내는 class
                        let classNum = contents[i].class;
                        //몇번째 대댓글인지 나타내는 order
                        let orderNum = contents[i].order;
                        let categoryNum = contents[i].category;
                        let postNum = contents[i].postNum;
                        //어떤 그룹번호에 속해 있는지 나타내는 groupNum
                        //그룹 번호는 그 댓글 번호와 같다 .
                        let groupNum = contents[i].groupNum;
                        let uid = contents[i].uid;
                        //console.log("uid 값 : " + uid);

                        //자신이 작성한 댓글인지 확인하는 변수.
                        const uidCheck = sessionStorageGet('cf');

                        //자신이 작성한 댓글이라면 수정,삭제 메뉴 뜸.
                        if (uidCheck === uid) {

                            // 클래스 번호가 1일 경우엔 대댓글 처리를 해준다.
                            if (classNum === 1) {

                                let adminComments = `<div class="comments" id=${indexComments}>`;
                                adminComments += `<div class="ui segment">`;
                                adminComments += `<div class="comment">`;
                                adminComments += `<a class="avatar">`;
                                adminComments += `<img src="/images/avatarMan.png">`;
                                adminComments += `</a>`;
                                adminComments += `<div class="content">`;
                                adminComments += `<a class="author">${userName}</a>`;
                                adminComments += `<div class="metadata">`;
                                adminComments += `<span class="date">${date}</span>`;
                                adminComments += `</div>`;
                                adminComments += `<div class="text" id="text${indexComments}">`;
                                adminComments += `${comment}`;
                                adminComments += `</div>`;
                                adminComments += `<div class="actions">`;
                                adminComments += `<a class="reply" onclick="deleteAdminComments(this)" id=${indexComments}>삭제</a>`;
                                adminComments += `<a class="reply" onclick="editCommentsWindow(this)" id=${indexComments}>수정</a>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;

                                $(`#addAdminComments${groupNum}`).append(adminComments);
                                //console.log("실행합니다. index값 확인 : " + indexComments);


                            } else {


                                let chatData = `<div class="ui comments" id=${indexComments}>`;
                                chatData += `<div class="ui segment">`;
                                chatData += `<div class="comment">`;
                                chatData += `<a class="avatar">`;
                                chatData += `<img src="/images/avatar.png">`;
                                chatData += `</a>`;
                                chatData += `<div class="content" id="addAdminComments${indexComments}">`;
                                chatData += `<a class="author">${userName}</a>`;
                                chatData += `<div class="metadata">
                                    <span class="date">${date}</span>
                                </div>`;
                                chatData += `<div class="text" id="text${indexComments}">`;
                                chatData += `${comment}`;
                                chatData += `</div>`;
                                chatData += `<div class="actions">`;
                                chatData += `<a class="reply" href="javascript:void(0);" onclick="deleteComment(this)" id=${indexComments}>삭제</a>`;
                                chatData += `<a class="save" href="javascript:void(0);" onclick="editCommentWindow(this)" id=${indexComments}>수정</a>`;
                                chatData += `<a class="reply" href="javascript:void(0);" onclick="aLargeCommentWindow(this)" id=${indexComments}>댓글 달기</a>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;


                                $('#comments').append(chatData);


                            }

                            //자신이 작성한 댓글이 아니라면 수정,삭제 메뉴를 포함시키지 않는다.
                        } else {

                            // 클래스 번호가 1일 경우엔 대댓글 처리를 해준다.
                            if (classNum === 1) {

                                let adminComments = `<div class="comments" id=${indexComments}>`;
                                adminComments += `<div class="ui segment">`;
                                adminComments += `<div class="comment">`;
                                adminComments += `<a class="avatar">`;
                                adminComments += `<img src="/images/avatar.png">`;
                                adminComments += `</a>`;
                                adminComments += `<div class="content">`;
                                adminComments += `<a class="author">${userName}</a>`;
                                adminComments += `<div class="metadata">`;
                                adminComments += `<span class="date">${date}</span>`;
                                adminComments += `</div>`;
                                adminComments += `<div class="text" id="text${indexComments}">`;
                                adminComments += `${comment}`;
                                adminComments += `</div>`;
                                // adminComments += `<div class="actions">`;
                                // adminComments += `<a class="reply" onclick="deleteAdminComments(this)" id=${indexComments}>삭제</a>`;
                                // adminComments += `<a class="reply" onclick="editCommentsWindow(this)" id=${indexComments}>수정</a>`;
                                // adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;
                                adminComments += `</div>`;

                                $(`#addAdminComments${groupNum}`).append(adminComments);
                                //console.log("실행합니다. index값 확인 : " + indexComments);


                            } else {


                                let chatData = `<div class="ui comments" id=${indexComments}>`;
                                chatData += `<div class="ui segment">`;
                                chatData += `<div class="comment">`;
                                chatData += `<a class="avatar">`;
                                chatData += `<img src="/images/avatar.png">`;
                                chatData += `</a>`;
                                chatData += `<div class="content" id="addAdminComments${indexComments}">`;
                                chatData += `<a class="author">${userName}</a>`;
                                chatData += `<div class="metadata">
                                    <span class="date">${date}</span>
                                </div>`;
                                chatData += `<div class="text" id="text${indexComments}">`;
                                chatData += `${comment}`;
                                chatData += `</div>`;
                                chatData += `<div class="actions">`;
                                // chatData += `<a class="reply" href="javascript:void(0);" onclick="deleteComment(this)" id=${indexComments}>삭제</a>`;
                                // chatData += `<a class="save" href="javascript:void(0);" onclick="editCommentWindow(this)" id=${indexComments}>수정</a>`;
                                chatData += `<a class="reply" href="javascript:void(0);" onclick="aLargeCommentWindow(this)" id=${indexComments}>댓글 달기</a>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;
                                chatData += `</div>`;


                                $('#comments').append(chatData);


                            }


                        }


                    }

                }else{
                    alert("이전 댓글이 없어요.");
                }


            }
            //에러 종류 조건문으로 걸러내기
            ,
            error: function (jqXHR, exception) {

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
                //console.log("상태: " + status);
                //console.log("실패");
            }
        }
    )
    ;
}

// 14. sessionStorageGet 세션스토리지에 값 가져오는 함수.
function sessionStorageGet(key) {
    return window.sessionStorage.getItem(key);
}

// 15. 대댓글수정 창 호출하는 함수
function editCommentsWindow(crystalID) {

    if (crystalWindowCheck === false) {

        crystalWindowCheck = true;
        // 수정할 글 번호
        const editCommentID = crystalID.id;

        let formData = `<form class="ui reply form" id="crystalWindow">`;
        formData += `<div class="field">`;
        formData += `<textarea id="formreply" spellcheck="true"></textarea>`;
        formData += `</div>`;
        formData += `<div class="ui blue labeled submit icon button" onclick="editComments(this)" id=${editCommentID}>`;
        formData += `<i class="icon edit"></i> 수정하기`;
        formData += `</div>`;
        formData += `</form>`;

        $(`#${editCommentID}`).append(formData);

    } else {
        crystalWindowCheck = false;
        $(`#crystalWindow`).remove();
    }


}

// 16. checkIn 로그인 체크 함수
function checkIn() {
    const checkIn = sessionStorageGet('name');
    if (checkIn !== null) {
        return true;
    } else {
        window.location.href = `./socialLogin.html`;
    }
}












