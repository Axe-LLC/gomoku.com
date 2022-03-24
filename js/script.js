$(document).ready(function() {
    $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');

    $(".btn-group label").on('click', function() {
        $(this).parent().find('label').removeClass('selected');
        $(this).addClass('selected');
    });
});

$(window).resize(function() {
    $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');
});