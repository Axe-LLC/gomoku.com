$(document).ready(function() {
    $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');

    $(".btn-group label").on('click', function() {
        $(this).parent().find('label').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".coming-soon .close").on('click', function() {
        $(".coming-soon").fadeOut();
    });

    $("#resetGame").on('click', function() {
        $("#playerLabel").trigger('click');
        $("#orderLabel").trigger('click');
        $("#boardSizeLabel").trigger('click');
        $("#themeLabel").trigger('click');
    });
});

$(window).resize(function() {
    $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');
});