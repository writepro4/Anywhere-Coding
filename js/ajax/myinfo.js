// <--- 함수 리스트 --->
// 1. 내 정보 가져오는 함수.
// 2. withdrawal 회원탈퇴 함수.

//1.내 정보 가져오는 함수.
$(document).ready(function () {


    const name = sessionStorageGet('name');
    const avatar = sessionStorageGet('avatar');
    const uid = sessionStorageGet('cf');

    //댓글 리스트 먼저 페이징으로 가져온다.
    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/user/${uid}/comments/list/1`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            const {key} = parseData;
            const {contents} = parseData;
            const {pageCount} = parseData;

            const contentsList = contents.length;


            const {userName, category, date, indexComments, comment, postNum} = contents[0];

            //console.log("유저 네임 : " + userName);
            //console.log("카테고리 : " + category);
            //console.log("날짜 : " + date);
            //console.log("글 번호 : " + indexComments);
            //console.log("내용 : " + comment);
            //console.log("번호 : " + postNum);

            //console.log("확인된 데이터 : " + data);
            //console.table(contents);

            for (let i = 0; i < contentsList; i++) {

                const {userName, category, date, indexComments, comment, postNum} = contents[i];

                const posts = '_' + postNum;

//                 const likeItem = `<div class="item ">
//                     <div class="content">
//                         내용 : ${comment}
//                     </div>
//                     <div class="description">
//                     <div class="right floated content" onclick="detailPage(this)" id=${posts}>
//       <b>페이지로 이동하기</b>
//     </div>
// </div>
//                 </div>`;
                const likeItem = `<div class="item">
                    <div class="content">
                    <a class="header">${i + 1}. ${comment}</a>
                <div class="description">작성날짜 : ${date}<a>
                
                <div class="right floated content" onclick="detailPage(this)" id=${posts}>
      <b>작성한 글로 이동하기</b>
    </div>
                </a> 
                </div>
                </div>
                </div>`;

                $('#listOfComments').append(likeItem);

            }

            for (let i = 0; i < pageCount; i++) {
                const itemList = `<a class="active item">
                    ${i + 1}
                    </a>`;

                $(`#commentPaging`).append(itemList);
            }


            //         좋아요 리스트 (페이징)
            $.ajax({
                type: 'get'
                , url: `https://honeytip.p-e.kr/user/${uid}/like/list/1`
                , xhrFields: {
                    withCredentials: false
                }
                , success: function (data) {
                    //json 파싱하기
                    let parseData = JSON.parse(data);
                    const {key} = parseData;
                    const {pageCount} = parseData;
                    //console.log("좋아요 데이터 확인 : " + data);
                    const {contents} = parseData;

                    const contentsList = contents.length;


                    for (let i = 0; i < contentsList; i++) {

                        const {indexPosts, subTitle, title} = contents[i];
                        const posts = '_' + indexPosts;

                        const likeItem = `<div class="item">
                    <div class="content">
                    <a class="header">${i + 1}. ${title}</a>
                <div class="description">${subTitle}<a>
                
                <div class="right floated content" onclick="detailPage(this)" id=${posts}>
      <b>페이지로 이동하기</b>
    </div>
                </a> 
                </div>
                </div>
                </div>`;

                        $('#likeItList').append(likeItem);

                    }

                    for (let i = 0; i < pageCount; i++) {
                        const itemList = `<a class="active item">
                    ${i + 1}
                    </a>`;

                        $(`#likeItPageing`).append(itemList);
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
            //console.log("상태: " + status);
            //console.log("실패");
        }
    });
}

