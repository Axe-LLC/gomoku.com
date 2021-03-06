var isStarted = false;

$(document).ready(function(){
    let w = $('#game-page').width();
    let full = $(window).height() - 180;
    if( w > full )
        $('#game-page').height(full);
    else
        $('#game-page').height($('#game-page').width());
    
    $('#game-page').css('min-height', 'unset');

    var game = new Game($(".go-board"), $(".board tbody"));
    var smallScreen = $(window).width()>768?false:true;

    var adjustSize = adjustSizeGen();

    $(window).resize(adjustSize);

    adjustSize();

    $('#newGame').width($('#startGame').width());

    $("#backdrop-over").hide();
    $('.player-status').hide();

    if( smallScreen )
        $('.controller').hide();
    // $.mobile.defaultDialogTransition = 'flip';
    // $.mobile.defaultPageTransition = 'flip';
    
    $('#mode-select input[type="radio"]').on('click', function(){
        gameData.mode=$(this).val();
        if( gameData.mode == 'vshuman' ) {
            $('#level-select input').attr('disabled', true);
            $('#level-select label').addClass('disabled');
            $('#pc-icon').removeClass('blue');
            $('#user-icon').addClass('blue');
            // $('.player-status').find('.pc-large-ico').removeClass('pc-large-ico').addClass('user-large-ico');
        } else {
            $('#level-select input').attr('disabled', false);
            $('#level-select label').removeClass('disabled');
            $('#pc-icon').addClass('blue');
            $('#user-icon').removeClass('blue');
            // if( gameData.color == 'white' ) {
            //     $('.player-status .first').find('.pc-large-ico').removeClass('pc-large-ico').addClass('user-large-ico');
            //     $('.player-status .second').find('.user-large-ico').removeClass('user-large-ico').addClass('pc-large-ico');
            // } else {
            //     $('.player-status .second').find('.pc-large-ico').removeClass('pc-large-ico').addClass('user-large-ico');
            //     $('.player-status .first').find('.user-large-ico').removeClass('user-large-ico').addClass('pc-large-ico');
            // }
        }
    });
    
    $('#mode-player input[type="radio"]').on('click', function(){
        gameData.color=$(this).val();
        // if( gameData.color == 'white' ) {
        //     $('.player-status .first').find('.pc-large-ico').removeClass('pc-large-ico').addClass('user-large-ico');
        //     $('.player-status .second').find('.user-large-ico').removeClass('user-large-ico').addClass('pc-large-ico');
        // } else {
        //     $('.player-status .second').find('.pc-large-ico').removeClass('pc-large-ico').addClass('user-large-ico');
        //     $('.player-status .first').find('.user-large-ico').removeClass('user-large-ico').addClass('pc-large-ico');
        // }
    });
    
    $('#level-select input[type="radio"]').on('change', function(){
        gameData.level=$(this).val();
    });

    $('#mode-boardsize input[type="radio"]').on('change', function(){
        gameData.boardsize=$(this).val();
        game = null;
        $(".go-board").html('');
        $(".board tbody").html('');
        game = new Game($(".go-board"), $(".board tbody"));

        adjustSize = adjustSizeGen();
        $(window).resize(adjustSize);
        adjustSize();
    });

    $('#mode-theme input[type="radio"]').on('change', function(){
        gameData.theme = $(this).val();
        $('#main-page').attr('class', 'theme-' + gameData.theme);
    });

    function gameInit() {
        try{
            game.white.worker.terminate();
            game.black.worker.terminate();
        }catch(e){}
        var color, other;
        if(gameData.color=='black'){
            color='black';
            other='white';
        }else{
            color='white';
            other='black';
        }
        if(gameData.mode==='vshuman'){
            game.mode='hvh';
            game.init(new HumanPlayer(color), new HumanPlayer(other));
        }else{
            game.mode=gameData.level;
            game.init(new HumanPlayer(color), new AIPlayer(game.mode, other));
        }
    }

    function gameInitSetting() {
        if (typeof gameData.mode === 'undefined') gameData.mode = 'vscomputer';
        if (typeof gameData.level === 'undefined') gameData.level = 'medium';
        if (typeof gameData.color === 'undefined') gameData.color = 'black';
        if (typeof gameData.theme === 'undefined') gameData.theme = 'classic';
        /* mode */
        $('#mode-select input[value="'+gameData.mode+'"]').attr('checked',true);
        $('#mode-select label').removeClass('selected');
        $('#mode-select input[value="'+gameData.mode+'"]').next().addClass('selected');

        if( gameData.mode == 'vshuman' ) {
            $('#level-select input').attr('disabled', true);
            $('#level-select label').addClass('disabled');
            $('#pc-icon').removeClass('blue');
            $('#user-icon').addClass('blue');
        } else {
            $('#pc-icon').addClass('blue');
            $('#user-icon').removeClass('blue');
        }

        /* level */
        $('#level-select input[value="'+gameData.level+'"]').attr('checked',true);
        $('#level-select label').removeClass('selected');
        $('#level-select input[value="'+gameData.level+'"]').next().addClass('selected');

        /* player */
        $('#mode-player input[value="'+gameData.color+'"]').attr('checked',true);
        $('#mode-player label').removeClass('selected');
        $('#mode-player input[value="'+gameData.color+'"]').next().addClass('selected');

        /* board size */
        // $('#mode-boardsize input[value="'+gameData.boardsize+'"]').attr('checked',true);
        // $('#mode-boardsize label').removeClass('selected');
        // $('#mode-boardsize input[value="'+gameData.boardsize+'"]').next().addClass('selected');

        /* theme */
        $('#mode-theme input[value="'+gameData.theme+'"]').attr('checked',true);
        $('#mode-theme label').removeClass('selected');
        $('#mode-theme input[value="'+gameData.theme+'"]').next().addClass('selected');

        $('#main-page').attr('class', 'theme-' + gameData.theme);

        // if( gameData.mode == 'vshuman' ) {
        //     $('.player-status .first').prepend('<span class="user-large-ico"></span>');
        //     $('.player-status .second').prepend('<span class="user-large-ico"></span>');
        // } else {
        //     if(gameData.color=='white') {
        //         $('.player-status .first').prepend('<span class="user-large-ico"></span>');
        //         $('.player-status .second').prepend('<span class="pc-large-ico"></span>');
        //     } else {
        //         $('.player-status .first').prepend('<span class="pc-large-ico"></span>');
        //         $('.player-status .second').prepend('<span class="user-large-ico"></span>');
        //     }
        // }
    }
    gameInitSetting();
    
    $("#startGame").on('click', function(){
        $("#backdrop-over").show();
        $("#undo-button").removeClass('disabled');
        $("#backdropgame-over").hide();
        $("#backdrop-topmenu").hide();
        $("#newGame").prop('disabled', false);
        isStarted = true;
        gameInit();
        game.start();
    });
    $('#startGame embed').on('click', function() {
        $("#startGame").trigger('click');
    });

    $("#newGame").on('click', function(){
        $("#backdrop-over").hide();
        $("#backdrop-topmenu").show();
        $("#backdropgame-over").show();
        $("#secondLoading").hide();
        $('#endLoading').hide();
        $("#firstLoading").show();
        $(this).prop('disabled', true);
        isStarted = false;
        gameInit();
    });

    $("#anotherNewGame").on('click', function(){
        $("#backdrop-over").hide();
        $("#backdrop-topmenu").show();
        $("#backdropgame-over").show();
        $(this).prop('disabled', true);
        isStarted = false;
        gameInit();
    });

    $('.close-popup').on('click', function() {
        $('#game-setting').hide('normal');
    });

    $("#mobileNewGame").on('click', function() {
        $('#game-setting').show('normal');
        $('body').addClass('overflow-hidden');
        $("#backdropgame-over").show();
        $('.player-status').hide();
        isStarted = false;
        gameInit();
    });

    $("#mobileStartGame").on('click', function() {
        $('.controller').show();
        $("#undo-button").removeClass('disabled');
        $('#game-setting').hide('normal');
        $('body').removeClass('overflow-hidden');
        $('#backdropgame-over').hide();
        $("#backdrop-topmenu").hide();
        $('.player-status').show();
        $("#newGame").prop('disabled', false);
        isStarted = true;
        gameInit();
        game.start();
    });

    $('.btn-closepopup').on('click', function() {
        var showText = 'You Lost';
        var isMobile = $(window).width()>768?false:true;
        if( isMobile ) {
            $('.player-status').show();
        }
        isStarted = false;

        if( game.mode == 'hvh' ) {
            if( game.getCurrentPlayer().color == 'white' ) {
                showText = "Player 1 Wins <embed src='images/top_ico2.svg' width='30px'><embed src='images/top_ico2.svg' width='30px'>";
            } else {
                showText = "Player 2 Wins <embed src='images/top_ico2.svg' width='30px'><embed src='images/top_ico2.svg' width='30px'>";
            }
            startConfetti();
        } else {
            if(game.getCurrentPlayer() instanceof HumanPlayer) {
                showText = "You Wins <embed src='images/top_ico2.svg' width='30px'><embed src='images/top_ico2.svg' width='30px'>";
                startConfetti();
            }
        }
        
        gameInfo.setText(showText);
        stopConfetti();
    });

    $(".btn-playagain").on('click', function() {
        stopConfetti();
        var isMobile = $(window).width()>768?false:true;
        if( isMobile ) {
            $("#mobileNewGame").trigger('click');
            $('.player-status').show();
        } else {
            $("#newGame").trigger('click');
        }
        // game.start();
    });

    $("#undo-button").on('click', function() {
        if( isStarted == false ) return false;
        $("#undo-button").removeClass('disabled');
        game.undo();
    });

    gameData.load();

    // setTimeout(function() {
    //     $("#startGame").trigger('click');
    // }, 100);

    window.gameInfo = (function(){
        var blinking = false,
            text = "",
            color = "";

        var self = {};

        self.getBlinking = function(){
            return blinking;
        };

        var mainObj = $("#game-info");
        self.setBlinking = function(val){
            if(val !== blinking){
                blinking = val;
                if(val){
                    mainObj.addClass("blinking");
                }else{
                    mainObj.removeClass("blinking");
                }
            }
        };

        self.getText = function(){
            return text;
        };

        var textObj = $("#game-info>.cont");
        self.setText = function(val){
            text = val;
            textObj.html(val);
        };

        self.getColor = function(){
            return color;
        };

        var colorObj = $("#game-info>.go");
        self.setColor = function(color){
            colorObj.removeClass("white").removeClass("black");
            if(color){
                colorObj.addClass(color);
            }
        };

        return self;
    })();
});

