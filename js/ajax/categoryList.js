// categoryList 카테고리 목록 불어오는 함수
$(document).ready(function () {

    const categoryNumber = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );

    //페이징 처리를 하기 위한 변수
    let counting = 1;


    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts/' + categoryNumber + '/1'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            //json 파싱하기
            let parseData = JSON.parse(data);
            console.log("데이터 파싱전: " + data);
            let keyCheck = parseData.key;
            console.log("데이터 성공여부 : " + keyCheck);

            if (keyCheck === true) {

                let postInfoData = parseData.contents;

                let postingListData = postInfoData.length;

                console.log("객체 상태 보기 : "+ postInfoData);


                for (let i = 0; i < postingListData; i++) {
                    console.log("for문 실행중");

                    let title = postInfoData[i].title;
                    let titleImage = postInfoData[i].image;
                    let subTitle = postInfoData[i].sub_title;
                    let indexPosts = postInfoData[i].index_posts;
                    let adminId = postInfoData[i].admin_id;
                    let contents = postInfoData[i].contents;
                    let viewCount = postInfoData[i].view_count;
                    let category = postInfoData[i].category;
                    let date = postInfoData[i].date;

                    let html = '<div class="item">';
                    html += '<div class="image">';
                    html += '<img src="' + postInfoData[i].image + '" alt="image">';
                    html += '</div>';
                    html += '<div class="content">';
                    html += '<a class="header">' + postInfoData[i].title + '</a>';
                    html += '<div class="meta">';
                    html += '<span>' + postInfoData[i].subTitle + '</span>';
                    html += '</div>';
                    html += '<div class="description">';
                    html += '<p></p>';
                    html += '</div>';
                    html += '<div class="extra">';
                    html += postInfoData[i].date;
                    html += ' </div>';
                    html += '</div>';
                    html += '</div>';


                    console.log("제목" + title);
                    console.log("날짜" + date);
                    console.log("타이틀 이미지" + titleImage);
                    console.log("글 아이디" + indexPosts);
                    console.log("관리자 아이디" + adminId);
                    console.log("글 내용" + contents);
                    console.log("조회수" + viewCount);
                    console.log("카테고리 종류" + category);
                    console.log("서브 제목" + subTitle);


                    $('#iterate').append(html);


                }

                //카테고리 제목란에 추가할 데이터
                let categoryTitle =  `<br>`;
                categoryTitle +=  `<h1 class="ui header center aligned">${categoryNumber}</h1>`;

                $('#categoryTitle').append(categoryTitle);


                // 받아온 값이 false경우 빈페이지를 띄워줌
            } else {

                let blankPageData = '<div class="ui placeholder segment">';
                blankPageData += '<div class="ui icon header">';
                blankPageData += '<i class="dont icon"></i>';
                blankPageData += '빈페이지에요 ㅠㅠ ';
                blankPageData += '</div>';
                blankPageData += '<div class="ui primary button">버튼</div>';
                blankPageData += '</div>';


                $('#iterate').append(blankPageData);

                //카테고리 제목란에 추가할 데이터
                let categoryTitle =  `<br>`;
                categoryTitle +=  `<h1 class="ui header center aligned">${categoryNumber}</h1>`;
                $('#categoryTitle').append(categoryTitle);
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
