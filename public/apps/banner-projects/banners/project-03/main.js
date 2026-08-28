/* Banner Info
------------------
Captain Ds - Cajun Promo | Cajun Catfish
Adrian Velazquez
Creative Developer
2023
Email: adrian.velazquez@merkleyandpartners.com
------------------
For: Captain Ds
------------------ */

/*
Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 300,// change banner width
      height = 250,// change banner height
      images = [// preload image assets
        "bg.jpg", 
        "txt_1.png", 
        "txt_2_1.png", 
        "txt_2.png", 
        "txt_2_2.png", 
        "txt_3.png", 
        "txt_3_1.png", 
        "txt_4.png", 
        "food_1.png", 
        "food_2.png", 
        "food_3.png", 
        "cta.png", 
        "logo.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg = machine.createElement({id: "bg", backgroundImage: "bg.jpg", retina: false, parent: banner});
            // txt
            var txt_1 = machine.createElement({id: "txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var txt_2_1 = machine.createElement({id: "txt_2_1", backgroundImage: "txt_2_1.png", retina: true, parent: banner});
            // txt + containers
            var txt_2_container = machine.createElement({id: "txt_2_container", overflow: "hidden", left: 111, top: 8, parent: banner});
                var txt_2 = machine.createElement({id: "txt_2", backgroundImage: "txt_2.png", retina: true, parent: txt_2_container});
            var txt_2_2_container = machine.createElement({id: "txt_2_2_container", overflow: "hidden", left: 42, top: 61, parent: banner});
                var txt_2_2 = machine.createElement({id: "txt_2_2", backgroundImage: "txt_2_2.png", retina: true, parent: txt_2_2_container});
            var txt_3_container = machine.createElement({id: "txt_3_container", overflow: "hidden", left: 13, top: 29, parent: banner});
                var txt_3 = machine.createElement({id: "txt_3", backgroundImage: "txt_3.png", retina: true, parent: txt_3_container});
            var txt_3_1_container = machine.createElement({id: "txt_3_1_container", overflow: "hidden", left: 119, top: 59, parent: banner});
                var txt_3_1 = machine.createElement({id: "txt_3_1", backgroundImage: "txt_3_1.png", retina: true, parent: txt_3_1_container});
            var txt_4_container = machine.createElement({id: "txt_4_container", overflow: "hidden", left: 82, top: 40, parent: banner});
                var txt_4 = machine.createElement({id: "txt_4", backgroundImage: "txt_4.png", retina: true, parent: txt_4_container});
            // food
            var food_container = machine.createElement({id: "food_container", width: width * 3, height: height, overflow: "hidden", parent: banner});
                var food_1 = machine.createElement({id: "food_1", backgroundImage: "food_1.png", retina: false, parent: food_container});
                var food_2 = machine.createElement({id: "food_2", backgroundImage: "food_2.png", retina: false, parent: food_container});
                var food_3 = machine.createElement({id: "food_3", backgroundImage: "food_3.png", retina: false, parent: food_container});
            // misc
            var cta = machine.createElement({id: "cta", backgroundImage: "cta.png", left: 167, top: 220, retina: true, parent: banner});
            var logo = machine.createElement({id: "logo", backgroundImage: "logo.png", left: 10, top: 186, retina: true, parent: banner});
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Element Workers - vars, const, obj, arrays
	  =============================================================== */
    // frame text assets
      var frame_2_txt= [txt_2_container, txt_2_1, txt_2_2_container];

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
      // food
      TweenMax.set(food_2, {x: width});
      TweenMax.set(food_3, {x: width * 2});
      // txt containers
      TweenMax.set(txt_2_container, {width: txt_2.get("width"), height: txt_2.get("height")});
      TweenMax.set(txt_2_2_container, {width: txt_2_2.get("width"), height: txt_2_2.get("height")});
      TweenMax.set(txt_3_container, {width: txt_3.get("width"), height: txt_3.get("height")});
      TweenMax.set(txt_3_1_container, {width: txt_3_1.get("width"), height: txt_3_1.get("height")});
      TweenMax.set(txt_4_container, {width: txt_4.get("width"), height: txt_4.get("height")});
      // txt
      TweenMax.set(frame_2_txt, {y: -height});
      TweenMax.set(txt_3, {y: txt_3_container.get("height")});
      TweenMax.set(txt_3_1, {y: -txt_3_1_container.get("height")});
      TweenMax.set(txt_4, {y: -txt_4_container.get("height")});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // txt 1 out animation
    var txt_1_out = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {opacity: 0, y: 100, scale: 0, ease: Power2.easeInOut});
    };
    // txt slide in animation
    var txt_slide_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {y: 0, x: 0, ease: Power2.easeInOut});
    };
    // slide food animation
    var slide_food = function(obj, dist){
      return new builderTimeLine()
        .to(obj, 1.5, {x: dist, ease: Power2.easeInOut});
    };
    // txt 2_1 slide animation
    var txt_2_1_slide = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {x: 40, ease: Power2.easeInOut});
    };
    // txt 2_1 reset animation
    var txt_2_1_reset = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {x: 0, y: -20, ease: Power2.easeInOut});
    };
    // unmask txt animation
    var unmask_txt = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {y: 0, ease: Power2.easeInOut});
    };
    // mask txt down animation
    var mask_txt_down = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {y: obj.get("height"), ease: Power2.easeInOut});
    };
    // mask txt up animation
    var mask_txt_up = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {y: -obj.get("height"), ease: Power2.easeInOut});
    };
    // pulse the logo
    var logo_pulse = function(obj){
      return new builderTimeLine({repeat: 9, yoyo: true})
      .to(logo, 1.25, {scale: 1.05, transformOrigin: "center center", ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
        .add(logo_pulse(logo))
      // offset
        .offset(1.75)
      // frame 1
        .add(txt_1_out(txt_1))
        .offset(0)
        .add(txt_slide_in(frame_2_txt))
        .chain(2)
      // frame 2
        .add(slide_food(food_container, -width))
        .offset(0)
        .add(txt_2_1_slide(txt_2_1))
        .offset(0.5)
        .add(unmask_txt(txt_3))
        .offset(0)
        .add(mask_txt_down(txt_2_2))
        .offset(0)
        .add(unmask_txt(txt_3_1))
        .chain(2)
      // frame 3
        .add(slide_food(food_container, -width*2))
        .offset(0)
        .add(mask_txt_up(txt_2))
        .offset(0)
        .add(mask_txt_up(txt_3))
        .offset(0)
        .add(mask_txt_down(txt_3_1))
        .offset(0.5)
        .add(txt_2_1_reset(txt_2_1))
        .offset(0.25)
        .add(unmask_txt(txt_4));

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
          .to(cta, 0.5, {scale: 1.03, ease: Power3.easeInOut});
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
