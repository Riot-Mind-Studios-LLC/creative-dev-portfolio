/* Banner Info
------------------
Mercedes Benz - Canada Spring Sales
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
        "bg.jpg",
        "txt_3.png",
      	"txt_2.png",
      	"txt_1.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg = machine.createElement({id:"bg", backgroundImage: "bg.jpg", retina: true, parent: banner});
            var txt_3 = machine.createElement({id:"txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
            var txt_2 = machine.createElement({id:"txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
            var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
      TweenMax.set([txt_1, txt_2, txt_3], {opacity: 0, y: "+10"});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, y: 0, ease: Power2.easeInOut});
    };

    // fade out animation
    var fade_out = function(obj){
      return new builderTimeLine()
        .to(obj, 0.75, {opacity: 0, ease: Power1.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine()
      // offset
        .offset(0.25)

      // frame
        .add(fade_in(txt_1))
        .chain(2)
        .add(fade_out(txt_1))
        .offset(0.5)
        .add(fade_in(txt_2))
        .chain(2)
        .add(fade_out(txt_2))
        .offset(0.5)
        .add(fade_in(txt_3));

      // un-comment debug & scrubber for production
        // scrubber(main_tl);
        // console.log("==========================================");
        // console.log("MAIN TIMELINE: ");
        // console.log(main_tl);

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
