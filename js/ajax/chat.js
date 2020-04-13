// <--- 함수 리스트 --->
// 1. writeAComment 댓글작성 함수
// 2. editComment 댓글수정 함수
// 3. deleteComment 댓글삭제 함수
// 4. loadingComments 댓글목록 불러오는 함수
// 5. getArticleNumber 글번호 가져오는 함수
// 6. categoryImport 카테고리 가져오는 함수
// 7. editCommentWindow 댓글수정 창 호출하는 함수
// 8. largeComment 관리자 댓글 작성 함수
// 9. aLargeCommentWindow 관리자 댓글 창 호출 함수.
// 10. editComments 관리자 댓글 수정 함수.
// 11. deleteAdminComments 관리자 댓글 삭제 함수.

//TODO 대댓글, 댓글 추가,불러오기, 수정,삭제에서 uid 전달 해야됨 -> 로그인 기능 구현되면
//TODO 페이징 구현 해야됨.
//TODO 관리자 댓글 처리 해야됨.


// 1. 댓글 작성 함수.
function writeAComment() {

    const postNum = getArticleNumber();
    const categoryUrl = categoryImport();

    console.log("글번호: " + postNum);
    console.log("카테고리 번호 : " + categoryUrl);

    const comment = $('#replyForm').val();
    console.log(comment);
    const userName = "민차뉘";

    let commentData = {
        'category': categoryUrl, //이부분에서 '_token'이라는 key로 csrf_token값을 전달해 주어야 한다
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
            const commentID = parseData.commentIndex;

            console.log("반환 데이터 확인 : " + data);
            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 작성 성공여부입니다.: " + keyCheck);

            let chatData = `<div class="comment" id=${commentID}>`;
            chatData += `<a class="avatar">`;
            chatData += `<img src="images/plant.jpg" alt="image">`;
            chatData += `</a>`;
            chatData += `<div class="content">`;
            chatData += `<a class="author">${userName}</a>`;
            chatData += `<div class="text">`;
            chatData += `${comment}`;
            chatData += `</div>`;
            chatData += `<div class="actions">`;
            chatData += `<a class="reply" href="javascript:void(0);" onclick="deleteComment(this)" id=${commentID}>삭제</a>`;
            chatData += `<a class="save" href="javascript:void(0);" onclick="editComment(this)" id=${commentID}>수정</a>`;
            chatData += `</div>`;
            chatData += `</div>`;
            chatData += `</div>`;

            $('#comments').append(chatData);


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
function editComment(crystalID) {

    // 수정할 글 번호
    const editCommentID = crystalID.id;
    console.log(editCommentID);

    const comment = $(`#formreply`).val();
    console.log("입력된 데이터 값 : " + comment);

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
            console.log("댓글 수정 성공여부입니다.: " + keyCheck);

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
            console.log("상태: " + status);
            console.log("실패");
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

            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 삭제 성공여부입니다.: " + keyCheck);

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
            console.log("상태: " + status);
            console.log("실패");
        }
    });

}

// 댓글창이 열려 있는지 확인하는 변수
let commentWindowCheck = false;


//TODO 대댓글까지 같이 출력해줘야 함

