// recent_list.js 메인페이지에서 최근 글 목록 6개 가져오는 리스트
$(document).ready(function () {


    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;


            // 요청값이 true일 경우에 실행
            if (keyCheck === true) {

                let postInfoData = parseData.postInfo;

                // key값도 배열에 포함되기 때문에 -1로 값을 맞춰줌
                let postingListData = postInfoData.length;


                for (let i = 0; i < postingListData; i++) {
                    console.log("for문 실행중");

                    let title = postInfoData[i].title;
                    let titleImage = postInfoData[i].image;
                    let subTitle = postInfoData[i].subTitle;
                    let indexPosts = postInfoData[i].indexPosts;
                    let adminId = postInfoData[i].adminId;
                    let contents = postInfoData[i].contents;
                    let viewCount = postInfoData[i].viewCount;
                    let category = postInfoData[i].category;
                    let date = postInfoData[i].date;

                    let categoryPostsID = category + "_" + indexPosts;


                    let cardView = `<a class="ui card" onclick="detailPage(this)" id=${categoryPostsID}>`;
                    cardView += `<div class="image">`;
                    cardView += `<img src=${titleImage} style="height: 120px;">`;
                    cardView += `</div>`;
                    cardView += `<div class="content">`;
                    cardView += `<div class="header">${title}</div>`;
                    cardView += `<div class="description">`;
                    cardView += `${subTitle}`;
                    cardView += `</div>`;
                    cardView += `</div>`;
                    // cardView += `<div class="ui two bottom attached buttons">`;
                    // cardView += `<div class="ui olive button">`;
                    // cardView += `<i class="comments icon"></i>`;
                    // cardView += `댓글`;
                    // cardView += `</div>`;
                    // cardView += `<div class="ui button">`;
                    // cardView += `<i class="gift icon"></i>`;
                    // cardView += `글 보기 `;
                    // cardView += `</div>`;
                    // cardView += `</div>`;
                    // cardView += `</div>`;
                    // cardView += `<div class="ui popup">`;
                    // cardView += `<div class="header">User Rating</div>`;
                    // cardView += `<div class="ui star rating" data-rating="3"></div>`;
                    cardView += `<div class="extra content">`;
                    cardView += `<i class="check icon"></i>`;
                    cardView += `새로운 글`;
                    cardView += `</div>`;
                    cardView += `</a>`;


                    $('#grid').append(cardView);
                    $('#detailGrid').append(cardView);

                }


                // 받아온 값이 false경우 빈페이지를 띄워줌
            } else {

                let blankPageData = '<div class="ui placeholder segment">';
                blankPageData += '<div class="ui icon header">';
                blankPageData += '<i class="dont icon"></i>';
                blankPageData += '빈페이지에요 ㅠㅠ ';
                blankPageData += '</div>';
                blankPageData += '<div class="ui primary button">버튼</div>';
                blankPageData += '</div>';


                $('#grid').append(blankPageData);
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