function showWinDialog(game){
    $("#undo-button").addClass('disabled');
    gameInfo.setBlinking(false);
    if( game.mode == 'hvh' ) {
        if( game.getCurrentPlayer().color == 'white' ) {
            $('#winTitle').html('Player 1 Wins <span class="white-tile"></span>');
            $('#winContent').html('Winner winner chicken dinner! Player 1 has won the<br /> game. Click the button below to start a new game.');
        } else {
            $('#winTitle').html('Player 2 Wins <span class="black-tile"></span>');
            $('#winContent').html('Winner winner chicken dinner! Player 2 has won the<br /> game. Click the button below to start a new game.');
        }
        startConfetti();
    } else {
        if(game.getCurrentPlayer() instanceof HumanPlayer) {
            $('#winTitle').html('You Win!!');
            $('#winContent').html('Winner winner chicken dinner! Congrats on your win. Click the button below to start a new game.');
            startConfetti();
        } else {
            $('#winTitle').html('You Lost');
            $('#winContent').html('You lost. If the AI level was too difficult go down a notch or check our tips and trick to win!');
        }
    }
    $('#resultModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

$(window).resize(function() {
    $('#newGame').width($('#startGame').width());
    adjustSizeGen();
    var smallScreen = $(window).width()>768?false:true;
    if( smallScreen === false ) {
        $('#game-setting').show();
        $('.controller').show();
        $('.player-status').hide();
        if( isStarted === true ) {
            $('#backdrop-over').show();
        } else {
            $('#backdrop-over').hide();
            $('#backdrop-topmenu').show();
        }
    } else {
        if( isStarted === false ) {
            $('.controller').hide();
        } else {
            $('#game-setting').hide();
            $('.player-status').css('display', 'flex');
        }
        // $('#game-setting').hide();
        $('#backdrop-over').hide();
    }
});