// 4. loadingComments 댓글목록 불러오는 함수
function loadingComments() {


    const postNum = getArticleNumber();

    console.log("댓글번호 보기 : " + postNum);

    $('#viewComments').text("댓글 접기");

// (get) https://honeytip.p-e.kr/comments/{글 번호}/{댓글 페이징 번호} // 댓글 페이징번호 1번부터 시작
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

            // let adminComments = `<div class="comments">`;
            // adminComments += `<div class="comment">`;
            // adminComments += `<a class="avatar">`;
            // adminComments += `<img src="/images/plant.jpg">`;
            // adminComments += `</a>`;
            // adminComments += `<div class="content">`;
            // adminComments += `<a class="author">${userName}</a>`;
            // adminComments += `<div class="metadata">`;
            // // adminComments += `<span class="date">Just now</span>`;
            // adminComments += `</div>`;
            // adminComments += `<div class="text">`;
            // adminComments += `${comment}`;
            // adminComments += `</div>`;
            // adminComments += `<div class="actions">`;
            // adminComments += `<a class="reply">Reply</a>`;
            // adminComments += `</div>`;
            // adminComments += `</div>`;
            // adminComments += `</div>`;
            // adminComments += `</div>`;
            //
            // $('#addAdminComments').append(adminComments);


            // 받아온 값이 true일 경우엔 댓글목록을 같이 생성
            if (keyCheck === true && commentWindowCheck === false) {
                console.log("댓글목록 출력: ");
                commentWindowCheck = true;

                let contents = parseData.contents;

                console.log("받아온 데이터 목록 : " + data);

                let listOfComments = contents.length;


                let chatTitle = `<h3 class="ui dividing header"><span style="vertical-align: inherit;"><span`;
                chatTitle += `style="vertical-align: inherit;"><i class="comment icon"></i>댓글 </span></span></h3>`;
                chatTitle += `<h3 class="ui dividing header reply center aligned"><span style="font-size: 16px; color:rgba(0, 0, 0, 0.8); ">이전 댓글보기</span></h3>`;
                chatTitle += `<br>`;

                $('#replyTitle').append(chatTitle);

                let commentForm = `<form class="ui reply form">`;
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
                    let indexComments = contents[i].indexComments;

                    console.log(comment);


                    let chatData = `<div class="comment" id=${indexComments}>`;
                    chatData += `<a class="avatar">`;
                    chatData += `<img src="images/plant.jpg" alt="image">`;
                    chatData += `</a>`;
                    chatData += `<div class="content" id="addAdminComments">`;
                    chatData += `<a class="author">${userName}</a>`;
                    chatData += `<div class="text" id="text${indexComments}">`;
                    chatData += `${comment}`;
                    chatData += `</div>`;
                    chatData += `<div class="actions">`;
                    chatData += `<a class="reply" href="javascript:void(0);" onclick="deleteComment(this)" id=${indexComments}>삭제</a>`;
                    chatData += `<a class="save" href="javascript:void(0);" onclick="editCommentWindow(this)" id=${indexComments}>수정</a>`;
                    chatData += `<a class="reply" href="javascript:void(0);" onclick="aLargeCommentWindow(this)" id=${indexComments}>관리자 댓글</a>`;
                    chatData += `</div>`;
                    chatData += `</div>`;
                    chatData += `</div>`;


                    $('#comments').append(chatData);

                }

                // 받아온 값이 false일 경우엔 댓글목록 없이 댓글 입력창만 출력
            } else if (keyCheck === false && commentWindowCheck === false) {
                console.log("댓글 목록 없음.");
                commentWindowCheck = true;

                let chatTitle = `<h3 class="ui dividing header"><span style="vertical-align: inherit;"><span`;
                chatTitle += `style="vertical-align: inherit;"><i class="comment icon"></i>댓글 12</span></span></h3>`;
                chatTitle += `<h3 class="ui dividing header reply center aligned"><span style="font-size: 16px; color:rgba(0, 0, 0, 0.8); ">이전 댓글보기</span></h3>`;
                chatTitle += `<br>`;

                $('#replyTitle').append(chatTitle);

                let commentForm = `<form class="ui reply form">`;
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
            } else if (commentWindowCheck === true) {
                commentWindowCheck = false;

                $('#viewComments').text("댓글 보기");
                //댓글 창 삭제.
                $('#commentWindow').remove();

                //삭제한 후에 다시 div목록들을 담아줌.
                let commentWindow = `<div id="commentWindow">`;
                commentWindow += `<div id="replyTitle"></div>`;
                commentWindow += `<div id="comments"></div>`;
                commentWindow += `<div id="formId"></div>`;
                commentWindow += `</div>`;

                $('#commentCreationWindow').append(commentWindow);


            }

            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 목록리스트 체크 " + keyCheck);


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

