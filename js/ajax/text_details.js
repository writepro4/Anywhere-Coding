// 1. 상세페이지 내용 불러오는 함수
// 2. getUrlData url데이터를 가져오는 함수


// 1. 상세페이지 내용 불러오는 함수
$(document).ready(function () {
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
            console.table(postInfoData);


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


//url 데이터를 가져오는 함수.
function getUrlData() {

    return location.href.substr(
        location.href.lastIndexOf('_') + 1
    );

}
