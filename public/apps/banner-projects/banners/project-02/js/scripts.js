/************************************

*    Banner Boy Banner for Mini
*    Adrian Velazquez
*    Digital Media Developer
*    2018
    *****************
*    hire_adrianV@yahoo.com

************************************/
(function(){
"use strict";

  // check for namespace existance, if defined, use, if not, assign new instance to vars
  var assets = assets || {}, tl = tl || new TimelineLite();

  // init dom elements
  var assets = {
    // utility assets
    banner : document.getElementById('banner'),

    // banner utilities
    utilities: {
      bgRed : document.getElementById('bg-red'),
      bgOrange : document.getElementById('bg-orange'),
      bgBlue : document.getElementById('bg-blue'),
    },

    // graphic assets
    images : {
      // mini
      miniCooper : document.getElementById('mini-cooper'),
      miniCar : document.getElementById('mini-car'),
      miniLights : document.getElementById('mini-lights'),
      miniEndFrameBlue : document.getElementById('mini-endFrame-blue'),
      miniEndFrameOrange : document.getElementById('mini-endFrame-orange'),
      miniEndFrameRed : document.getElementById('mini-endFrame-red'),
      miniEndFrame : document.getElementById('mini-endFrame'),
      rimFront : document.getElementById('mini-rim-front'),
      rimRear : document.getElementById('mini-rim-rear'),

      // logo
      logo : document.getElementById('logo'),
      logoBG : document.getElementById('logo-bg'),
      logoFrame : document.getElementById('logo-frame'),

      // cta
      cta : document.getElementById('cta'),
      ctaTxt : document.getElementById('cta-txt'),
      ctaArrow1 : document.getElementById('cta-arrow-1'),
      ctaArrow2 : document.getElementById('cta-arrow-2'),

      // swatches
      swatchBlue : document.getElementById('swatch-blue'),
      swatchOrange : document.getElementById('swatch-orange'),
      swatchRed : document.getElementById('swatch-red'),
    },

    // text assets
    text : {
      txt1 : document.getElementById('txt-1'),
      txt2 : document.getElementById('txt-2'),
      txt3 : document.getElementById('txt-3'),
      txt4 : document.getElementById('txt-4'),
      txt5 : document.getElementById('txt-5')
    }
  };

  //initialize the animation timeline
  var tl = new TimelineLite();
  // setup rims
  var rims = [assets.images.rimFront, assets.images.rimRear];

  // setup function for positioning, scale and opacity of banner and elements
  function setup(){
    TweenLite.set(assets.banner, {autoAlpha:1, onComplete:ctaListeners});
    TweenLite.set([
      assets.text.txt1,
      assets.text.txt2,
      assets.text.txt3,
      assets.text.txt4,
      assets.images.miniCooper,
      assets.images.cta
    ], {x:-300});
    TweenLite.set(assets.images.miniCar, {rotation: -.5, transformOrigin: "50 50"});
    TweenLite.set([assets.images.miniEndFrame, assets.images.miniEndFrameBlue], {scale:.89});
    TweenLite.set(assets.images.logo, {y:96, x:105, scale:.33});
  };

  // animate mini in
  function miniIn(){
    var tl = new TimelineLite();

    tl
    .to(assets.images.miniCooper, .5, {x:0})
    .to(assets.images.miniCar, .5, {rotation:.5, ease:Power1.easeInOut, onComplete:function(){
      TweenLite.to(assets.images.miniCar, .2, {rotation:0, ease:Power1.easeInOut});
    }}, "-=.25")
    .to(rims, .5, {rotation:360, ease:Power2.easeInOut}, "-=.89");

    return tl;
  };

  // animate mini off out
  function miniOut(){
    var tl = new TimelineLite();
    // frame 1
    tl
    .to(assets.images.miniCooper, .5, {x:600}, "+=1.5")
    .to(rims, .5, {rotation:720, ease:Power2.easeInOut}, "-=.55")
    .to(assets.images.miniCar, .5, {rotation:.5, ease:Power1.easeInOut, onComplete:function(){
      TweenLite.to(assets.images.miniCar, .2, {rotation:0, ease:Power1.easeInOut});
    }}, "-=.25");

    return tl;
  };

  // reset mini for next frame
  function miniReset(){
    TweenLite.set(assets.images.miniCooper, {x:-300});
    TweenLite.set(rims, {rotation:0});
  };

  // main animation
  function setItOff(){
    // run the setup
    setup();

    // initialize assets into arrays by frame for easy animation and transitions
    var frame1assets = [assets.text.txt1, assets.text.txt2, assets.images.cta],
        frame1ExitAssets = [assets.text.txt2, assets.text.txt1, assets.utilities.bgBlue],
        frame2assets = [assets.text.txt3, assets.text.txt4],
        frame3assets = [
          assets.text.txt4,
          assets.text.txt3,
          assets.images.logo,
          assets.images.cta,
          assets.utilities.bgRed
        ],
        endFrameAssets = [
          assets.text.txt5,
          assets.images.swatchBlue,
          assets.images.swatchOrange,
          assets.images.swatchRed,
          assets.images.cta,
          assets.images.logo
        ];

    // main timeline
    tl

     // ---------------------------------------- frame 1
     // animate mini
     .add(miniIn)
     // animate text, cta and logo assets
     .staggerTo(frame1assets, 1, {x:0, ease:Elastic.easeOut.config(1, 1)}, .25, "+=.25")
     .to(assets.images.logo, .5, {autoAlpha:1}, "-=.8")
     // turn on the lights
     .fromTo(assets.images.miniLights, .1, {autoAlpha:0}, {autoAlpha:1, repeat:1})
     .to(assets.images.miniLights, .5, {autoAlpha:.795})
     // animate mini
     .add(miniOut)
     // animate text and bg
     .staggerTo(frame1ExitAssets, 1, {x:300, ease:Elastic.easeOut.config(1, 1)}, .25, "+=1.7")
     .add(miniReset)
     //turn off the lights
     .set(assets.images.miniLights, {autoAlpha:0})
     // ---------------------------------------- frame 1

     // ---------------------------------------- frame 2
     // animate mini
    .add(miniIn)
     // animate text
    .staggerTo(frame2assets, 1, {x:0, ease:Elastic.easeOut.config(1, 1)}, .25, "+=.25")
    // animate mini
    .to(assets.images.miniCooper, .5, {x:600}, "+=1.5")
    .to(rims, .5, {rotation:720, ease:Power2.easeInOut}, "-=.55")
    .to(assets.images.miniCar, .5, {rotation:.5, ease:Power1.easeInOut, onComplete:function(){
      TweenLite.to(assets.images.miniCar, .2, {rotation:0, ease:Power1.easeInOut});
    }}, "-=.25")
    // animate bg
    .to(assets.utilities.bgOrange, 1, {x:300, ease:Elastic.easeOut.config(1, 1)}, "-=.5")
    .add(miniReset)
     // ---------------------------------------- frame 2

     // ---------------------------------------- frame 3
     // animate mini
    .to(assets.images.miniCooper, .5, {x:300})
     // animate frame 3 assets off banner
    .staggerTo(frame3assets, 1, {x:300, ease:Elastic.easeOut.config(1, 1), onComplete:function(){
      // reset logo
      TweenLite.set(assets.images.logo, {y:0, x:0});
      TweenLite.to(assets.images.logo, .5, {scale:1, ease:Elastic.easeOut.config(1, 1)});
    }}, .25)
    // animate logo
    .to(assets.images.logo, .75, {scale:0, autoAlpha:0, ease:Elastic.easeOut.config(1, 1)}, "+=1")
    // re reset logo
    .set(assets.images.logo, {y:96, x:105, scale:.33, autoAlpha:0})
    // hide cta
    .set(assets.images.cta, {y:0, x:0, autoAlpha:0})
     // ---------------------------------------- frame 3

     // ---------------------------------------- endFrame
    .to([assets.images.miniEndFrame, assets.images.miniEndFrameBlue], .5, {scale:1, autoAlpha:1}, "-=.5")
    .staggerTo(endFrameAssets, 1, {autoAlpha:1, ease:Elastic.easeOut.config(1, 1)}, .2, "-=.5")
     // ---------------------------------------- endFrame

     // add swatches function
     .add(colorSwap);
  };

  // mini color swap on swatch click
  function colorSwap(){
    var blue = assets.images.miniEndFrameBlue,
        red = assets.images.miniEndFrameRed,
        orange = assets.images.miniEndFrameOrange;

    // on hover, switch mini color to blue
    assets.images.swatchBlue.addEventListener('click', function(){
      TweenLite.to(blue, .01, {autoAlpha:1});
      TweenLite.to(red, .01, {autoAlpha:0});
      TweenLite.to(orange, .01, {autoAlpha:0});
    });

    // on hover, switch mini color to red
    assets.images.swatchRed.addEventListener('click', function(){
      TweenLite.to(red, .01, {autoAlpha:1});
      TweenLite.to(blue, .01, {autoAlpha:0});
      TweenLite.to(orange, .01, {autoAlpha:0});
    });

    // on hover, switch mini color to orange
    assets.images.swatchOrange.addEventListener('click', function(){
      TweenLite.to(orange, .01, {autoAlpha:1});
      TweenLite.to(red, .01, {autoAlpha:0});
      TweenLite.to(blue, .01, {autoAlpha:0});
    });
  };

  // CTA event listeners
  function ctaListeners(){
    var arrows = [assets.images.ctaArrow1, assets.images.ctaArrow2];

    // on hover, animate cta arrows
    assets.banner.addEventListener('mouseover', function(){
      TweenLite.to(arrows, .5, {x:-5, ease:Elastic.easeInOut.config(1, 1)});
    });

    // on mouseout, reset cta arrows
    assets.banner.addEventListener('mouseout', function(){
      TweenLite.to(assets.images.ctaArrow2, .1, {x:0, ease:Elastic.easeInOut.config(1, 1), onComplete:function(){
        TweenLite.to(assets.images.ctaArrow1, .1, {x:0, ease:Elastic.easeInOut.config(1, 1)});
      }});
    });

  };

  // Initialize the animation
  setItOff();

})();
