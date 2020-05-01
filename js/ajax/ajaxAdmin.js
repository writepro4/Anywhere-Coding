// 변수명은 메소드명은 낙타로 통일하기

// <--- 함수 리스트 --->
// 1. getToken 토근 가져오는 함수
// 2. adminLogin 관리자로그인 데이터 전송 함수
// 3. login 관리자로그인 요청 함수 (1,2번 함수를 같이 실행한다.)
// 4. imageUpload 글 등록 함수
// 5. postForm 썸머노트 내용 가져오는 함수
// 6. writinglist 글 상세 내용 불러오는 함수
// 7. writingDelete 글 삭제 시키는 함수
// 8. writingFix 관리자 글 수정 함수
// 9. preview 관리자 글 등록시 미리보기 기능 함수
// 10. getArticleList 카테고리 목록 리스트 가져오는 함수
// 11. contentImport 관리자 글 수정시에 내용 불러오는 함수.
// 12. nextPageData 수정 페이지에 url 데이터 전달하는 함수.
// 13. 수정된 썸머노트 내용 가져오는 함수
// 14. buttonEvent 버튼 이벤트(수정,삭제) 함수.


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

// 2. 관리자로그인 데이터 전송 함수
function adminLogin(token) {

    let adminId = $('#email').val();
    let adminPw = $('#password').val();

    //데이터 전송 예제
    let login_data = {
        '_token': token, //이부분에서 '_token'이라는 key로 csrf_token값을 전달해 주어야 한다
        'id': adminId,
        'pw': adminPw
    };
    console.log(login_data);

    $.ajax({
        type: 'post'
        , url: 'https://honeytip.p-e.kr/login'
        , data: login_data
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            $("#text2").html(data);	// 전송받은 데이터와 전송 성공 여부를 보여줌.
            //json 해체
            let parseData = JSON.parse(data);
            //위의 코드 없으면 문자형
            console.log(parseData);
            console.log("전송 성공");
            let check = parseData.key;
            console.log(check);
            if (check === true) {
                window.location.replace("./administrator_page.html");
            } else {
                alert("로그인 실패");
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

// 3. 관리자로그인 요청 함수
function login() {
    getToken(function (token) {
        adminLogin(token)
    })
}

// 4. 글 등록 함수
//이미지 업로드가 먼저 실행되고 서버로부터 이미지 url 주소를 반환받으면,
//그 다음에 썸머노트에 작성한 내용을 가져오는 아래의 postForm함수를 실행시키고, 정보를 종합해 서버에 보내줌.
function imageUpload() {
    //누르자마자 썸머노트 내용 저장
    let summer = postForm();

    let imageForm = document.getElementById('image-form');
    let formData = new FormData(imageForm);

    let file = $('input[type="file"]').val().trim();

    if (!file) {
        console.log("이미지를 선택해주세요.");
        alert("이미지를 선택하세요");
    } else {
        $.ajax({
            url: "https://honeytip.p-e.kr/posts/image",
            type: "post",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log("이미지 등록 완료!");

                //썸머노트 내용 주석
                console.log("내용" + summer);

                let image = data;
                console.table(data);


                let title = $('#title').val();
                let category = $('#category').val();
                let adminId = "관리자입니다.";
                let subTitle = $('#subTitle').val();


                console.log("제목" + title);
                console.log("카테고리" + category);
                console.log("관리자아이디" + adminId);
                console.log("부제목" + subTitle);
                console.log("썸머노트 내용" + summer);


                //JSON 더미데이터로 필요한 정보 넣어줌
                let postsData = {
                    'image': image,
                    'title': title,
                    'category': category,
                    'contents': summer,
                    'adminId': adminId,
                    'subTitle': subTitle
                };

                //이미지 파일이 업로드되면 다시 필요한 정보들을 보내줌
                $.post("https://honeytip.p-e.kr/posts",
                    postsData, // 서버가 필요한 정보를 같이 보냄.
                    function (data, status) {
                        let successCheck = JSON.parse(data); // JSON 형식의 문자열을 자바스크립트 객체로 변환함.
                        let keyCheck = successCheck.key;
                        const {postNum: number} = successCheck;
                        const pageNumber = category + `_` + number;
                        if (keyCheck === true) {
                            console.log("포스트 넘버 확인 : " + pageNumber);
                            // const idCreate = `<div id="${number}"></div>`;
                            detailPage(pageNumber);
                        } else {
                            alert("실패!");
                        }
                        console.log("이미지 요청 상태 : " + status);

                    }
                );
            }
        });
    }
}

// 5. 썸머노트 내용 가져오는 함수
function postForm() {
    let bar = $('textarea[name="content"]').val($('#summernote').summernote('code'));
    console.log(bar.val());
    return bar.val();
}

// 6. 글 상세 내용 불러오는 함수
function writinglist() {

    $.ajax({
        type: 'get'
        , url: 'https://honeytip.p-e.kr/posts/8'
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {
            //json 파싱하기
            let parseData = JSON.parse(data);
            let keyCheck = parseData.key;

            let postInfo = parseData.postInfo;

            let title = postInfo.title;
            let content = postInfo.contents;
            let date = postInfo.date;
            let viewCounts = postInfo.viewCounts;

            console.log("key" + keyCheck);
            console.log("제목" + title);
            console.log("내용" + content);
            console.log("날짜" + date);
            console.log("본 횃수" + viewCounts);


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

// 7. writingDelete 글 삭제 시키는 함수
function writingDelete(idData) {

    if (buttonEvent() === true) {

        const itemNumber = idData.id;

        let form = new FormData();
        form.append("_method", "DELETE");

        $.ajax({
            type: 'post'
            , data: form
            , processData: false
            , contentType: false
            , url: `https://honeytip.p-e.kr/posts/${itemNumber}`
            , xhrFields: {
                withCredentials: false
            }
            , success: function (data) {
                //json 파싱하기
                let parseData = JSON.parse(data);
                let datakey = parseData.key;
                console.log("성공여부" + datakey);
                $(`#item${itemNumber}`).remove();

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

    } else {

    }
}

// 8. writingFix 관리자 글 수정 함수
function writingFix() {

    const fixItemNumber = getUrlData();

    //누르자마자 썸머노트 내용 저장
    const summer = fixPostForm();

    let imageForm = document.getElementById('image-form');

    console.log("이미지 폼 데이터 : " + imageForm);

    let formData = new FormData(imageForm);

    // 이미지 미리보기 변수
    let file = $('input[type="file"]').val().trim();


    if (!file) {
        console.log("대표 이미지 변경안함.");


        //썸머노트 내용 주석
        console.log("내용" + summer);

        const image = $('#imageimage').val();
        console.log("이미지 데이터: " + image);


        let title = $('#title').val();
        let category = $('#category').val();
        let adminId = "관리자입니다.";
        let subTitle = $('#subTitle').val();


        console.log("제목" + title);
        console.log("카테고리" + category);
        console.log("관리자아이디" + adminId);
        console.log("부제목" + subTitle);
        console.log("썸머노트 내용" + summer);


        let form = new FormData();
        form.append("_method", "PATCH");
        form.append("title", title);
        form.append("category", category);
        form.append("image", false);
        form.append("contents", summer);
        form.append("subTitle", subTitle);

        console.log("보내는 데이터: " + form);

        // 이미지와 함께 수정된 데이터 보내줌
        $.ajax({
            type: 'post'
            , url: `https://honeytip.p-e.kr/posts/${fixItemNumber}`
            , data: form
            , processData: false
            , contentType: false
            , xhrFields: {
                withCredentials: false
            }
            , success: function (data) {
                //json 파싱하기
                let parseData = JSON.parse(data);
                let keyCheck = parseData.key;

                const pageNumber = `_` + getUrlData();

                console.log("수정완료 : ");
                // detailPage(pageNumber);


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


    } else {

        $.ajax({
            url: "https://honeytip.p-e.kr/posts/image",
            type: "post",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log("이미지 등록 완료!");

                //썸머노트 내용 주석
                console.log("내용" + summer);

                let image = data;
                console.log(data);


                let title = $('#title').val();
                let category = $('#category').val();
                let adminId = "관리자입니다.";
                let subTitle = $('#subTitle').val();


                console.log("제목" + title);
                console.log("카테고리" + category);
                console.log("관리자아이디" + adminId);
                console.log("부제목" + subTitle);
                console.log("썸머노트 내용" + summer);


                //JSON 더미데이터로 필요한 정보 넣어줌
                let postsData = {
                    'image': image,
                    'title': title,
                    'category': category,
                    'contents': summer,
                    'adminId': adminId,
                    'subTitle': subTitle
                };

                let form = new FormData();
                form.append("_method", "PATCH");
                form.append("title", title);
                form.append("category", category);
                form.append("image", image);
                form.append("contents", summer);
                form.append("subTitle", subTitle);

                console.log("보내는 데이터: " + form);

                // 이미지와 함께 수정된 데이터 보내줌
                $.ajax({
                    type: 'post'
                    , url: `https://honeytip.p-e.kr/posts/${fixItemNumber}`
                    , data: form
                    , processData: false
                    , contentType: false
                    , xhrFields: {
                        withCredentials: false
                    }
                    , success: function (data) {
                        //json 파싱하기
                        let parseData = JSON.parse(data);
                        let keyCheck = parseData.key;

                        const pageNumber = `_` + getUrlData();

                        console.log("수정완료 : ");
                        detailPage(pageNumber);


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
        });

    }


}

// 9. preview 관리자 글 등록시 미리보기 기능 함수
function preview() {
    //테스트 깃허브

}

// 10. 카테고리 목록 리스트 가져오는 함수
function getArticleList() {

    const categoryData = $('#seleteData').val();


    $.ajax({
        type: 'get'
        , url: `https://honeytip.p-e.kr/posts/${categoryData}/all`
        , xhrFields: {
            withCredentials: false
        }
        , success: function (data) {

            console.log("데이터 출력 ");

            //json 파싱하기
            let parseData = JSON.parse(data);
            console.log("데이터 파싱전: " + data);
            let keyCheck = parseData.key;
            console.log("데이터 성공여부 : " + keyCheck);

            $(`#itemList`).remove();

            const listdata = `<div class="ui divided items" id="itemList"> </div>`;
            $(`#itemListParent`).append(listdata);

            let postInfoData = parseData.contents;

            let postingListData = postInfoData.length;

            console.log("받아온 데이터 확인: " + postingListData);

            for (let i = 0; i < postingListData; i++) {


                let title = postInfoData[i].title;
                let titleImage = postInfoData[i].image;
                let subTitle = postInfoData[i].sub_title;
                let adminId = postInfoData[i].admin_id;
                let contents = postInfoData[i].contents;
                let viewCount = postInfoData[i].view_count;
                let category = postInfoData[i].category;
                let date = postInfoData[i].date;
                let indexPosts = postInfoData[i].indexPosts;

                // 백엔드 : contents 내부 값들 글 제목 title,
                //     대표이미지 image ,
                //     부 제목(설명) subTitle ,
                //     날짜 date ,
                //     글 번호 indexPosts

                let html = `<div class="item" id=item${indexPosts}>`;
                html += `<div class="image">`;
                html += `<img src=${titleImage} alt="image" style="height: 130px;">`;
                html += `</div>`;
                html += `<div class="content">`;
                html += `<a class="header">${title}</a>`;
                html += `<div class="meta">`;
                html += `<span>${date}</span>`;
                html += `</div>`;
                html += `<div class="description">`;
                html += `<p></p>`;
                html += `</div>`;
                html += `<div class="extra">`;
                html += `${category}`;
                html += `</div>`;
                html += `<div class="extra">`;
                html += `<div class="ui blue right floated button" onclick="nextPageData(this)" id=${indexPosts}>`;
                html += `수정`;
                html += `</div>`;
                html += `<div class="ui red right floated button" onclick="writingDelete(this)" id=${indexPosts}>`;
                html += `삭제`;
                html += `</div>`;
                html += `</div>`;
                html += `</div>`;
                html += `</div>`;

                $('#itemList').append(html);


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

// 11. contentImport 관리자 글 수정시에 내용 불러오는 함수.
function contentImport(checkPage) {

    // 관리자 글 수정페이지 접근시  작성했던 글데이터 가져오기 (edited)
    // 3:29
    // (get) https://honeytip.p-e.kr/posts/{index}/edit < - {index} = 글 번호
    //     클라이언트 : x
    // 백엔드 :  {key: true/false, postInfo : array} (edited)

    $.ajax({
        url: `https://honeytip.p-e.kr/posts/${pageNumber}/edit`,
        type: "get",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            console.log("이미지 등록 완료!");

            //썸머노트 내용 주석
            console.log("내용" + summer);

            let image = data;
            console.log(data);


            let title = $('#title').val();
            let category = $('#category').val();
            let adminId = "관리자입니다.";
            let subTitle = $('#subTitle').val();


            console.log("제목" + title);
            console.log("카테고리" + category);
            console.log("관리자아이디" + adminId);
            console.log("부제목" + subTitle);
            console.log("썸머노트 내용" + summer);


            //JSON 더미데이터로 필요한 정보 넣어줌
            let postsData = {
                'image': image,
                'title': title,
                'category': category,
                'contents': summer,
                'adminId': adminId,
                'subTitle': subTitle
            };

            //이미지 파일이 업로드되면 다시 필요한 정보들을 보내줌
            $.post("https://honeytip.p-e.kr/posts",
                postsData, // 서버가 필요한 정보를 같이 보냄.
                function (data, status) {
                    let successCheck = JSON.parse(data); // JSON 형식의 문자열을 자바스크립트 객체로 변환함.
                    let keyCheck = successCheck.key;
                    if (keyCheck === true) {
                        alert("성공!");
                        // window.location.replace("./preview_contents.html");
                    } else {
                        alert("실패!");
                    }
                    console.log("이미지 요청 상태 : " + status);

                }
            );
        }
    });

}

// 12. nextPageData 수정 페이지에 url 데이터 전달하는 함수.
function nextPageData(category) {

    let categoryData = category.id;
    //데이터 넘기는지 확인용도
    console.log(categoryData);
    window.location.href = `./administrator_fixpage.html?index=${categoryData}`;

}

// 13. 수정된 썸머노트 내용 가져오는 함수
function fixPostForm() {
    let bar = $('textarea[name="content"]').val($('#summernote').summernote('code'));
    console.log(bar.val());
    return bar.val();
}

// 14. buttonEvent 버튼 이벤트(수정,삭제) 함수.
function buttonEvent() {
    return confirm("정말 실행하시겠습니까??") === true;
}

