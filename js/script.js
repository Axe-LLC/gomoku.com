$(document).ready(function() {
    $('.btn-group label').on('click', function() {
        $(this).parent().find('label').removeClass('selected');
        $(this).addClass('selected');
    });
    $("#level-select label").on('click', function() {
        if( $(this).hasClass('disabled') ) return false;
        $(this).parent().find('label').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".coming-soon .close").on('click', function() {
        $(".coming-soon").fadeOut();
    });
    $(".privacy .close").on('click', function() {
        $(".privacy").fadeOut();
    });

    $("#resetGame").on('click', function() {
        $("#playerLabel").trigger('click');
        $("#orderLabel").trigger('click');
        $("#boardSizeLabel").trigger('click');
        $("#themeLabel").trigger('click');
        $('#level-select input').attr('disabled', false);
        $('#level-select label').removeClass('disabled');
        $("#diffLabel").trigger('click');
    });

    $('#full-screen').on('click', function() {
        document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
    });
});

$(window).resize(function() {
    let w = $('#game-page').width();
    let full = $(window).height() - 280;
    if( w > full )
        $('#game-page').height(full);
    else
        $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');
});