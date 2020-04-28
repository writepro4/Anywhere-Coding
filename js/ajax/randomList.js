// recent_list.js 상세페이지에서 랜덤 목록 6개 출력하는 함수

$(document).ready(function () {

    // URL : [ GET 요청] https://honeytip.p-e.kr/recommendation/list/{postNum}
    // <- {} 내부는 유저가 보고 있는
    // 글 번호입니다. 추천목록에 유저가 보고있는 글이 추천되면
    // 이상하니까 포함됨 그리고 날짜와 관계없이 랜덤으로 글 추천되도록 했음


    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            let parseData = JSON.parse(data);


            let keyCheck = parseData.key;


            if (keyCheck === true) {

                let postInfoData = parseData.postInfo;

                let postingListData = postInfoData.length;
                console.table(postInfoData);
                console.log(postInfoData);


                for (let i = 0; i < postingListData; i++) {

                    console.log("for문 실행중");


                    //제목
                    let {indexPosts} = postInfoData[i];
                    let {image} = postInfoData[i];
                    let {subTitle} = postInfoData[i];
                    let {index} = postInfoData[i];
                    let {title} = postInfoData[i];
                    let {likeIt} = postInfoData[i];
                    let {commentsCount} = postInfoData[i];
                    let {category} = postInfoData[i];

                    let categoryPostsID = category + "_" + indexPosts;


                    let cardView = `<a class="ui card" onclick="detailPage(this)" id=${categoryPostsID}>`;
                    cardView += `<div class="image">`;
                    cardView += `<img src=${image} style="height: 120px;">`;
                    cardView += `</div>`;
                    cardView += `<div class="content">`;
                    cardView += `<div class="header">${title}</div>`;
                    cardView += `<div class="description">`;
                    cardView += `${subTitle}`;
                    cardView += `</div>`;
                    cardView += `</div>`;
                    cardView += `<div class="extra two column content" style="font-weight: 700">`;
                    cardView += `<i class="like red icon"></i>`;
                    cardView += `좋아요${likeIt} &nbsp;&nbsp;&nbsp;`;
                    cardView += `<i class="comments white icon"></i>`;
                    cardView += `댓글${commentsCount}`;
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