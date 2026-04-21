/*
  Academy Awards GLS
  Adrian Velazquez
  Creative Developer
  2019
  Email: adrian.velazquez@merkleyandpartners.com
  For: Mercedes Benz
*/

/* Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function(){
  // banner size
  var width = 300;
  var height = 250;

  // preload images array
  var images = [
    "bg.jpg",
  	"txt_1.png",
    "txt_1_1.png",
  	"txt_2.png",
  	"cta.png",
  	"logo.png",
    "flash.png"
  ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {

    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});

    // create banner elements here
    var bg = machine.createElement({id: "bg", backgroundImage: "bg.jpg", retina: true, parent: banner});
    var txt_2 = machine.createElement({id: "txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
    var cta = machine.createElement({id: "cta", backgroundImage: "cta.png", left: 11, top: 205, retina: true, parent: banner});
    var bg_cover = machine.createElement({id: "bg_cover", backgroundColor: "#000", width: width, height: height, parent: banner});
    var logo = machine.createElement({id: "logo", backgroundImage: "logo.png", retina: true, parent: banner});
    var txt_1 = machine.createElement({id: "txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
    var txt_1_1 = machine.createElement({id: "txt_1_1", backgroundImage: "txt_1_1.png", retina: true, parent: banner});
    // paparazzi flash assets
    var flash_0 = machine.createElement({id: "flash_0", backgroundImage: "flash.png", left: 76, top: 163, retina: true, parent: banner});
    var flash_1 = machine.createElement({id: "flash_1", backgroundImage: "flash.png", left: 208, top: 4, retina: true, parent: banner});
    var flash_2 = machine.createElement({id: "flash_2", backgroundImage: "flash.png", left: 9, top: 41, retina: true, parent: banner});
    var flash_3 = machine.createElement({id: "flash_3", backgroundImage: "flash.png", left: 171, top: 176, retina: true, parent: banner});
    var flash_4 = machine.createElement({id: "flash_4", backgroundImage: "flash.png", left: 60, top: -20, retina: true, parent: banner});
    var flash_5 = machine.createElement({id: "flash_5", backgroundImage: "flash.png", left: 60, top: 101, retina: true, parent: banner});
    var flash_6 = machine.createElement({id: "flash_6", backgroundImage: "flash.png", left: 184, top: 41, retina: true, parent: banner});
    var flash_7 = machine.createElement({id: "flash_7", backgroundImage: "flash.png", left: 113, top: 18, retina: true, parent: banner});
    var flash_8 = machine.createElement({id: "flash_8", backgroundImage: "flash.png", left: 147, top: 125, retina: true, parent: banner});
    var flash_9 = machine.createElement({id: "flash_9", backgroundImage: "flash.png", top: 125, retina: true, parent: banner});
    // create banner elements here

    // hit, border, studio enabler exit element
    var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});

    /* Element Workers - vars, const, obj, arrays
	  =============================================================== */
    var assets = [txt_1, txt_1_1, txt_2, cta];
    var flashes = [flash_0, flash_1, flash_2, flash_3, flash_4, flash_5, flash_6, flash_7, flash_8, flash_9];
    var frame_1 = [txt_1, txt_1_1, bg_cover];
    var endframe = [txt_2, cta];

    /* Asset Adjustments - set elements for animation
	  =============================================================== */
    TweenMax.set(assets, {opacity: 0});
    TweenMax.set(flashes, {opacity: 0});
    TweenMax.set(endframe, {y: -5})

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // flash the lights
    var paparazzi_attack = function(){// flash function
      var flash_tl = new builderTimeLine({repeat: 1});// flash timeline, plays twice
      for(let i = 0; i < flashes.length; i++){// flash loop
        flash_tl// flash animations
          .fromTo(flashes[i], 0.60,
            {opacity: 0.8, scale: getRandom(2,4)},
            {opacity: 0, scale: 0.8, ease: Power3.easeOut, delay: getRandom(0,7)*0.1, repeat: getRandom(2,3), immediateRender: false}
        );
      };
      return flash_tl;// return the flash animation
    };

    // fade elements in
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 0.75, {opacity: 1, ease: Power2.easeInOut});
    };

    // fade elements out
    var fade_out = function(obj){
      return new builderTimeLine()
        .to(obj, 0.75, {opacity: 0, ease: Power1.easeInOut});
    };

    // endframe animation
    endframe.in = new builderTimeLine()
      .staggerTo(endframe, 0.75, {opacity: 1, y: 0}, 0.5);

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine()
      .offset(0.1)
      .add("frame 1")
        .add(fade_in(txt_1))
        .chain(0.5)
        .add(fade_in(txt_1_1))
        .offset(0.75)
      .add("paparazzi attack!")
        .add(paparazzi_attack())
        .chain(1.5)
        .add(fade_out(frame_1))
        .chain()
      .add("endframe")
        .add(endframe.in)
      ;

      // scrubber(main_tl);

    /* User Interactions - clickthroughs, exits, events
	  =============================================================== */
    // cta animation on over
    hit.addEventListener("mouseenter", function(){
      return new builderTimeLine()
        .to(cta, 0.35, {scale: 1.05, ease: Power3.easeOut});
    });

    // cta animation on out
    hit.addEventListener("mouseleave", function(){
      return new builderTimeLine()
        .to(cta, 0.15, {scale: 1, ease: Power3.easeIn});
    });

    /* Helper functions - utilities for banner
  	=============================================================== */
    function getRandom(min, max){// get random number function
      var r = Math.floor(Math.random() * (max-min + 1) + min);
      return r;
    }

    /* Scrubber
  	=============================================================== */
  	function scrubber(tl) {
  		if (window.location.origin == "http://localhost:8080" || window.location.origin == "file://"){
  			machine.include(["../machine_scrubber.min.js"], function(){
  				if (machine.scrubberController)
            machine.scrubberController.create({"Academy Awards GLS: 300x250": tl});
  			});
  		};
  	};

  });
};
