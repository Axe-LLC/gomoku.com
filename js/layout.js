function adjustSizeGen(){
    // var smallScreen = navigator.userAgent.toLowerCase().match(/(iphone|ipod|android)/);

    var gameRegion = $("#game-region"),
        tds = $('.board td'),
        board = $('.go-board');
    return function(){
        var smallScreen = $(window).width()>768?false:true;
        var mobileScreen = $(window).width()>500?false:true;
        var avaih = $('#game-page').height(),
            avaiw = $('#game-page').width(),
            h = Math.max(avaih - 40, avaih * 0.98 - 40),
            w = Math.max(avaiw - 40, avaih * 0.98 - 40),
            vspace = Math.min(h, w),
            hspace = Math.min(w, h - 40),
            hsize;

        if(smallScreen){
            // if(avaih > avaiw){
            //     vspace = avaiw;
            //     hspace = 0;
            // }
            // else{
            //     hspace = avaih - 40;
            //     vspace = 0;
            // }
            h = Math.max(avaih, avaih * 0.98);
            w = Math.max(avaiw, avaih * 0.98);
            vspace = Math.min(h, w);
            hspace = Math.min(w, h - 30);

            if( mobileScreen ) {
                h = Math.max(avaih, avaih * 0.98);
                w = Math.max(avaiw, avaih * 0.98);
                vspace = Math.min(h, w);
                hspace = Math.min(w, h);
            }
        }

        // if(vspace > hspace){
        hsize = Math.min(~~((vspace - 15) / 15 / 2), ~~((avaiw - 22) / 15 / 2));
        if(smallScreen){
            gameRegion.css({
                'padding': 30,
            });
            if( $(window).width() > 370 && $(window).width() < 390 ) {
                tds.css('padding',hsize-1.3);
            } else if( $(window).width() > 390 && $(window).width() < 401 ) {
                tds.css('padding',hsize-1.7);
            } else if( $(window).width() > 400 && $(window).width() < 415 ) {
                tds.css('padding',hsize-1);
            } else {
                tds.css('padding',hsize-0.8);
            }
            board.css({
                'left': 36 - hsize,
                'right': 36 - hsize,
                'top': 36 - hsize,
                'bottom': 36 - hsize,
            });

            if( mobileScreen ) {
                gameRegion.css({
                    'padding': 0,
                });
                if( $(window).width() > 370 && $(window).width() < 390 ) {
                    tds.css('padding',hsize+0.85);
                } else if( $(window).width() > 390 && $(window).width() < 401 ) {
                    tds.css('padding',hsize+0.4);
                } else if( $(window).width() > 400 && $(window).width() < 415 ) {
                    tds.css('padding',hsize+1.2);
                } else {
                    tds.css('padding',hsize+1.4);
                }
                board.css({
                    'left': 6 - hsize,
                    'right': 6 - hsize,
                    'top': 6 - hsize,
                    'bottom': 6 - hsize,
                });
            }
            
        } else {
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
        }
        // }else{
        //     hsize = ~~((hspace - 15) / 15 / 2);
        //     gameRegion.css({
        //         'padding': hsize+6,
        //         'margin-left': -((2*hsize+1)*15)/2,
        //         'padding-left': 160+hsize,
        //         'padding-right': 160+hsize,
        //         'margin-top': -(hsize * 15 + 28)
        //     });
        //     tds.css('padding',hsize);
        //     board.css({
        //         'bottom': 6,
        //         'right': 160
        //     });
        // }

        /* board text */
        $('#leftLetters').html('');
        $('#rightLetters').html('');
        $('#topLetters').html('');
        $('#bottomLetters').html('');
        if( mobileScreen ) return;
        var letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];

        for(i=1; i<=15; i++) {
            $('#leftLetters').prepend('<span>' + i + '</span>');
            $('#rightLetters').prepend('<span>' + i + '</span>');
            $('#topLetters').append('<span>' + letters[i] + '</span>');
            $('#bottomLetters').append('<span>' + letters[i] + '</span>');
        }
        if( smallScreen ) {
            $('#leftLetters span').css('padding-top', (hsize*2-15)+'px');
            $('#rightLetters span').css('padding-top', (hsize*2-15)+'px');
            $('#topLetters span').css('padding-right', (hsize*2-7)+'px');
            $('#bottomLetters span').css('padding-right', (hsize*2-7)+'px');
            if( $(window).width() > 391 && $(window).width() < 401 ) {
                $('#leftLetters span').css('padding-top', (hsize*2-17)+'px');
                $('#rightLetters span').css('padding-top', (hsize*2-17)+'px');
                $('#topLetters span').css('padding-right', (hsize*2-9)+'px');
                $('#bottomLetters span').css('padding-right', (hsize*2-9)+'px');
            }
        } else {
            $('#leftLetters span').css('padding-top', (hsize*2-13)+'px');
            $('#rightLetters span').css('padding-top', (hsize*2-13)+'px');
            $('#topLetters span').css('padding-right', (hsize*2-5)+'px');
            $('#bottomLetters span').css('padding-right', (hsize*2-5)+'px');
        }
    };
}
