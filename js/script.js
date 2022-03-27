$(document).ready(function() {
    $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');

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
        $('#resultModal').modal({
            keyboard: false
        })
    });

    $('#full-screen').on('click', function() {
        document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
    });
});

$(window).resize(function() {
    $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');
});