(function() {

    // defines banner elements
    var banner = document.getElementById('banner'),
        hit = document.getElementById('hit'),
        bg_gradient = document.getElementById('bg_gradient'),
        bottom_white = document.getElementById('bottom_white'),
        card = document.getElementById('card'),
        chase_logo = document.getElementById('chase_logo'),
        text_1 = document.getElementById('text_1'),
        text_2 = document.getElementById('text_2'),
        cta = document.getElementById('cta'),
        replay = document.getElementById('replay'),
        WIDTH = 320,
        HEIGHT = 50;


        mainTl = new TimelineLite({onComplete:completeHandler});

    document.execCommand("BackgroundImageCache",false,true);


    // main animation function

    function main() {


        mainTl
            .set(chase_logo, {x: 300, y: 10})
            // add a start label
            .add("start", 0.5)
            .set(banner, {autoAlpha: 1})
            // show the card
            .fromTo(card, 0.75, {x:320, y: 4, force3D: true, rotateZ:0.001},{x: 130, ease:Power3.easeOut}, "start+=0.2")
            // show the bottom white footer area
            .fromTo(bottom_white, 0.65, {x: 320}, {x: 178, ease:Power3.easeOut}, "start+=0.2")
            // show the logo
            .to(chase_logo, 0.4, {x:212, autoAlpha: 1, ease:Power3.easeOut}, "start+=0.4")

            // show the text and animate it in
            .to(text_1, 0.8, {autoAlpha: 1}, "start")
            .from(text_1, 0.4, {y: "+=10", ease:Power3.easeOut}, "start+=0.1")

            // frame 2
            .add("frame2", "+=1.25")
            .to(text_1, 0.4, {autoAlpha:0}, "frame2")

            // move the card left
            .to(card, 0.8, { x:142, ease:Power3.easeOut}, "frame2+=0.2")

            .to(text_2, 0.8, {autoAlpha:1}, "frame2+=0.6")
            .from(text_2, 0.4, {y: "+=10", ease:Power3.easeOut}, "frame2+=0.6")

            // end frame

            .add("endframe")
            .to(chase_logo, 0.4, {y:0, autoAlpha:0, ease:Power3.easeOut}, "endframe-=0.7")

            .to(cta, 0.4, {autoAlpha:1}, "endframe-=0.55")
            .from(cta, 0.4, {y: "+=30", ease: Back.easeOut}, "endframe-=0.55");

    }

    // banner complete - show replay button
    function completeHandler() {
        TweenMax.to(btn_pause, 0.1, {autoAlpha: 0});
        TweenMax.to(btn_replay, 0.1, {autoAlpha: 1});
    }

    cta.addEventListener('mouseover', function(event) {
        mainTl.set(cta, {backgroundColor:"rgb(47, 125, 72)", ease:Power1.easeInOut});
    });

    cta.addEventListener('mouseout', function(event) {
        mainTl.set(cta, {backgroundColor:"#2ba854", ease:Power1.easeInOut});
    });

    cta.addEventListener('mousedown', function(e) {
        vendorClickHandler();
    }, false);

    // play/pause
    controls.addEventListener('mousedown', togglePlayPause, false);

    // btn_pause.addEventListener('keydown', togglePlayPause, false);

    function togglePlayPause(e){
        if (e.target.id == 'btn_pause' || e.target.id == 'btn_play') {
            doPlayPause(e);
        }
    }

    // replay
    btn_replay.addEventListener('mouseover', function(){
        TweenMax.to(this, 0.3, {rotationZ: 360, transformOrigin:"50% 4.5px",
            onComplete:function(){
                TweenMax.set(btn_replay, {rotationZ:0});
            }});
    });
    btn_replay.addEventListener('mousedown', replayBanner, false);
    // btn_replay.addEventListener('keydown', replayBanner, false);

    function replayBanner(e){
        if (e.target.id == 'btn_replay') {
            TweenMax.set(btn_pause, {backgroundPositionX:'0px'});
            TweenMax.to(btn_pause, 0.1, {autoAlpha: 1});
            TweenMax.to(btn_replay, 0.1, {autoAlpha: 0});
            mainTl.restart();
        }
    }

    // respond to keyboard events
    function keyboardEventHandler(e){
        var keyCode = e.which || e.keyCode;
        if (keyCode == 32) {
            switch(document.activeElement.id) {
                // we're on the pause button - play or pause the banner
                case 'hit':
                    vendorClickHandler();
                    break;
                case 'controls':

                    if (mainTl.progress() < 1) {
                        doPlayPause();
                    } else if (mainTl.progress() == 1) {
                        restartBanner();
                    }
                    break;

                case 'cta':
                    vendorClickHandler();
                    break;
                default:
                    break;
            }
        }
    }

    document.addEventListener('keydown', keyboardEventHandler, false);


    function doPlayPause() {
        if (mainTl.paused()){
            TweenMax.set(btn_pause, {autoAlpha:1});
            TweenMax.set(btn_play, {autoAlpha:0});
        } else {
            TweenMax.set(btn_pause, {autoAlpha:0});
            TweenMax.set(btn_play, {autoAlpha:1});
        }
        mainTl.paused(!mainTl.paused());
    }

    function restartBanner() {
        TweenMax.set(btn_play, {autoAlpha: 0});
        TweenMax.to(btn_pause, 0.1, {autoAlpha: 1});
        TweenMax.to(btn_replay, 0.1, {autoAlpha: 0});
        mainTl.restart();
    }


    main();
})();
