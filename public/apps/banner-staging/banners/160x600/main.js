/* Captain Ds Promo 5 Clams & Soup
------------------
Banner Name
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
  var width = 160,// change banner width
      height = 600,// change banner height
      images = [// preload image assets
        "txt_3.png",	
        "txt_2.png",
        "txt_1.png", 
        "logo.png",
        "cta.png",
        "logo.png",
        "plates.png",
        "particle_1.png",
        "particle_2.png",
        "particle_3.png",
        "particle_4.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#00a8e4", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
        var particle_container = machine.createElement({id: "particle_container", width: width, height: height, parent: banner});
            var particle_2 = machine.createElement({id: "particle_2", backgroundImage: "particle_2.png", retina: true, parent: particle_container});
            var particle_1 = machine.createElement({id: "particle_1", backgroundImage: "particle_1.png", retina: true, parent: particle_container});
            var particle_3 = machine.createElement({id: "particle_3", backgroundImage: "particle_3.png", retina: true, parent: particle_container});
            var particle_4 = machine.createElement({id: "particle_4", backgroundImage: "particle_4.png", retina: true, parent: particle_container});
            /* Create particle systems
            =============================================================== */
            // snow system
            var snow = new machine.ParticleSystem({
              id: "particle_system",
              images: ["particle_1.png", "particle_2.png", "particle_3.png", "particle_4.png"],
              lifespan: 4, // -- number of particles = maxParticles / lifespan
              maxParticles: 30, // -- number of particles = maxParticles / lifespan
              autoStart: false, // particle launches with banner
              fps: 60, // less than 60 you can cap the framerate
              turbulence: 0.12, // Acceleration on both x and y axis, randomized between -turbulence and turbulence and applied on each frame
              friction: 0.9, // A multiplier for the particle's speed, applied each frame. Usually a value between 0.9 - 1.0 (1.0 is no friction)
              gravity: 0.35, // The continuous acceleration on the y axis (can be negative!)
              areaPadding: 100, // padding outside banner area on each side
              wind: 0, // The continuous acceleration on the x axis
              rotationSpeed: 0.005, // The amount of rotation on every frame
              rotation: 0.025, // will affect each individual particle, NOT the particle system itself
              emitter: {x: 0, y: -40, width: width, height: 50},
              parent: particle_container,
              onEmitParticle: function(p) {
                // everytime a particles gets emitted, its scale will be set to a randomized value, giving all particles unique sizes
                p.scale = machine.utils.randomRange(0.25, 0.75);
              }
            });
        
        var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
        var txt_2 = machine.createElement({id:"txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
        var txt_3 = machine.createElement({id:"txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
        var plates = machine.createElement({id:"plates", backgroundImage: "plates.png", retina: true, parent: banner});
        var logo = machine.createElement({id:"logo", backgroundImage: "logo.png", retina: true, parent: banner});
        var cta = machine.createElement({id:"cta", backgroundImage: "cta.png", left: 29, top: 491, retina: true, parent: banner});
        // hit, border, studio enabler exit element
        var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Element Workers - vars, const, obj, arrays
	  =============================================================== */
    TweenMax.set([particle_1, particle_2, particle_3, particle_4], {left: width, top: height});

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
    TweenMax.set([plates, cta], {opacity: 0});
    TweenMax.set([txt_1, txt_2, txt_3], {y: 100, scale: 0, transformOrigin: "center center"});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // cta pulse animation
    var cta_pulse = function(obj){
      return new builderTimeLine({repeat: 9, yoyo: true})
        .to(cta, 1, {scale: 1.1, transformOrigin: "center center", ease: Power3.easeInOut});
    };
    // fade in animation
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, ease: Power2.easeInOut});
    };
    // fade out animation
    var fade_out = function(obj){
      return new builderTimeLine()
        .to(obj, 0.75, {opacity: 0, ease: Power2.easeInOut});
    };
    // txt in animation
    var element_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1.5, {x: 0, y: 0, scale: 1, ease: Expo.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
      // particle system start
      .add(function(){
        snow.start();// begin snow particle system
        console.log("It's snowing");
      })
      // main animation
      .offset(1)
      .add(element_in(txt_1))
      .chain(0)
      .add(fade_in(plates))
      .offset(0.5)
      .add(fade_in(cta))
      .chain(0)
      .add(cta_pulse(cta))
      .offset(0.5)
      .add(fade_out(txt_1))
      .offset(0)
      .add(element_in(txt_2))
      .offset(1)
      .add(element_in(txt_3))
      .chain(8) // play until 15 seconds
      // particle system end
      .add(function(){
      snow.stop(true);// stop snow emissions and freeze where they are
      console.log("The snow stopped");
      });

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
          .to(cta, 0.5, {scale: 1.1, transformOrigin: "center center", ease: Power3.easeInOut});
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
