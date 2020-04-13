//semantic ui rating 함수
$(document).ready(function(){

    //retrieve the data from server
    let ratingNumber = 2;

    //Initilize the rating and get the rate
    $('.ui.rating').rating({
        initialRating: ratingNumber,
        maxRating: 5,
        onRate: function(rating){
            console.log(rating);
        }
    });
});