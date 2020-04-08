// recent_list.js 메인페이지에서 최근 글 목록 6개 가져오는 리스트
$(document).ready(function () {


    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            //json 파싱하기
            let parseData = JSON.parse(data);
            console.log("데이터 파싱전: " + data);
            let keyCheck = parseData.key;

            console.log("데이터 성공여부 : " + keyCheck);

            // 요청값이 true일 경우에 실행
            if (keyCheck === true) {

                let postInfoData = parseData.postInfo;
                console.log(postInfoData);

                // key값도 배열에 포함되기 때문에 -1로 값을 맞춰줌
                let postingListData = postInfoData.length;

                console.log("받아온 데이터 확인: " + postingListData);


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

                    let categoryPostsID = category+"_"+indexPosts;

                    console.log(categoryPostsID);

                    console.log("아이디 값입니다.:" + indexPosts);

                    let html = `<div class="column" onclick="detailPage(this)" id=${indexPosts}>`;
                    html += `<div class="ui card">`;
                    html += `<div class="content">`;
                    html += `<div class="center aligned">`;
                    html += `${title}`;
                    html += `</div>`;
                    html += `</div>`;
                    html += `<a class="image">`;
                    html += `<img src=${titleImage} alt="image">`;
                    html += `</a>`;
                    html += `<div class="content">`;
                    html += `<i class="comment icon"></i>`;
                    html += `${subTitle}`;
                    html += `</div>`;
                    html += `</div>`;
                    html += `</div>`;

                    let cardView = `<div class="ui card" onclick="detailPage(this)" id=${categoryPostsID}>`;
                    cardView += `<div class="image">`;
                    cardView += `<img src=${titleImage}>`;
                    cardView += `</div>`;
                    cardView += `<div class="content">`;
                    cardView += `<div class="header">${title}</div>`;
                    cardView += `<div class="description">`;
                    cardView += `${subTitle}`;
                    cardView += `</div>`;
                    cardView += `</div>`;
                    cardView += `<div class="ui two bottom attached buttons">`;
                    // cardView += `<div class="ui button">`;
                    // cardView += `<i class="add icon"></i>`;
                    // cardView += `Queue`;
                    // cardView += `</div>`;
                    cardView += `<div class="ui olive button">`;
                    cardView += `<i class="play icon"></i>`;
                    cardView += `글 보기 `;
                    cardView += `</div>`;
                    cardView += `</div>`;
                    cardView += `</div>`;
                    cardView += `<div class="ui popup">`;
                    cardView += `<div class="header">User Rating</div>`;
                    cardView += `<div class="ui star rating" data-rating="3"></div>`;
                    cardView += `</div>`;


                    console.log("제목" + title);
                    console.log("날짜" + date);
                    console.log("타이틀 이미지" + titleImage);
                    console.log("글 아이디" + indexPosts);
                    console.log("관리자 아이디" + adminId);
                    console.log("글 내용" + contents);
                    console.log("조회수" + viewCount);
                    console.log("카테고리 종류" + category);
                    console.log("서브 제목" + subTitle);

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