// 7. 댓글수정 창 호출하는 함수
function editCommentWindow(crystalID) {

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


}


// 8. largeComment 관리자 댓글 작성 함수
function largeComment(commentID) {

    // 대댓글 작성 번호
    const editCommentID = commentID.id;
    console.log(editCommentID);

    const comment = $(`#formreply`).val();
    console.log("입력된 데이터 값 : " + comment);

    const postNum = getArticleNumber();
    const categoryUrl = categoryImport();

    console.log("글번호: " + postNum);
    console.log("카테고리 번호 : " + categoryUrl);

    console.log(comment);
    const userName = "관리자 입니다.";

    console.log("indexComment: " + editCommentID);
    console.log("postNum: " + postNum);
    console.log("reply: " + comment);
    console.log("userName: " + userName);

    // 댓글 인덱스 indexComment, 댓글 reply, 유저 이름 userName  , 글 번호 postNum


    let commentData = {
        'indexComment': editCommentID,
        'postNum': postNum,
        'reply': comment,
        'userName': userName
    };


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
            const commentID = parseData.commentIndex;

            console.log("반환 데이터 확인 : " + data);
            // true/false 둘 중 하나를 반환한다.
            console.log("댓글 작성 성공여부입니다.: " + keyCheck);

            let adminComments = `<div class="comments">`;
            adminComments += `<div class="comment">`;
            adminComments += `<a class="avatar">`;
            adminComments += `<img src="/images/plant.jpg">`;
            adminComments += `</a>`;
            adminComments += `<div class="content">`;
            adminComments += `<a class="author">${userName}</a>`;
            adminComments += `<div class="metadata">`;
            // adminComments += `<span class="date">Just now</span>`;
            adminComments += `</div>`;
            adminComments += `<div class="text">`;
            adminComments += `${comment}`;
            adminComments += `</div>`;
            adminComments += `<div class="actions">`;
            adminComments += `<a class="reply">Reply</a>`;
            adminComments += `</div>`;
            adminComments += `</div>`;
            adminComments += `</div>`;
            adminComments += `</div>`;

            $('#addAdminComments').append(adminComments);


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

// 9. aLargeCommentWindow 관리자 댓글 창 호출 함수.
function aLargeCommentWindow(crystalID) {

    // 수정할 글 번호
    const editCommentID = crystalID.id;

    let formData = `<form class="ui reply form" id="crystalWindow">`;
    formData += `<div class="field">`;
    formData += `<textarea id="formreply" spellcheck="true"></textarea>`;
    formData += `</div>`;
    formData += `<div class="ui red labeled submit icon button" onclick="largeComment(this)" id=${editCommentID}>`;
    formData += `<i class="icon edit"></i> 관리자 댓글`;
    formData += `</div>`;
    formData += `</form>`;

    $(`#${editCommentID}`).append(formData);


}


// 10. editComments 관리자 댓글 수정 함수
function editComments(largeCommentNumber) {

    // 대댓글 수정(일부 수정)
// (PUT [reply]) https://honeytip.p-e.kr/reply/{대댓글 번호}
//     클라이언트 : 대댓글 내용 reply
// 백엔드 : true (트루 폴스 확인 불가능 추후 더 알아보고 수정하겠음)

    // 입력 폼 변경해야함.

    // 수정할 글 번호
    const editCommentID = largeCommentNumber.id;
    console.log(editCommentID);

    const comment = $(`#formreply`).val();
    console.log("입력된 데이터 값 : " + comment);

    let form = new FormData();
    form.append("_method", "PATCH");
    form.append("reply", comment);

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
            console.log("댓글 수정 성공여부입니다.: " + keyCheck);

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
            console.log("상태: " + status);
            console.log("실패");
        }
    });

}

// 11. deleteAdminComments 관리자 댓글 삭제 함수.
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

            console.log("댓글 삭제 성공여부입니다.: " + keyCheck);

            // document.getElementById(deleteIdData).remove();


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




