//페이지가 로드되면 실행한다.

$(document).ready(function () {

    $("#header").load("header.html");
    $("#footer").load("footer.html");

    //~이렇게 한줄만 해주면 알아서 contents에 testContents.html파일을 넣어 준다.

});