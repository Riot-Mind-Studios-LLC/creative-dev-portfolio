/*
MY CAPSSA Patient Awareness V1
Adrian Velazquez
Creative Developer
2021
Email: adrian.velazquez@merkleyandpartners.com
For: MYCAPSSA
*/

/* Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 160,// banner width
      height = 600,// banner height
      images = [// preload images
        "bg_1.jpg", 
        "bg_2.png", 
        "txt_1.png", 
        "txt_1_1.png", 
        "txt_2.png", 
        "txt_2_1.png", 
        "hero.png", 
        "hero_info.png", 
        "product.png", 
        "logo.png", 
        "cta.png",
        "expand_arrow.png",
        "minimize_arrow.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {

    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#fff", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});

        // create banner elements in here
        var bg_1 = machine.createElement({id: "bg_1", backgroundImage: "bg_1.jpg", retina: true, parent: banner});
        var txt_1 = machine.createElement({id: "txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
        var txt_1_1 = machine.createElement({id: "txt_1_1", backgroundImage: "txt_1_1.png", retina: true, parent: banner});
        var pill_1 = machine.createElement({id: "pill_1", backgroundColor: "#ffffff", left: 33, top: 315, width: 44, height: 17, borderRadius: "10px", parent: banner});
        var pill_2 = machine.createElement({id: "pill_2", backgroundColor: "#ffffff", left: 84, top: 315, width: 44, height: 17, borderRadius: "10px", parent: banner});
        var txt_2 = machine.createElement({id: "txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
        var txt_2_1 = machine.createElement({id: "txt_2_1", backgroundImage: "txt_2_1.png", retina: true, parent: banner});
        var bg_2 = machine.createElement({id: "bg_2", backgroundImage: "bg_2.png", retina: true, parent: banner});
        var hero = machine.createElement({id: "hero", backgroundImage: "hero.png", retina: true, parent: banner});
        var hero_info = machine.createElement({id: "hero_info", backgroundImage: "hero_info.png", retina: true, parent: banner});
        var product = machine.createElement({id: "product", backgroundImage: "product.png", retina: true, parent: banner});
        var logo = machine.createElement({id: "logo", backgroundImage: "logo.png", retina: true, parent: banner});
        var cta = machine.createElement({id: "cta", backgroundImage: "cta.png", left: 13, top: 189, retina: true, parent: banner});
        // hit, border, studio enabler exit element
        var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});

        // ISI CONTAINER + CONTENT
        var isi_container = machine.createElement({id: "isi_container", width: width, height: 196, top: 405, backgroundColor: "#d1dae1", parent: banner});
            var isi_box = machine.createElement({ id: "isi_box", width: "155px", height: 196, overflow: "auto", fontSize: "0.775em", fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif", color: "#363636", parent: isi_container});

                // -------------------- PARAGRAPH ONE
                // header 1
                var isi_title_1 = machine.createElement({
                id: "isi_title_1",
                type: "h1",
                innerHTML: "What is MYCAPSSA (octreotide) for?",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.775em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 1
                var isi_txt_1 = machine.createElement({
                id: "isi_txt_1",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.775em",
                innerHTML: "MYCAPSSA is an oral prescription medicine used in the long-term maintenance treatment of acromegaly in people for whom initial treatment with octreotide or lanreotide has been effective and tolerated. </br></br> If these treatments are effective and your body is tolerating it, you may be eligible to take MYCAPSSA instead of the injections. Ask your doctor if this oral treatment is appropriate for you.",
                position: "relative",
                parent: isi_box
                });

                // -------------------- PARAGRAPH TWO
                // header 2
                var isi_title_2 = machine.createElement({
                id: "isi_title_2",
                type: "h1",
                innerHTML: "What is the most important safety information I should know?",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.775em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 2
                var isi_txt_2 = machine.createElement({
                id: "isi_txt_2",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.775em",
                innerHTML: "MYCAPSSA can cause problems with the gallbladder. Tell your healthcare provider if you have any of these symptoms: sudden pain in your upper right stomach (abdomen) or right shoulder or between your shoulder blades; yellowing of your skin or the whites of your eyes; fever with chills; or nausea. </br></br> MYCAPSSA may affect your blood sugar, thyroid hormone, or vitamin B12 levels. Tell your healthcare provider if you have any problems or conditions related to these. Your healthcare provider may monitor these levels during your treatment with MYCAPSSA. </br></br> Tell your healthcare provider if you have an irregular heartbeat.",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH THREE
                // header 3
                var isi_title_3 = machine.createElement({
                id: "isi_title_3",
                type: "h1",
                innerHTML: "Who should not use MYCAPSSA?",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.775em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 3
                var isi_txt_3 = machine.createElement({
                id: "isi_txt_3",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.775em",
                innerHTML: "MYCAPSSA can cause a serious allergic reaction including anaphylactic shock. Stop taking MYCAPSSA right away and get emergency help if you have any of these symptoms: swelling of your tongue, throat, lips, eyes or face; trouble swallowing or breathing; severe itching of the skin with rash or raised bumps; feeling faint; chest pain; or rapid heartbeat. </br></br> Do not use MYCAPSSA if you are allergic to octreotide or any other ingredients in MYCAPSSA. If you need to know the ingredients, ask your healthcare provider or pharmacist. </br></br> If you have certain other medical conditions, you should use MYCAPSSA with caution. Tell your healthcare provider about all your medical conditions, especially the following: pregnancy or breastfeeding; liver disease; kidney disease; or difficulty in emptying bladder completely. </br></br> Tell your healthcare provider about all the medicines you take. MYCAPSSA may affect the way other medicines work, and other medicines may affect how MYCAPSSA works.",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH FOUR
                // header 4
                var isi_title_4 = machine.createElement({
                id: "isi_title_4",
                type: "h1",
                innerHTML: "What are the possible side effects of MYCAPSSA?",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.775em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 4
                var isi_txt_4 = machine.createElement({
                id: "isi_txt_4",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.775em",
                innerHTML: "The most common side effects are headache, joint pain, nausea, weakness, diarrhea, and sweating a lot.",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH FIVE
                // header 5
                var isi_title_5 = machine.createElement({
                id: "isi_title_5",
                type: "h1",
                innerHTML: "Talk to your healthcare provider if you have any side effect that bothers you or that does not go away. You may report side effects to the FDA at 1-800-FDA-1088 </br></br>",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.775em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 5
                var isi_txt_5 = machine.createElement({
                id: "isi_txt_5",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.775em",
                innerHTML: "Keep MYCAPSSA and all medicines out of the reach of children.",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH SIX
                // header 6
                var isi_title_6 = machine.createElement({
                id: "isi_title_6",
                type: "h1",
                innerHTML: "How should I take MYCAPSSA?",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.775em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 6
                var isi_txt_6 = machine.createElement({
                id: "isi_txt_6",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.775em",
                innerHTML: "Do not take MYCAPSSA with food. MYCAPSSA should be taken with a glass of water on an empty stomach. Take MYCAPSSA at least 1 hour before a meal or at least 2 hours after a meal (for example, you could take your morning dose 1 hour before breakfast and your evening dose at bedtime). </br></br>",
                position: "relative",
                parent: isi_box
                });
                
                //  -------------------- PARAGRAPH SEVEN
                // isi box content 7
                var isi_txt_7 = machine.createElement({
                  id: "isi_txt_7",
                  type: "p",
                  padding: "0 10px",
                  margin: "0",
                  fontSize: "0.775em",
                  innerHTML: "© 2021 Chiasma, Inc. All rights reserved. Chiasma and MYCAPSSA are registered trademarks of Chiasma, Inc. PM-MC-US-0459 07/2021 </br></br></br>",
                  position: "relative",
                  parent: isi_box
                  });
                
        
            // ISI FOOTER
            var isi_footer = machine.createElement({ id: "isi_footer", top: "181px", width: width, backgroundColor: "#d1dae1", fontSize: "0.775em", parent: isi_container});
                // link
                var isi_a = machine.createElement({
                  id: "isi_a",
                  innerHTML: "See Full <a href='https://label.mycapssa.com/wp-content/uploads/sites/4/2020/06/patientinformation.pdf' target='blank'>Patient Information</a>",
                  padding: "0 10px 0 10px",
                  marginBottom: "3px",
                  color: "#236092",
                  fontSize: "0.775em",
                  position: "relative",
                  fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif",
                  parent: isi_footer
                });

        // ISI EXPAND BUTTON
        var isi_header = machine.createElement({ id: "isi_header", left: "95px", top: "407px", width: "55px", marginBottom: "1px", backgroundColor: "#d1dae1", fontSize: "0.775em", parent: banner});
            // expand
            var isi_e = machine.createElement({
              id: "isi_expand",
              type: "p",
              textAlign: "right",
              innerHTML: "EXPAND",
              margin: "0",
              position: "relative",
              display: "block",
              fontSize: "0.775em",
              fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif",
              parent: isi_header
            });
                // expand arrow
                var expand_arrow = machine.createElement({
                  id: "expand_arrow",
                  backgroundImage: "expand_arrow.png",
                  position: "relative",
                  float: "right",
                  top: "3px",
                  left: "5px",
                  retina: true,
                  parent: isi_e
                });

        // ISI MINIMIZE BUTTON
        var isi_expanded = machine.createElement({ id: "isi_expanded", left: "93px", width: "57px", marginBottom: "1px", backgroundColor: "#d1dae1", fontSize: "0.775em", parent: banner});
            // minimize
            var isi_m = machine.createElement({
              id: "isi_minimize",
              type: "p",
              textAlign: "right",
              innerHTML: "MINIMIZE",
              margin: "0",
              position: "relative",
              display: "block",
              fontSize: "0.775em",
              fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif",
              parent: isi_expanded
            });
                // minimize arrow
                var minimize_arrow = machine.createElement({
                  id: "minimize_arrow",
                  backgroundImage: "minimize_arrow.png",
                  position: "relative",
                  float: "right",
                  top: "3px",
                  left: "5px",
                  retina: true,
                  parent: isi_m
                });
    // create banner elements in here

    /* Asset Adjustments - set elements for animation
	  =============================================================== */
    // hide elements till needed
    TweenMax.set([bg_2, txt_1, txt_1_1, txt_2, txt_2_1, pill_1, pill_2, hero, hero_info, product, logo, cta], {opacity: 0});
    // set frame position for animation
    TweenMax.set([hero, hero_info, txt_2], {y: +15});
    // set isi off stage 
    TweenMax.set(isi_container, {y: isi_container.get("height")});
    // set minimize button off stage
    TweenMax.set(isi_expanded, {x: +66});
    // set expand button off stage
    TweenMax.set(isi_header, {x: +66});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // fade elements in
    var fade_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, ease: Power2.easeInOut});
    };
    // fade elements out
    var fade_out = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 0, ease: Power2.easeInOut});
    };
    // scale pills to create white bg
    var scale_bg = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {scale: 36, y: -25, ease: Power2.easeInOut});
    };
    // slide elements in to original position
    var slide_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {y: 0, x: 0, opacity: 1, ease: Power2.easeInOut});
    };
    // scale logo into corner
    var scale_logo = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {scale: 0.75, y: -194, x: -13, ease: Power2.easeInOut});
    };

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({})
      // wait 0.1 seconds before starting
      .offset(0.1)
      // frame 1
      .add(fade_in(txt_1))
      .chain()
      .add(fade_in(txt_1_1))
      .offset(0.75)
      .add(fade_in([pill_1, pill_2]))
      .chain(0.75)
      .add(scale_bg([pill_1, pill_2]))
      .offset(0.75)
      // frame 2
      .add(fade_in(logo))
      .offset(0.75)
      .add(slide_in(isi_container))
      .chain(0.25)
      // frame 3
      .add(scale_logo(logo))
      .offset(0.25)
      .add(fade_in(bg_2))
      .offset(0.5)
      .add(fade_in(product))
      .offset(0.75)
      .add(slide_in([txt_2, hero, hero_info]))
      .chain(1)
      // frame 4
      .add(fade_out(txt_2))
      .offset(0.75)
      .add(fade_in(txt_2_1))
      .chain(1)
      // endframe
      .add(fade_out(hero_info))
      .offset()
      .add(fade_in(cta))
      .chain()
      .add(slide_in(isi_header))
      ; // main_tl
      // scrubber(main_tl);

    /* User Interactions - clickthroughs, exits, events
	  =============================================================== */
    // cta animation on hit over
      hit.addEventListener("mouseenter", function(){
        return new builderTimeLine()
          .to(cta, 0.35, {scale: 1.05, ease: Power3.easeOut});
      });

    // cta animation on hit out
      hit.addEventListener("mouseleave", function(){
        return new builderTimeLine()
          .to(cta, 0.15, {scale: 1, ease: Power3.easeIn});
      });

    // isi expand button click
    isi_header.addEventListener("click", function(){
        return new builderTimeLine()
          .to(isi_header, 0.1, {x: +66})
          .offset()
          .to(isi_container, 1, {height: height, top: 0, transformOrigin: "top center", ease: Power3.easeOut})
          .set(isi_box, {height: height})
          .set(isi_footer, {top: 586})
          .offset(0.65)
          .to(isi_expanded, 0.25, {x: 0});
      });

    // isi minimize button click
    isi_expanded.addEventListener("click", function(){
      return new builderTimeLine()
        .to(isi_expanded, 0.1, {x: +66})
        .offset()
        .to(isi_container, 1, {height: 196, top: 405, transformOrigin: "bottom center", ease: Power3.easeOut})
        .set(isi_box, {height: 196})
        .set(isi_footer, {top: 181})
        .offset(0.65)
        .to(isi_header, 0.25, {x: 0});
    });

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
