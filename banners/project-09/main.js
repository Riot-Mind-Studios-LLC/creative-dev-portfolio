/* Banner Info
------------------
White Castle - Draft Kings
Adrian Velazquez
Creative Developer
2025
Email: adrian.velazquez@omnicomstudios.com
------------------
For: White Castle
------------------ */

/*
Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 728,// change banner width
      height = 90,// change banner height
      images = [// preload image assets
        "bg.jpg",
        "b_ball.png",
        "boxes.png",
        "slider_2.png",
        "slider_1.png",
      	"txt_3.png",
        "txt_2_1.png",
      	"txt_2.png",
      	"txt_1.png",
        "txt_disclaimer.png", 
      	"logo.png",
        "cta.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg_container = machine.createElement({id:"bg_container", width: width, parent: banner});
                var bg_2 = machine.createElement({id:"bg_2", backgroundImage: "bg.jpg", top: 1, left: 1,retina: false, parent: bg_container});
                var bg_1 = machine.createElement({id:"bg_1", backgroundImage: "bg.jpg", retina: false, parent: bg_container});
            var txt_2_1 = machine.createElement({id:"txt_2_1", backgroundImage: "txt_2_1.png", retina: true, parent: banner});
            var txt_2 = machine.createElement({id:"txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
            var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var slider_1 = machine.createElement({id:"slider_1", backgroundImage: "slider_1.png", left: 206, top: -15, retina: false, parent: banner});
            var slider_2 = machine.createElement({id:"slider_2", backgroundImage: "slider_2.png", left: 377, top: -11, retina: false, parent: banner});
            var b_ball = machine.createElement({id:"b_ball", backgroundImage: "b_ball.png", left: 486, top: 45, retina: true, parent: banner});
            var boxes = machine.createElement({id:"boxes", backgroundImage: "boxes.png", left: 365, top: -85, retina: false, parent: banner});
            var txt_3 = machine.createElement({id:"txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
            var txt_disclaimer = machine.createElement({id:"txt_disclaimer", backgroundImage: "txt_disclaimer.png", retina: true, parent: banner});
            var logo = machine.createElement({id:"logo", backgroundImage: "logo.png", retina: true, parent: banner});
            var cta = machine.createElement({id:"cta", backgroundImage: "cta.png", left: 141, top: 12, retina: true, parent: banner});
            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
      TweenMax.set(bg_container, {y: -520, height: bg_1.get("height") + bg_2.get("height")});
      TweenMax.set(bg_2, {rotation: 180, y: -bg_1.get("height")});
      TweenMax.set([txt_1, txt_disclaimer, logo, cta], {opacity: 0});
      TweenMax.set(boxes, {y: -120});
      TweenMax.set([txt_2, txt_2_1, txt_3], {y: -height});
      TweenMax.set([slider_1, slider_2], {y: -120});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // pan bg animation
    var pan_bg = function(obj){
      return new builderTimeLine()
        .to(obj, 15, {y: 450, ease: Power0.easeInOut});
    };
    // dribble animation
    var dribble = function(obj){
      return new builderTimeLine({repeat: 3, yoyo: true})
        .to(obj, 0.5, {scale: 0.7, ease: Back.easeIn});
    };
    // pass animation
    var pass = function(obj, xPOS, yPOS){
      return new builderTimeLine()
        .to(obj, 1, {x: xPOS, y: yPOS, rotation: 45, ease: Back.easeInOut});
    };
    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, ease: Power2.easeInOut});
    };
    // shift obj animation
    var shift_obj = function(obj, xPOS, yPOS, scaleOBJ){
      return new builderTimeLine()
        .to(obj, 0.75, {x: xPOS, y: yPOS, scale: scaleOBJ, ease: Power1.easeInOut});
    };
    // pan obj animation
    var pan_obj = function(obj, xPOS, yPOS){
      return new builderTimeLine()
        .to(obj, 1, {x: xPOS, y: yPOS, ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
      // start
        .add(fade_in(logo))
        .offset(0)
      // bg pan
        .add(pan_bg(bg_container))
        .offset(0.25)
      // frame 1
        .add(dribble(b_ball))
        .chain(1.5)
        .add(pan_obj(logo, -300, 0))
        .offset(0)
        .add(pass(b_ball, 130, 0))
        .offset(0.5)
      // frame 2
        .add(fade_in(txt_1))
        .chain(0.75)
        .add(pan_obj(txt_1, 0, height))
        .offset(0)
      // frame 3
        .add(pan_obj(slider_1, 0, 0))
        .offset(0.5)
        .add(pan_obj(slider_2, 0, 0))
        .offset(0)
        .add(pass(b_ball, -height, -120))
        .offset(0.5)
      // frame 4
        .add(pan_obj(slider_1, 190, 0))
        .offset(0.5)
        .add(pan_obj(slider_2, 190, 0))
        .offset(0)
        .add(pan_obj(txt_2, 0, 0))
        .chain(0.75)
        .add(pan_obj(txt_2, 0, height))
        .offset(0)
      // frame 5
        .add(pan_obj(txt_2_1, 0, 0))
        .chain(0.75)
        .add(pan_obj(txt_2_1, 0, height))
        .offset(0.25)
        .add(pan_obj(slider_1, 190, 110))
        .offset(0.25)
        .add(pan_obj(slider_2, 190, 110))
        .offset(0)
      // frame 6
        .add(pan_obj(txt_3, 0, 0))
        .offset(0.5)
        .add(pan_obj(boxes, 0, 0))
        .chain(0.5)
        .add(pan_obj(boxes, 0, 70))
        .chain(0)
        .add(pan_obj(txt_3, 0, height))
        .offset(0.5)
      // frame 7
        .add(shift_obj(boxes, 0, 27, 0.75))
        .offset(0)
        .add(pass(b_ball, -135, -65))
        .offset(0.5)
        .add(fade_in([cta, txt_disclaimer]));

      // un-comment debug & scrubber for production
        // scrubber(main_tl);
        // console.log("==========================================");
        // console.log("MAIN TIMELINE: ");
        // console.log(main_tl);

    /* User Interactions - cta functionality
	  =============================================================== */
    // cta animation
    function run_cta(){
      hit.addEventListener("mouseenter", function(){
        return new builderTimeLine({repeat: 1, yoyo: true})
          .to(cta, 0.5, {scale: 1.05, ease: Power3.easeInOut});
      });
    // call dribble animation on end
    dribble(b_ball);
    }

  }); // preloadImages()
}; // main()

/* DeBugger - uncomment for production
=============================================================== */
// var local_host = "http://localhost:8080",
//     local_file = "file://",
//     staging_server = "https://banners.merkleyandpartners.com/";

// if (window.location.origin == local_host || window.location.origin == local_file){
//     console.log("==========================================");
//     console.log("INCLUDES: ");
//     machine.include(["../deBug.min.js"]);
// }
