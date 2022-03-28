$(document).ready(function(){
    let w = $('#game-page').width();
    let full = $(window).height() - 280;
    if( w > full )
        $('#game-page').height(full);
    else
        $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');

    $('#backdrop-topmenu').hide();

    var game = new Game($(".go-board"), $(".board tbody"));

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
        } else {
            $('#level-select input').attr('disabled', false);
            $('#level-select label').removeClass('disabled');
        }
    });
    
    $('#mode-player input[type="radio"]').on('click', function(){
        gameData.color=$(this).val();
        if( $(this).val() == 'white' ) {
            $('#pc-icon').removeClass('blue');
            $('#user-icon').removeClass('blue');
        } else {
            $('#pc-icon').addClass('blue');
            $('#user-icon').addClass('blue');
        }
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
    
    $("#startGame").on('click',function(){
        $("#backdrop-over").show();
        $("#backdropgame-over").hide();
        $("#backdrop-topmenu").hide();
        $("#newGame").prop('disabled', false);
        gameInit();
        game.start();
    });

    $("#newGame").on('click',function(){
        $("#backdrop-over").hide();
        $("#backdrop-topmenu").show();
        $("#backdropgame-over").show();
        $(this).prop('disabled', true);
        gameInit();
    });

    $(".btn-playagain").on('click',function(){
        gameInit();
        game.start();
    });

    $("#undo-button").on('click', function(){
        if( $("#newGame").prop('disabled') ) return false;
        game.undo();
    });

    gameData.load();

    setTimeout(function() {
        $("#startGame").trigger('click');
    }, 100);

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
    $('#resultModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    // if(game.mode === 'hvh'){
    //     var who=(function(string){ return string.charAt(0).toUpperCase() + string.slice(1);})(game.getCurrentPlayer().color);
    //     $("#game-won h4").html(who+' Won!');
    //     gameInfo.value=who+' won.'
    //     $("#win-content").html(who+' won the game. Play again?');
    //     $('#happy-outer').fadeIn(500);
    // }else{
    //     if(game.getCurrentPlayer() instanceof HumanPlayer){
    //         $("#game-won h4").html('You Won!');
    //         $("#win-content").html('You won the game. Play again?');
    //         gameInfo.value='You won.'
    //         $('#sad-outer').fadeIn(500);
    //     }else{
    //         $("#game-won h4").html('You Lost.');
    //         $("#win-content").html('Meh. You lost to the computer. Play again?');
    //         gameInfo.value='Computer won.'
    //         $('#happy-outer').fadeIn(500);
    //     }
    // }
}

$(window).resize(function() {
    adjustSizeGen();
});