// 1. categoryListRequest 카테고리 목록 불어오는 함수
// 2. 인피니티 스크롤 함수 .
// 3. categoryURL 카테고리 번호 가져오는 함수
// 4.  categoryConversion 어떤 카테고리인지 한글로 변환하고 제목에 추가하는 함수.


// 1. categoryListRequest 카테고리 목록 불어오는 함수
function categoryListRequest(pageing) {

    let categoryNumber = categoryURL();

    // 페이징할 번호 변수
    let pageNumber = pageing;

    //한글은 url에서 가져올시에 깨지기 때문에 한번 변환작업을 시켜준다.

    categoryConversion(categoryNumber);

    //페이징 처리를 하기 위한 변수
    let counting = 1;

    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts/' + categoryNumber + `/${pageNumber}`
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

                console.log("받아온 데이터 목록 : " + postInfoData);

                let postingListData = postInfoData.length;

                console.log("객체 상태 보기 : " + postInfoData);


                for (let i = 0; i < postingListData; i++) {
                    console.log("for문 실행중");


                    let title = postInfoData[i].title;
                    let titleImage = postInfoData[i].image;
                    let subTitle = postInfoData[i].subTitle;
                    let indexPosts = postInfoData[i].indexPosts;
                    let date = postInfoData[i].date;

                    //카테고리와 상세페이지번호 합친 변수.
                    let categoryPostsID = categoryNumber + "_" + indexPosts;


                    let categoryitem = `<div class="item" onclick="detailPage(this)" id="${categoryPostsID}">`;
                    categoryitem += `<div class="image">`;
                    categoryitem += `<img src=${titleImage} alt="image">`;
                    categoryitem += `</div>`;
                    categoryitem += `<div class="content">`;
                    categoryitem += `<a class="header">${title}</a>`;
                    categoryitem += `<div class="meta">`;
                    categoryitem += `<span class="cinema">${subTitle}</span>`;
                    categoryitem += `</div>`;
                    categoryitem += `<div class="meta">`;
                    categoryitem += `<span class="cinema">${date}</span>`;
                    categoryitem += `</div>`;
                    categoryitem += `<div class="description">`;
                    categoryitem += `<p></p>`;
                    categoryitem += `</div>`;
                    categoryitem += `<div class="extra">`;
                    categoryitem += `<div class="ui right floated primary button"><i class="gift icon"></i>`;
                    categoryitem += `꿀팁 얻기`;
                    categoryitem += `<i class="right chevron icon"></i>`;
                    categoryitem += `</div>`;
                    categoryitem += `<div class="ui label">생산성</div>`;
                    categoryitem += `</div>`;
                    categoryitem += `</div>`;
                    categoryitem += `</div>`;


                    console.log("제목" + title);
                    console.log("날짜" + date);
                    console.log("타이틀 이미지" + titleImage);
                    console.log("글 아이디" + indexPosts);
                    console.log("서브 제목" + subTitle);


                    $('#iterate').append(categoryitem);


                }

                // 받아온 값이 false경우 빈페이지를 띄워줌
            } else if (pageNumber > 1) {
                console.log("마지막 문단 입니다.");

            } else {

                let blankPageData = '<div class="ui placeholder segment">';
                blankPageData += '<div class="ui icon header">';
                blankPageData += '<i class="dont icon"></i>';
                blankPageData += '<br>';
                blankPageData += '아직 정보가 없습니다. ';
                blankPageData += '<br><br>';
                blankPageData += '<p>업데이트 예정. </p>';
                blankPageData += '</div>';
                blankPageData += '<a href="./index.html"><div class="ui primary button">메인으로</div></a>';
                blankPageData += '</div>';


                $('#iterate').append(blankPageData);


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
}


// 2. 인피니티 스크롤 함수 .
let page = 1;
$(document).ready(function () {
    // ajax로 불러올 데이터 함수 먼저 실행
    categoryListRequest(page);
    $(window).scroll(function () {
        console.log("마우스 높이 : " + Math.ceil($(window).scrollTop()));
        console.log("문서 높이 : " + parseInt($(document).height() - $(window).height()));
        if (Math.ceil($(window).scrollTop()) === $(document).height() - $(window).height()) {
            // 스크롤 위치가 문서 하단에 위치할경우 원하는 함수 호출
            page++;
            console.log("호출한 번호 : " + page);
            categoryListRequest(page);
        }
    });
});


// 3. categoryURL 카테고리 번호 가져오는 함수
function categoryURL() {

    return location.href.substr(
        location.href.lastIndexOf('=') + 1
    );

}

// 4.  categoryConversion 어떤 카테고리인지 한글로 변환하고 제목에 추가하는 함수.
// 제목을 한번만 붙이기 위한 변수
let titleCheck = false;

function categoryConversion(categoryData) {
    // 제목을 한번만 붙이기 위한 변수
    if (categoryData.toString() === "productivity" && titleCheck === false) {
        titleCheck = true;
        //카테고리 제목란에 추가할 데이터
        let categoryTitle = `<br>`;
        categoryTitle += `<h1 class="ui header center aligned">생산성</h1>`;

        console.log("카테고리 넘버 확인 : " + categoryData);

        $('#categoryTitle').append(categoryTitle);
    } else if (titleCheck === false) {
        titleCheck = true;
        let categoryTitle = `<br>`;
        categoryTitle += `<h1 class="ui header center aligned">독해력</h1>`;

        $('#categoryTitle').append(categoryTitle);
    }

}


// 비동기 작업 구현하기 promise
//
// function async1 () {
//     console.log("처음으로 실행합니다.");
//     return Promise.resolve();
// }
// function async2 () {
//     console.log("두번째 실행");
//     return Promise.resolve();
// }
// function async3 () {
//     console.log("세번째 실행 ");
//     return Promise.resolve();
// }
//
// async1()
//     .then(async2)
//     .then(async3);


