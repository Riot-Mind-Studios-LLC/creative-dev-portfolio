/* Banner Info
------------------
Band-Aid OS 2025 Non-New
Adrian Velazquez
Creative Developer
2025
------------------
For: Band-Aid
------------------ */

/*
Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 970,// change banner width
      height = 250,// change banner height
      images = [// preload image assets
        "pack_bg.jpg",
        "wound_bg_1.jpg",
        "wound_bg_2.jpg",
        "wound_bg_3.jpg",
        "wound_bg_4.jpg",
        "wound_bg_5.jpg",
        "cta.png",
        "txt_1.png",
        "txt_1_1.png",
        "txt_2.png",
        "txt_3.png",
        "txt_4.png",
        "txt_num_1.png",
        "txt_num_2.png",
        "txt_num_3.png",
        "txt_num_4.png",
        "txt_num_5.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#fff", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            // txt assets
            var pack_bg = machine.createElement({id:"pack_bg", backgroundImage: "pack_bg.jpg", left: 500, top: 0, retina: true, parent: banner});
            var txt_4 = machine.createElement({id:"txt_4", backgroundImage: "txt_4.png", retina: true, parent: banner});
            var txt_3 = machine.createElement({id:"txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
            // wound bg assets
            var wound_bg_container = machine.createElement({id:"wound_bg_container", left: 0, top: 0, overflow: "hidden", parent: banner});
                var wound_bg_5 = machine.createElement({id:"wound_bg_5", backgroundImage: "wound_bg_5.jpg", retina: true, parent: wound_bg_container});
                var wound_bg_4 = machine.createElement({id:"wound_bg_4", backgroundImage: "wound_bg_4.jpg", retina: true, parent: wound_bg_container});
                var wound_bg_3 = machine.createElement({id:"wound_bg_3", backgroundImage: "wound_bg_3.jpg", retina: true, parent: wound_bg_container});
                var wound_bg_2 = machine.createElement({id:"wound_bg_2", backgroundImage: "wound_bg_2.jpg", retina: true, parent: wound_bg_container});
                var wound_bg_1 = machine.createElement({id:"wound_bg_1", backgroundImage: "wound_bg_1.jpg", retina: true, parent: wound_bg_container});
            // txt assets
            var txt_2 = machine.createElement({id:"txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
            var txt_1_1 = machine.createElement({id:"txt_1_1", backgroundImage: "txt_1_1.png", retina: true, parent: banner});
            var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            // txt num assets
            var txt_num_container = machine.createElement({id:"txt_num_container", left: 22, top: 54, overflow: "hidden", parent: banner});
                var txt_num_5 = machine.createElement({id:"txt_num_5", backgroundImage: "txt_num_5.png", retina: true, parent: txt_num_container});
                var txt_num_4 = machine.createElement({id:"txt_num_4", backgroundImage: "txt_num_4.png", retina: true, parent: txt_num_container});
                var txt_num_3 = machine.createElement({id:"txt_num_3", backgroundImage: "txt_num_3.png", retina: true, parent: txt_num_container});
                var txt_num_2 = machine.createElement({id:"txt_num_2", backgroundImage: "txt_num_2.png", retina: true, parent: txt_num_container});
                var txt_num_1 = machine.createElement({id:"txt_num_1", backgroundImage: "txt_num_1.png", retina: true, parent: txt_num_container});
            // cta
            var cta = machine.createElement({id:"cta", backgroundImage: "cta.png", left: 876, top: 213, retina: true, parent: banner});
            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
    TweenMax.set([txt_1_1, cta], {opacity: 0});
    TweenMax.set(cta, {y: +10});
    TweenMax.set(txt_num_container, {height: txt_num_5.get("height"), width: txt_num_5.get("width")});
    TweenMax.set([txt_num_2, txt_num_3, txt_num_4, txt_num_5], {scale: 0, y: txt_num_container.get("height")});
    TweenMax.set(wound_bg_container, {height: wound_bg_1.get("height"), width: wound_bg_1.get("width")});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, y: 0, x: 0, ease: Power2.easeInOut});
    };
    // num slide animation
    var num_slide = function([obj, obj_2]){
      return new builderTimeLine()
        .to(obj, 1, {y: -txt_num_container.get("height"), scale: 0, ease: Power2.easeInOut})// slide out
        .offset(0)
        .to(obj_2, 1, {y: 0, scale: 1, ease: Power2.easeInOut});// slide in
    };
    // wound bg slide animation
    var wound_bg_timelapse = function(obj){
      return new builderTimeLine()
        .to(obj, 0.75, {opacity: 0, TransformOrigin: "center center", ease: Power2.easeInOut})// slide
    };
    // quick_fade animation
    var quick_fade = function([obj, obj_2]){
      return new builderTimeLine()
        .to(obj, 0.5, {opacity: 0, ease: Power2.easeInOut})// fade out
        .offset(0)
        .to(obj_2, 1, {opacity: 1, ease: Power2.easeInOut});// fade in
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
      // offset
      .offset(1.25)
      // frame 1
      .add(wound_bg_timelapse(wound_bg_1))
      .offset(0)
      .add(quick_fade([txt_1, txt_1_1]))
      // frame 2
      .offset(0.25)
      .add(num_slide([txt_num_1, txt_num_2]))
      .chain(0.2)
      // frame 3
      .add(wound_bg_timelapse(wound_bg_2))
      .offset(0.25)
      .add(num_slide([txt_num_2, txt_num_3]))
      .chain(0.2)
      // frame 4
      .add(wound_bg_timelapse(wound_bg_3))
      .offset(0.25)
      .add(num_slide([txt_num_3, txt_num_4]))
      .chain(0.2)
      // endframe
      .add(wound_bg_timelapse(wound_bg_4))
      .offset(0.25)
      .add(num_slide([txt_num_4, txt_num_5]))
      .offset(0.5)
      .add(fade_in(cta));

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
