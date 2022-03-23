$(document).ready(function() {
    $('#game-page').height($('#game-page').width())
    $('#game-page').css('min-height', 'unset');
});

$(window).resize(function() {
    $('#game-page').height($('#game-page').width())
});