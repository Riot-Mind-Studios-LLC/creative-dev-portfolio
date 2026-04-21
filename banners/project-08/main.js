/* Banner Info
------------------
Mercedes Benz Canada CPO April GLE
Adrian Velazquez
Creative Developer
2025
------------------
For: Mercedes Benz
------------------ */

/*
Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 970,// change banner width
      height = 250,// change banner height
      images = [// preload image assets
        "bg_1.jpg",
      	"bg_2.jpg",
      	"bg_3.jpg",
      	"txt_3.png",
      	"txt_2.png",
      	"txt_1.png",
      	"logo.png",
        "cta_txt.png",
        "cta_txt_active.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg_container = machine.createElement({id:"bg_container", width: width, height: "100%", parent: banner});
                var bg_1 = machine.createElement({id:"bg_1", backgroundImage: "bg_1.jpg", retina: false, parent: bg_container});
                var bg_2 = machine.createElement({id:"bg_2", backgroundImage: "bg_2.jpg", retina: false, parent: bg_container});
                var bg_3 = machine.createElement({id:"bg_3", backgroundImage: "bg_3.jpg", retina: false, parent: bg_container});
            var txt_3 = machine.createElement({id:"txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
            var txt_2 = machine.createElement({id:"txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
            var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var logo = machine.createElement({id:"logo", backgroundImage: "logo.png", retina: true, parent: banner});
            var cta_box = machine.createElement({id:"cta_box", width: 106, height: 34, left: 738, top: 106, border: "1px solid #ffffff", backgroundColor: "transparent", overflow: "hidden", parent: banner});
                var cta_txt = machine.createElement({id:"cta_txt", backgroundImage: "cta_txt.png", retina: true, left: 0, top: 0, parent: cta_box});
                var cta_txt_active = machine.createElement({id:"cta_txt_active", backgroundImage: "cta_txt_active.png", retina: true, left: 0, top: 0, parent: cta_box});
            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    // get bgs and banner individual dimenions
      var bg_1_height = bg_1.get("height");
      var bg_2_height = bg_2.get("height");
      var bg_3_height = bg_3.get("height");
      var banner_height = height;

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
      TweenMax.set([txt_1, txt_2, txt_3, cta_box], {opacity: 0, y: "+15"});
      TweenMax.set(cta_txt_active, {y: -cta_box.get("height")});
      
    // stack the bg images
      function stack_bgs(){
        // set the bg container based on total bg dimensions
          TweenMax.set(bg_container, {height: bg_stacked_height, overflow: "hidden"});
        // stack bgs using their stacked dimensions
          TweenMax.set(bg_1, {y: 0});// bg_1
          TweenMax.set(bg_2, {y: bg_1_height});// bg_2
          TweenMax.set(bg_3, {y: bg_2_height + bg_1_height});// bg_3
      }
      
    // bg distance to travel calculations
      var move = {
        // pan_dist_1: function(){
        //   var move_1 = -bg_1_height -  (-banner_height);
        //   console.log("bg 1 moved:" + move_1 + " px");
        //   return move_1;
        // },
        pan_dist_2: function(){
          var move_2 = -bg_1_height + -bg_2_height - (-banner_height);
          console.log("bg 2 moved:" + move_2 + " px");
          return move_2;
        },
        pan_dist_3: function(){
          var move_3 = -bg_1_height + -bg_2_height + -bg_3_height - (-banner_height);
          console.log("bg 3 moved:" + move_3 + " px");
          return move_3;
        }
      };

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // bg panning animation
    var slide_in = function(dist){
      return new builderTimeLine()
        .to(bg_container, 2.25, {y: dist, ease: Power1.easeInOut});
    };
    // txt in animation
    var txt_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, y: 0, ease: Power2.easeInOut});
    };
    // txt out annimation
    var txt_out = function(obj, dist){
      return new builderTimeLine()
        .to(obj, 2.25, {y: dist, ease: Power1.easeInOut});
    };
    // fade out annimation
    var fade_out = function(obj, dist){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 0, ease: Power1.easeInOut});
    };
    // obj in animation
    var obj_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, x: 0, y: 0, ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
      // stack bgs
        .add(stack_bgs)
      // offset
        .offset(0.1)
      // frame 1
        .add(txt_in(txt_1))
        .chain(1)
        .add(txt_out(txt_1, -height))
        .offset(0)
      // frame 2
        .add(slide_in(move.pan_dist_2))
        .offset(2)
        .add(txt_in(txt_2))
        .chain(1)
        .add(txt_out(txt_2, -height))
        .offset(0)
      // frame 3
        .add(slide_in(move.pan_dist_3))
        .offset(2)
        .add(txt_in(txt_3))
        .offset(0.25)
        .add(obj_in(cta_box));

      // un-comment debug & scrubber for production
        // scrubber(main_tl);
        // console.log("==========================================");
        // console.log("MAIN TIMELINE: ");
        // console.log(main_tl);

    /* User Interactions - cta functionality
	  =============================================================== */
    // cta animation
    function run_cta(){
      // cta animation on over
      hit.addEventListener("mouseenter", function(){
        return new builderTimeLine()
          .to(cta_box, 0.5, {backgroundColor: "#fff", ease: Power3.easeInOut})
          .offset(0)
          .to(cta_txt, 0.5, {y: cta_box.get("height"), transformOrigin: "center center", ease: Power3.easeInOut})
          .offset(0)
          .to(cta_txt_active, 0.5, {y: 0, transformOrigin: "center center", ease: Power3.easeInOut});
      });
      // cta animation on out
      hit.addEventListener("mouseleave", function(){
        return new builderTimeLine()
          .to(cta_box, 0.5, {backgroundColor: "transparent", ease: Power3.easeInOut})
          .offset(0)
          .to(cta_txt_active, 0.5, {y: -cta_box.get("height"), transformOrigin: "center center", ease: Power3.easeInOut})
          .offset(0)
          .to(cta_txt, 0.5, {y: 0, transformOrigin: "center center", ease: Power3.easeInOut});
      });
    }

    /* Helper functions - utilities for banner
  	=============================================================== */
    // get total, stacked bg dimensions
    function bg_stacked_height(){
      return bg_1_height + bg_2_height + bg_3_height;
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
