/*
MB Cinderella Banners
Adrian Velazquez
Creative Developer
2021
Email: adrian.velazquez@merkleyandpartners.com
For: Mercedes Benz
src: https://www.cssscript.com/interacitve-touch-particles-canvas/
*/

/* Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 300,
      height = 250,
      images = [
        "hero_bg.jpg", 
        "txt_1.png", 
        "txt_1_1.png", 
        "txt_2.png", 
        "txt_3.png", 
        "txt_3_1.png", 
        "txt_3_border.png", 
        "cta_txt.png", 
        "cta_arrow.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {

    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#fff", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});

    // create banner elements in here
    var hero_bg = machine.createElement({id: "hero_bg", backgroundImage: "hero_bg.jpg", retina: true, parent: banner});
    var canvas = machine.createElement({id: "sparkle", type: "canvas", width: width, height: height, parent: banner});
    var txt_1 = machine.createElement({id: "txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
    var txt_1_1 = machine.createElement({id: "txt_1_1", backgroundImage: "txt_1_1.png", retina: true, parent: banner});
    var txt_2 = machine.createElement({id: "txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
    var txt_3 = machine.createElement({id: "txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
    var txt_3_1 = machine.createElement({id: "txt_3_1", backgroundImage: "txt_3_1.png", retina: true, parent: banner});
    var txt_3_border = machine.createElement({id: "txt_3_border", backgroundImage: "txt_3_border.png", retina: true, parent: banner});
    var cta_txt = machine.createElement({id: "cta_txt", backgroundImage: "cta_txt.png", left: 148, top: 162, retina: true, parent: banner});
    var cta = machine.createElement({id:"cta", width: 11, height: 11, left: 256, top: 161, border: "1.35px solid #27aae1", borderRadius: "4px", parent: banner})
        var cta_arrow = machine.createElement({id:"cta_arrow", backgroundImage: "cta_arrow.png", left: 4, top: 3, retina: true, parent: cta});
    // create banner elements in here

    // hit, border, studio enabler exit element
    var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});

    /* Asset Adjustments - set elements for animation
	  =============================================================== */ 
    // hide elements
    TweenMax.set([txt_1, txt_1_1, txt_2, txt_3, txt_3_1, cta_txt, cta], {opacity: 0});
    // set txt 3 border asset of stage
    TweenMax.set(txt_3_border, {x: -width});
    // set text element y position lower by 10 pixels
    TweenMax.set([txt_1, txt_1_1, txt_3, txt_3_1], {y: +10})

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // elements in
      var element_in = function(obj){
        return new builderTimeLine()
          .to(obj, 1.5, {scale: 1, opacity: 1, x: 0, y: 0, ease: Power3.easeInOut});
      };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({})

    // txt 1 assets
      .add(element_in(txt_1))
      .offset(0.75)
      .add(element_in(txt_1_1))
      .offset(0.75)
    // txt 2
      .add(element_in(txt_2))
      .offset(0.5)
    // txt 3 assets
      .add(element_in(txt_3_border))
      .offset(0.75)
      .add(element_in(txt_3))
      .offset(0.25)
      .add(element_in(txt_3_1))
      .offset(0.75)
    // cta assets
      .add(element_in(cta_txt))
      .offset(0.35)
      .add(element_in(cta))
      ; // main_tl

      // scrubber(main_tl);

    /* cta interactions
	  =============================================================== */
    // cta animation on over
    hit.addEventListener("mouseenter", function(){
      return new builderTimeLine()
        .to(cta, 0.25, {backgroundColor: "#fff", ease: Power3.easeInOut})
        .offset(0.25)
        .to(cta_arrow, 0.15, {x: "+1", ease: Power3.easeOut});
    });

    // cta animation on out
    hit.addEventListener("mouseleave", function(){
      return new builderTimeLine()
        .to(cta, 0.25, {backgroundColor: "trasparent", ease: Power3.easeInOut})
        .offset(0.25)
        .to(cta_arrow, 0.15, {x: 0, ease: Power3.easeIn});
    });

    /* Sparkle mouse interactions
  	=============================================================== */
    var sparkle = document.querySelector('canvas');
    c = sparkle.getContext('2d');

    // get mouse positions
    var mouse = {
        x: undefined,
        y: undefined
    };
    // track mouse on desktop
    banner.addEventListener('mousemove', function(event){
      mouse.x = event.x;
      mouse.y = event.y;
      drawCircles();
    });
    // track mouse on mobile
    banner.addEventListener("touchmove", function(event){
      var touch = event.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      drawCircles();
    });

    function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.minRadius = radius;
      this.vx = vx;
      this.vy = vy;
      this.birth = birth;
      this.life = life;
      this.opacity = opacity;
      this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = 'rgba(' + rgb +','+ this.opacity +')';
        c.fill();
      };

      this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.vx = -this.vx;
        };

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.vy = -this.vy;
        };

        this.x += this.vx;
        this.y += this.vy;
        // Set sparkle opacity
        this.opacity = 1- (((frame - this.birth) * 1) / this.life);
        // this.opacity = 0.5;

        if (frame > this.birth + this.life){
            for (var i = 0; i < circleArray.length; i++){
                if (this.birth == circleArray[i].birth && this.life == circleArray[i].life){
                    circleArray.splice(i, 1);
                    break;
                };
            };
        } else{
            this.draw();
        };
      }; // end this
    }; // end Circle prototype

    var circleArray = [];

    function initCanvas() {
        circleArray = [];
    };

    // Create sparkles and set their colors
    var colorArray = [
        '246,176,65', // purple
        '92,27,96', // orange
        '193,226,244' // blue
    ];

    function drawCircles(){
      for (var i = 0; i < 4; i++) {
        var radius = Math.floor(Math.random() * 1) + 1;
        var vx = (Math.random() * 2) - 1;
        var vy = (Math.random() * 2) - 1;
        var spawnFrame = frame;
        var rgb = colorArray[Math.floor(Math.random() * colorArray.length)];

        // Set sparkle spread and amount
        var life = 100; 
        
        circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));
      };
    };

    var frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame += 1;
      c.clearRect(0, 0, innerWidth, innerHeight);

      for (var i = 0; i < circleArray.length; i++ ){
          circleArray[i].update();
      };  
    };

    // Initiate canvas then animate on interaction
    initCanvas();
    animate();

    /* Scrubber + Debugger
  	=============================================================== */
  	function scrubber(tl){

      // set up possible user locations
      var local_host = "http://localhost:8080",
          local_file = "file://",
          staging_server = "http://work.merkleyandpartners.com/";

      // check to see if GSAP has loaded
      function loaded(){
        var a = window.TweenMax;
        var b = window.machine;
        if(a && b){
          console.log("======================");
          console.log("LIBRARY INFO:");
          console.log("GSAP status: loaded");
          console.log("Machine status: loaded");
        };
      };

      // check users browser and run the scrubber and debugger
  		if (window.location.origin == local_host || window.location.origin == local_file){
  			machine.include(["../machine_scrubber.min.js"], function(){
          loaded(); // if in local dev, check lib status
  				if (machine.scrubberController)
            machine.scrubberController.create({"M+P timeline": tl});
  		  });
        machine.include(["../deBug.js"], function(){
          deBug(); // if in local dev, run the debugger
  		  });
  		} else if (window.location.origin == staging_server) {
        machine.include(["../../js/machine_scrubber.min.js"], function(){
          loaded(); // if in local dev, check lib status
  				if (machine.scrubberController)
            machine.scrubberController.create({"M+P timeline": tl});
  		  });
        machine.include(["../../js/deBug.js"], function(){
          deBug(); // if in staging, run the debugger
  		  });
      }; // conditional

  	}; // scrubber()

  }); // preloadImages()
}; // main()
