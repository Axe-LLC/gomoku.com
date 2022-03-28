function adjustSizeGen(){
    var smallScreen = navigator.userAgent.toLowerCase().match(/(iphone|ipod)/);

    var gameRegion = $("#game-region"),
        tds = $('.board td'),
        board = $('.go-board');
    return function(){
        var avaih = $('#game-page').height(),
            avaiw = $('#game-page').width(),
            h = Math.max(avaih - 40, avaih * 0.98 - 40),
            w = Math.max(avaiw - 40, avaih * 0.98 - 40),
            vspace = Math.min(h, w),
            hspace = Math.min(w, h - 40),
            hsize;

        if(smallScreen){
            if(avaih > avaiw){
                vspace = avaiw;
                hspace = 0;
            }else{
                hspace = avaih - 40;
                vspace = 0;
            }
        }

        if(vspace > hspace){
            hsize = Math.min(~~((vspace - 15) / gameData.boardsize / 2), ~~((avaiw - 22) / gameData.boardsize / 2));
            gameRegion.css({
                'padding': 40,
            });
            tds.css('padding',hsize);
            board.css({
                'left': 46 - hsize,
                'right': 46 - hsize,
                'top': 46 - hsize,
                'bottom': 46 - hsize,
            });
        }else{
            hsize = ~~((hspace - 15) / gameData.boardsize / 2);
            gameRegion.css({
                'padding': hsize+6,
                'margin-left': -((2*hsize+1)*gameData.boardsize)/2,
                'padding-left': 160+hsize,
                'padding-right': 160+hsize,
                'margin-top': -(hsize * gameData.boardsize + 28)
            });
            tds.css('padding',hsize);
            board.css({
                'bottom': 6,
                'right': 160
            });
        }

        /* board text */
        $('#leftLetters').html('');
        $('#rightLetters').html('');
        $('#topLetters').html('');
        $('#bottomLetters').html('');
        var letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];

        for(i=1; i<=gameData.boardsize; i++) {
            $('#leftLetters').prepend('<span>' + i + '</span>');
            $('#rightLetters').prepend('<span>' + i + '</span>');
            $('#topLetters').append('<span>' + letters[i] + '</span>');
            $('#bottomLetters').append('<span>' + letters[i] + '</span>');
        }
        $('#leftLetters span').css('padding-top', (hsize*2-13)+'px');
        $('#rightLetters span').css('padding-top', (hsize*2-13)+'px');
        $('#topLetters span').css('padding-right', (hsize*2-5)+'px');
        $('#bottomLetters span').css('padding-right', (hsize*2-5)+'px');
    };
}
