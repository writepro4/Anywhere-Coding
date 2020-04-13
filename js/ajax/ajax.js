// <--- 함수 리스트 --->
// 1. getToken 토근 가져오는 함수
// 2. nextPageData 카테고리 페이지에 데이터 넘기는 함수.
// 3. detailPage 상세페이지에 데이터 넘기는 함수.


// 1. 토근 가져오는 함수
function getToken(callback) {
    console.log("실행");

    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/csrf_token'
        , data: ''
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            console.log(data);
            // 콜백메소드로 토큰 값 반환
            $("#text").html(data);	// 전송받은 데이터와 전송 성공 여부를 보여줌.
            callback(data); // 받아온 csrf_token을 반환해주는 부분
            console.log("받아온 토큰값: " + data);
        }
        , error: function (xhr, status, msg) {
            console.log(xhr);
            console.log(status);
            console.log(msg);
            console.log("토큰 발행 실패");
        }
    });
}

// 2. 카테고리 페이지에 데이터 넘기는 함수.
function nextPageData(category) {
    let categoryData = category.id;
    //데이터 넘기는지 확인용도
    console.log(categoryData);
    window.location.href = `./category_page.html?index=${categoryData}`;

}

// 3. 상세페이지에 데이터 넘기는 함수.
function detailPage(page) {
    let detailPage = page.id;
    console.log(detailPage);
    // 카테고리 id 상세페이지 id 2개가 필요함
    window.location.href = `./details_page.html?index=${detailPage}`;
}






