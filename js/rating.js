
$('.ui.rating').rating({
    initialRating: 0,
    maxRating: 3,
    clearable: true,
    onRate: function(value) {
        console.log('value set to:' + value);
    },

});