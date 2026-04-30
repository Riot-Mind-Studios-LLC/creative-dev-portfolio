/* Banner Info
------------------
White Castle - i4 Display Chicken Sliders
------------------
For: White Castle
------------------ */

/*
Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 300,// change banner width
      height = 250,// change banner height
      images = [// preload image assets
        "endframe_sliders.png", 
        "main_slider.png", 
        "txt_1.png", 
        "txt_2.png", 
        "txt_3.png", 
        "txt_4.png", 
        "txt_4_1.png", 
        "txt_4_2.png", 
        "txt_disclaimer.png", 
        "txt_legal.png", 
        "cta.png", 
        "logo.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var endframe_sliders = machine.createElement({id: "endframe_sliders", backgroundImage: "endframe_sliders.png", retina: false, parent: banner});
            var main_slider = machine.createElement({id: "main_slider", backgroundImage: "main_slider.png", left: 112, top: -21, retina: false, parent: banner});
            var small_slider = machine.createElement({id: "small_slider", backgroundImage: "main_slider.png", left: -63, top: 49, retina: false, parent: banner});
            var txt_1 = machine.createElement({id: "txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var txt_2 = machine.createElement({id: "txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
            var txt_3 = machine.createElement({id: "txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
            var txt_4 = machine.createElement({id: "txt_4", backgroundImage: "txt_4.png",retina: true, parent: banner});
            var txt_4_1 = machine.createElement({id: "txt_4_1", backgroundImage: "txt_4_1.png", retina: true, parent: banner});
            var txt_4_2 = machine.createElement({id: "txt_4_2", backgroundImage: "txt_4_2.png", retina: true, parent: banner});
            var cta = machine.createElement({id: "cta", backgroundImage: "cta.png", left: 98, top: 200, retina: true, parent: banner});
            var logo = machine.createElement({id: "logo", backgroundImage: "logo.png", left: 46, top: 35, retina: true, parent: banner});
            var endframe_logo = machine.createElement({id: "endframe_logo", backgroundImage: "logo.png", left: -18, top: -47, retina: true, parent: banner});
            // legal bg + legal copy elements
            var legal_bg = machine.createElement({backgroundColor: "#000", width: width, height: height, parent: banner});
            var txt_legal = machine.createElement({id: "txt_legal", backgroundImage: "txt_legal.png", retina: true, parent: banner});
            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
            var txt_disclaimer = machine.createElement({id: "txt_disclaimer", backgroundImage: "txt_disclaimer.png", left: 123, top: 237, retina: true, parent: banner});
        // create banner elements in here

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
      TweenMax.set([txt_1, txt_2, txt_3, txt_4, txt_4_1, txt_4_2, txt_disclaimer, endframe_logo, small_slider, endframe_sliders, cta, logo], {opacity: 0});
      TweenMax.set(main_slider, {x: 188});
      TweenMax.set(small_slider, {scale: 0.45, y: -10});
      TweenMax.set([logo, txt_3, txt_4], {scale: 1.1, y: -10});
      TweenMax.set(txt_4_2, {scale: 1.1, y: +10});
      TweenMax.set(endframe_logo, {scale: 0.3});
      TweenMax.set(legal_bg, {y: height, opacity: 0.75});
      TweenMax.set(txt_legal, {y: height});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // element in animation
    var element_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, scale: 1, x: 0, y: 0, ease: Power2.easeInOut});
    };
    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, ease: Power2.easeInOut});
    };
    // fade out animation
    var fade_out = function(obj){
      return new builderTimeLine()
        .to(obj, 0.75, {opacity: 0, ease: Power1.easeInOut});
    };
     // slide animation
    var slide = function(obj, dist){
      return new builderTimeLine()
        .to(obj, 1, {x: dist, ease: Power1.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})

      //
        .add(element_in(logo))
        .chain(1)
        .add(fade_out(logo))
      //
        .offset(0.5)
        .add(element_in(main_slider))
        .offset(0.5)
        .add(fade_in(txt_1))
        .chain(1)
        .add(fade_out(txt_1))
        .offset(0.5)
      //
        .add(slide(main_slider, -385))
        .offset(0.5)
        .add(fade_in(txt_2))
        .chain(1)
        .add(fade_out(txt_2))
        .offset(0)
        .add(slide(main_slider, -800))
        .offset(0.5)
      //
        .add(fade_in(small_slider))
        .offset(0.5)
        .add(element_in(txt_3))
        .chain(1)
        .add(fade_out([small_slider, txt_3]))
        .offset(0.5)
      //
        .add(fade_in(endframe_sliders))
        .offset(0.5)
        .add(element_in([txt_4, txt_4_2]))
        .offset(0.5)
        .add(fade_in([txt_4_1, endframe_logo]))
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
    }
    // txt_disclaimer animation on over
      txt_disclaimer.addEventListener("mouseenter", function(){
        return new builderTimeLine()
          .to(txt_disclaimer, 0.25, {opacity: 0, ease: Power3.easeOut})
          .offset()
          .to([legal_bg, txt_legal], 0.5, {y: 0, ease: Power3.easeInOut});
      });
      // txt_disclaimer animation on out
      txt_disclaimer.addEventListener("mouseleave", function(){
        return new builderTimeLine()
          .to([legal_bg, txt_legal], 0.5, {y: height, ease: Power3.easeInOut})
          .chain()
          .to(txt_disclaimer, 0.5, {opacity: 1, ease: Power3.easeOut});
      });

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
