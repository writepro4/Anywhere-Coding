// 무한 스크롤 스크립트
$(document).ready(function() {
    // testAjax();
    // document height
    // 문서 전체의 높이를 의미합니다.
    // window height
    // 화면의 높이를 의미합니다.
    // scroll top
    // 스크롤의 top이 위치하고 있는 높이를 의미합니다.
    if ($("body").height() < $(window).height()) {
        // alert("There isn't a vertical scroll bar");
    }

    $(window).scroll(function() {
        // 맨 밑으로 스크롤이 갔을경우 if문을 탑니다.
        //스크롤의 탑이 위치하고 있는 높이를 의미한다.
        //문서 전체의 높이와 화면의 높이를 뺀값이 이거와 일치하면?
        console.log("스크롤값" + window.scrollY);
        console.log("도큐먼트값" + $(`body`).height());

        function getCurrentScrollPercentage() {
            return (window.scrollY / $("body").height()) * 100;
        }

        var currentScrollPercentage = getCurrentScrollPercentage();
        // console.log(currentScrollPercentage);
        if (currentScrollPercentage > 57) {

            curPage++; // 현재 페이지에서 +1 처리.
            // console.log("인피니티실행중");
            // console.log(curPage);

            testAjax(); //ajax 호출
            ////업데이트
        }



        //스크롤 탑은 유동적으로 변함 .
        // scrollTop + windowHeight + 30 > documentHeight $(window).height()
        // console.log("문서높이"+$(document).height());
        // console.log("드래그 높이"+$(window).scrollTop());
        // console.log("윈도우 창 높이"+$(window).height());
        // if ($(document).height()+950 <= $(window).scrollTop() + $(window).height()) {
        //   curPage++; // 현재 페이지에서 +1 처리.
        //   console.log(curPage);
        //
        //   testAjax(); //ajax 호출
        // }
    });
});
