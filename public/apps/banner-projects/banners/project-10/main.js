/* Banner Info
------------------
Mercedes Benz Canada Holiday December Offer EN 
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
  var width = 300,// change banner width
      height = 600,// change banner height
      images = [// preload image assets
        "bg.jpg",
      	"txt_1.png", 
        "cta.png",
        "particle_1.png",
        "particle_2.png",
        "particle_3.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {
    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});
        // create banner elements in here
            var bg = machine.createElement({id:"bg", backgroundImage: "bg.jpg", retina: true, parent: banner});
            var particle_container = machine.createElement({id: "particle_container", width: width, height: height, parent: banner});
                var particle_2 = machine.createElement({id: "particle_2", backgroundImage: "particle_2.png", retina: true, parent: particle_container});
                var particle_1 = machine.createElement({id: "particle_1", backgroundImage: "particle_1.png", retina: true, parent: particle_container});
                var particle_3 = machine.createElement({id: "particle_3", backgroundImage: "particle_3.png", retina: true, parent: particle_container});
            var txt_1 = machine.createElement({id:"txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
            var cta = machine.createElement({id:"cta", backgroundImage: "cta.png", left: 86, top: 417, retina: true, parent: banner});
        
            /* Create particle system
            =============================================================== */
            TweenMax.set([particle_1, particle_2, particle_3], {left: width, top: height});
            // snow system
            var snow = new machine.ParticleSystem({
              id: "particle_system",
              images: ["particle_1.png", "particle_2.png", "particle_3.png"],
              width: width,
              height: height,
              lifespan: 10, // number of particles = maxParticles / lifespan
              maxParticles: 200, // number of particles = maxParticles / lifespan
              autoStart: false, // particle launches with banner
              fps: 60, // less than 60 you can cap the framerate
              turbulence: 0.4, // Acceleration on both x and y axis, randomized between -turbulence and turbulence and applied on each frame
              friction: 0.9, // A multiplier for the particle's speed, applied each frame. Usually a value between 0.9 - 1.0 (1.0 is no friction)
              gravity: 0.25, // The continuous acceleration on the y axis (can be negative!)
              areaPadding: 10, // padding outside banner area on each side
              wind: -0.01, // The continuous acceleration on the x axis
              rotationSpeed: 0.0025, // The amount of rotation on every frame
              rotation: 0.015, // will affect each individual particle, NOT the particle system itself
              opacity: 0.85,
              vx: 0,// The particle's speed on the x axis when emitted
              vy: -1,// The particle's speed on the y axis when emitted
              emitter: {x: 0, y: 0, width: width+100, height: 15},
              parent: particle_container,
              onEmitParticle: function(p) {
                  // everytime a particles gets emitted, its scale will be set to a randomized value, giving all particles unique sizes
                  p.scale = machine.utils.randomRange(0.15, 0.45);
              },
              onUpdateParticle: function(p) {
                  // opacity will go from 1 - 0 on the last 15% of the particle's lifespan
                  p.opacity = machine.utils.map(p.progress, 0.85, 1, 1, 0, true); 
              }
            });

            // hit, border, studio enabler exit element
            var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});
        // create banner elements in here

    /* Asset Adjustments - set attributes to elements for animation
	  =============================================================== */
    // set attributes to elements for animation
    TweenMax.set([txt_1, cta], {opacity: 0, y: +10});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // obj in animation
    var obj_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, y: 0, ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta})
      // offset
        .offset(0.5)

      // frame
        .add(obj_in(txt_1))
        .chain(3)
        .add(obj_in(cta))
        .offset(0)
        .add(function(){
            // begin snow particle system
            snow.start();
            // console.log("It's snowing");
        })
        .chain(10.5) // run snow to 15 seconds
        .add(function(){
            // stop snow emissions, but let active particles finish their run
            snow.stop();
            // console.log("The snow stopped");
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
