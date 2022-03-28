function adjustSizeGen(){
    var smallScreen = navigator.userAgent.toLowerCase().match(/(iphone|ipod)/);

    var gameRegion = $("#game-region"),
        tds = $('.board td'),
        board = $('.go-board');
    return function(){
        var avaih = $('#game-page').height(),
            avaiw = $('#game-page').width(),
            h = Math.max(avaih - 7, avaih * 0.98),
            w = Math.max(avaiw - 7, avaih * 0.98),
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
            hsize = Math.min(~~((vspace - 15) / 15 / 2), ~~((avaiw - 22) / 15 / 2));
            gameRegion.css({
                'padding': hsize,
            });
            tds.css('padding',hsize);
            board.css({
                'left': 6,
                'right': 6
            });
        }else{
            hsize = ~~((hspace - 15) / 15 / 2);
            gameRegion.css({
                'padding': hsize+6,
                'margin-left': -((2*hsize+1)*15)/2,
                'padding-left': 160+hsize,
                'padding-right': 160+hsize,
                'margin-top': -(hsize * 15 + 28)
            });
            tds.css('padding',hsize);
            board.css({
                'bottom': 6,
                'right': 160
            });
        }
    };
}
