/* Banner Info
------------------
Mercedes Benz - Canada Masters
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
      	"txt_1.png", 
      	"cta_txt.png",
        "cta_txt_active.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg = machine.createElement({id:"bg", backgroundImage: "bg.jpg", retina: true, parent: banner});
            var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var cta_box = machine.createElement({id:"cta_box", width: 35, height: 12, left: 244, top: 22, border: "1px solid #ffffff", backgroundColor: "transparent", overflow: "hidden", parent: banner});
                var cta_txt = machine.createElement({id:"cta_txt", backgroundImage: "cta_txt.png", retina: true, left: 0, top: 0, parent: cta_box});
                var cta_txt_active = machine.createElement({id:"cta_txt_active", backgroundImage: "cta_txt_active.png", retina: true, left: 0, top: 0, parent: cta_box});
            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
      TweenMax.set([txt_1, cta_box], {opacity: 0});
      TweenMax.set(cta_box, {y: "+10"});
      TweenMax.set(cta_txt_active, {y: -cta_box.get("height")});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, y: 0, ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
      // offset
        .offset(1.5)

      // frame
        .add(fade_in(txt_1))
        .offset(0.5)
        .add(fade_in(cta_box));

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
