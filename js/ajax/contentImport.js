// 수정할 내용을 불러오는 함수
$(document).ready(function () {

    const urlData = getUrlData();

    $.ajax({
        url: `https://honeytip.p-e.kr/posts/${urlData}/edit`,
        type: "get",
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            // //console.log(data);
            //json 파싱하기
            const parseData = JSON.parse(data);

            const keyCheck = parseData.key;
            const postInfo = parseData.postInfo;

            const name = postInfo.title;
            const category = postInfo.category;
            const contents = postInfo.contents;
            const image = postInfo.image;
            const subTitle = postInfo.subTitle;

            //console.table(postInfo);

            $(`#category`).val(category);
            $(`#title`).val(name);
            // $(`#questImage`).val(image);
            $(`#subTitle`).val(subTitle);
            // $('textarea[name="content"]').val($('#summernote').summernote(`${contents}`));
            $('textarea[name="content"]').summernote('code', `${contents}`);


        }
    });

});

//url 데이터를 가져오는 함수.
function getUrlData() {

    return location.href.substr(
        location.href.lastIndexOf('=') + 1
    );

}
