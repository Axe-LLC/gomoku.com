$(document).ready(function(){
    let w = $('#game-page').width();
    let full = $(window).height() - 120;
    if( w > full )
        $('#game-page').height(full);
    else
        $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');

    $("#backdrop-over").hide();

    var game = new Game($(".go-board"), $(".board tbody"));
    var smallScreen = $(window).width()>768?false:true;

    if( smallScreen )
        $('.controller').hide();

    var adjustSize = adjustSizeGen();

    $(window).resize(adjustSize);

    adjustSize();
    // $.mobile.defaultDialogTransition = 'flip';
    // $.mobile.defaultPageTransition = 'flip';
    
    $('#mode-select input[type="radio"]').on('click', function(){
        gameData.mode=$(this).val();
        if( gameData.mode == 'vshuman' ) {
            $('#level-select input').attr('disabled', true);
            $('#level-select label').addClass('disabled');
            $('#pc-icon').removeClass('blue');
            $('#user-icon').addClass('blue');
        } else {
            $('#level-select input').attr('disabled', false);
            $('#level-select label').removeClass('disabled');
            $('#pc-icon').addClass('blue');
            $('#user-icon').removeClass('blue');
        }
    });
    
    $('#mode-player input[type="radio"]').on('click', function(){
        gameData.color=$(this).val();
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
        /* mode */
        $('#mode-select input[value="'+gameData.mode+'"]').attr('checked',true);
        $('#mode-select label').removeClass('selected');
        $('#mode-select input[value="'+gameData.mode+'"]').next().addClass('selected');

        if( gameData.mode == 'vshuman' ) {
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
    }
    gameInitSetting();
    
    $("#startGame").on('click', function(){
        $("#backdrop-over").show();
        $("#backdropgame-over").hide();
        $("#backdrop-topmenu").hide();
        $("#newGame").prop('disabled', false);
        gameInit();
        game.start();
    });

    $("#newGame").on('click', function(){
        $("#backdrop-over").hide();
        $("#backdrop-topmenu").show();
        $("#backdropgame-over").show();
        $(this).prop('disabled', true);
        gameInit();
    });

    $("#anotherNewGame").on('click', function(){
        $("#backdrop-over").hide();
        $("#backdrop-topmenu").show();
        $("#backdropgame-over").show();
        $(this).prop('disabled', true);
        gameInit();
    });

    $("#mobileNewGame").on('click', function() {
        $('#game-setting').show('normal');
        $('body').addClass('overflow-hidden');
        gameInit();
    });

    $("#mobileStartGame").on('click', function() {
        $('.controller').show();
        $('#game-setting').hide('normal');
        $('body').removeClass('overflow-hidden');
        $('#backdropgame-over').hide();
        gameInit();
        game.start();
    });

    $('.btn-closepopup').on('click', function() {
        // gameInit();
        // $("#backdrop-over").hide();
        // $("#backdrop-topmenu").show();
        // $("#backdropgame-over").show();
        // $("#newGame").prop('disabled', true);

        var showText = 'You Lost';

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
        // gameInit();
        var isMobile = $(window).width()>768?false:true;
        if( isMobile )
            $("#mobileNewGame").trigger('click');
        else
            $("#newGame").trigger('click');
        // game.start();
    });

    $("#undo-button").on('click', function(){
        if( $("#newGame").prop('disabled') ) return false;
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
    adjustSizeGen();
    // var smallScreen = $(window).width()>768?false:true;
});