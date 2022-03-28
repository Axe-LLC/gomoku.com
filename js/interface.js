$(document).ready(function(){
    let w = $('#game-page').width();
    let full = $(window).height() - 250;
    if( w > full )
        $('#game-page').height(full);
    else
        $('#game-page').height($('#game-page').width());
    $('#game-page').css('min-height', 'unset');

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
    });

    $('#mode-theme input[type="radio"]').on('change', function(){
        gameData.theme='theme-' + $(this).val();
        $('#main-page').attr('class', gameData.theme);
    });
    
    // $('.back-to-game').on('tap',function(){
    //     $.mobile.changePage('#game-page');
    // });
    
    $("#startGame").on('click',function(){
        $("#backdrop-over").show();
        $("#backdropgame-over").hide();
        $("#newGame").prop('disabled', false);
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
        game.start();
    });

    $("#newGame").on('click',function(){
        $("#backdrop-over").hide();
        $("#backdropgame-over").show();
        $(this).prop('disabled', true);
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
    });

    $(".btn-playagain").on('click',function(){
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