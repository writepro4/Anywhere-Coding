// 1. 상세페이지 내용 불러오는 함수
// 2. getUrlData url데이터를 가져오는 함수
// 3. likeClick 좋아요클릭 요청 보내는 함수
// 4. likeCancel 좋아요 취소 함수
// 5. socialLogin 로그인 하지 않았을경우 소셜로그인창으로 이동하게 하는 함수.


// 1. 상세페이지 내용 불러오는 함수
document.addEventListener("DOMContentLoaded", function () {
    const listNumber = getUrlData();

    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/posts/${listNumber}`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            //json 파싱하기
            let parseData = JSON.parse(data);

            let postInfoData = parseData.postInfo;
            //console.table(postInfoData);


            const {commentsCount} = postInfoData;
            const {likeIt} = postInfoData;
            const {title} = postInfoData;
            const {contents} = postInfoData;
            const {viewCount} = postInfoData;
            const {date} = postInfoData;

            const titlePage = `<h1 class="ui header center aligned" >${title}</h1>`;


            let contentPage = contents;
            contentPage += `<br><br><br><br>`;


            $('#titlePage').append(titlePage);
            $('#contentPage').append(contentPage);
            $(`#viewComments`).append(commentsCount);
            $(`#likeIt`).append(likeIt);


            const id = sessionStorageGet('cf');
            if (id !== null) {


                //좋아요버튼 누르기 가능한지 판단하기 위해 요청을 한번 더 보냄.
                $.ajax({
                    type: 'get'
                    , url: `https://honeytip.p-e.kr/like/${listNumber}/${id}`
                    , xhrFields: {
                        withCredentials: false
                    }
                    , success: function (data) {
                        //console.log("데이터 확인 : " + data);
                        //json 파싱하기
                        let parseData = JSON.parse(data);



                        if (parseData.key === "possible") {
                            //console.log("확인 ");
                            $(`#likeIt`).remove();
                            const button = `<div class="ui red button" id="likeIt" onclick="likeClick()">
                                <i class="heart icon"></i> 좋아요 ${likeIt}
                                </div>`;
                            $(`#likeButton`).append(button);

                        } else {
                            const button = `<div class="ui black button" id="likeIt" onclick="likeCancel()">
                                            <i class="heart icon"></i> 고마워요! ${likeIt}
                                                </div>`;
                            $(`#likeButton`).append(button);
                        }

                        $('#chatCount').append(commentsCount);
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
            } else {

                // 게스트는 로그인창으로 이동하게끔 설정
                $.ajax({
                    type: 'get'
                    , url: `https://honeytip.p-e.kr/like/${listNumber}/geust`
                    , xhrFields: {
                        withCredentials: false
                    }
                    , success: function (data) {
                        //console.log("데이터 확인 : " + data);
                        //json 파싱하기
                        let parseData = JSON.parse(data);

                        //console.log("확인 ");
                        $(`#likeIt`).remove();
                        const button = `<div class="ui red button" id="likeIt" onclick="socialLogin()">
                                <i class="heart icon"></i> 좋아요 ${likeIt}
                                </div>`;
                        $(`#likeButton`).append(button);


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
});

// 2. url 데이터를 가져오는 함수.
function getUrlData() {

    return location.href.substr(
        location.href.lastIndexOf('_') + 1
    );

}

// 3. likeClick 좋아요클릭 요청 보내는 함수
function likeClick() {

    const uid = sessionStorageGet(`cf`);
    const pageNumber = getUrlData();
    const value = `possible`;

    //console.log("uid값 입니다 : " + uid);

    let likeData = {
        'postNum': pageNumber,
        'id': uid,
        'value': value

    };


    $.ajax({
        type: 'post'
        , url: `https://honeytip.p-e.kr/like`
        , data: likeData
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            //json 파싱하기
            let parseData = JSON.parse(data);
            //console.log("좋아요 클릭 반환 데이터 : "+ data);

            const {key} = parseData;
            const {likeIt} = parseData;

            // //console.log(data);

            $(`#likeIt`).remove();
            const button = `<div class="ui black button" id="likeIt" onclick="likeCancel()">
                                <i class="heart icon"></i> 고마워요! ${likeIt}
                                </div>`;
            $(`#likeButton`).append(button);


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

//4.likeCancel 좋아요 취소 함수
function likeCancel() {

    const uid = sessionStorageGet(`cf`);
    const pageNumber = getUrlData();
    const value = `cancel`;
    //console.log("uid값 입니다 : " + uid);

    let likeData = {
        'postNum': pageNumber,
        'id': uid,
        'value': value

    };


    $.ajax({
        type: 'post'
        , url: `https://honeytip.p-e.kr/like`
        , data: likeData
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            //json 파싱하기
            let parseData = JSON.parse(data);
            const {likeIt} = parseData;

            //console.log("반환데이터 : " + data);

            $(`#likeIt`).remove();
            const button = `<div class="ui red button" id="likeIt" onclick="likeClick()">
                                <i class="heart icon"></i> 좋아요 ${likeIt}
                                </div>`;
            $(`#likeButton`).append(button);


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

// 5. socialLogin 로그인 하지 않았을경우 소셜로그인창으로 이동하게 하는 함수.
function socialLogin() {
    window.location.replace(`./socialLogin.html`)
}