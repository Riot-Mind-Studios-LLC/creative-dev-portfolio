/* Banner Info
------------------
Mercedes Benz F1 2026
Adrian Velazquez
Creative Developer
2026
------------------
For: Mercedes Benz
------------------ */

/*
Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 320,// change banner width
      height = 50,// change banner height
      images = [// preload image assets
        "bg_1.jpg",
      	"bg_2.jpg",
      	"logo.png",
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg_container = machine.createElement({id:"bg_container", width: width, height: "100%", parent: banner});
                var bg_1 = machine.createElement({id:"bg_1", backgroundImage: "bg_1.jpg", retina: true, parent: bg_container});
                var bg_2 = machine.createElement({id:"bg_2", backgroundImage: "bg_2.jpg", retina: true, parent: bg_container});
            var logo = machine.createElement({id:"logo", backgroundImage: "logo.png", retina: true, parent: banner});
            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    // get bgs and banner individual dimenions
      var bg_1_height = bg_1.get("height");
      var bg_2_height = bg_2.get("height");
      var banner_height = height;

    // stack the bg images
      function stack_bgs(){
        // set the bg container based on total bg dimensions
          TweenMax.set(bg_container, {height: bg_stacked_height, overflow: "hidden"});
        // stack bgs using their stacked dimensions
          TweenMax.set(bg_1, {y: 0});// bg_1
          TweenMax.set(bg_2, {y: bg_1_height});// bg_2
      }
      
    // bg distance to travel calculations
      var move = {
        pan_dist_2: function(){
          var move_2 = -bg_1_height + -bg_2_height - (-banner_height);
          console.log("bg 2 moved:" + move_2 + " px");
          return move_2;
        }
      };

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // bg panning animation
    var slide_in = function(dist){
      return new builderTimeLine()
        .to(bg_container, 2.25, {y: dist, ease: Power1.easeInOut});
    };

    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 0.5, {opacity: 1, y: 0, ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine()
      // stack bgs
        .add(stack_bgs)
      // offset
        .chain(2)
        .add(slide_in(move.pan_dist_2));

      // un-comment debug & scrubber for production
        // scrubber(main_tl);
        // console.log("==========================================");
        // console.log("MAIN TIMELINE: ");
        // console.log(main_tl);

    /* Helper functions - utilities for banner
  	=============================================================== */
    // get total, stacked bg dimensions
    function bg_stacked_height(){
      return bg_1_height + bg_2_height;
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
