$(document).ready(function () {
    $('#menu').click(function () {
        $('.ui.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
    })
});