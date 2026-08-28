/*
QUVIVIQ Evergreen Q3 Patient
Adrian Velazquez
Creative Developer
2024
Email: adrian.velazquez@merkleyandpartners.com
For: QUVIVIQ
*/

/* Setup - size, preload assets
================================================= */
var machine = machine || {};
machine.main = function() {
  var width = 300,// banner width
      height = 600,// banner height
      images = [// preload images
        "bg_1.jpg", 
        "hero.png", 
        "txt_1.png", 
        "txt_2.png", 
        "txt_2_1.png", 
        "txt_2_2.png", 
        "txt_2_3.png", 
        "txt_3.png", 
        "txt_4.png", 
        "txt_5.png", 
        "sub_txt_1.png", 
        "sub_txt_2.png", 
        "cta.png",
        "arrow.png"
      ];

  /* Create Elements
	=============================================================== */
  machine.preloadImages(images, function() {

    // banner container element
    var banner = machine.createElement({id: "banner", width: width, height: height, backgroundColor: "#c6eaff", overflow: "hidden", cursor: "pointer", boxSizing: "border-box", parent: document.body});

        // create banner elements in here
        var bg_1 = machine.createElement({id: "bg_1", backgroundImage: "bg_1.jpg", retina: true, parent: banner});
        var hero = machine.createElement({id: "hero", backgroundImage: "hero.png",retina: true, parent: banner});
        var txt_1 = machine.createElement({id: "txt_1", backgroundImage: "txt_1.png", retina: true, parent: banner});
        var txt_2 = machine.createElement({id: "txt_2", backgroundImage: "txt_2.png", retina: true, parent: banner});
        var txt_2_1 = machine.createElement({id: "txt_2_1", backgroundImage: "txt_2_1.png", retina: true, parent: banner});
        var txt_2_2 = machine.createElement({id: "txt_2_2", backgroundImage: "txt_2_2.png", retina: true, parent: banner});
        var txt_2_3 = machine.createElement({id: "txt_2_3", backgroundImage: "txt_2_3.png", retina: true, parent: banner});
        var txt_3 = machine.createElement({id: "txt_3", backgroundImage: "txt_3.png", retina: true, parent: banner});
        var txt_4 = machine.createElement({id: "txt_4", backgroundImage: "txt_4.png", retina: true, parent: banner});
        var txt_5 = machine.createElement({id: "txt_5", backgroundImage: "txt_5.png", retina: true, parent: banner});
        var sub_txt_1 = machine.createElement({id: "sub_txt_1", backgroundImage: "sub_txt_1.png", retina: true, parent: banner});
        var sub_txt_2 = machine.createElement({id: "sub_txt_2", backgroundImage: "sub_txt_2.png", retina: true, parent: banner});
        var cta = machine.createElement({id: "cta", backgroundImage: "cta.png", left: 68, top: 277, retina: true, parent: banner});
        // hit, border, studio enabler exit element
        var hit = machine.createElement({id: "hit", width: width, height: height, border: "solid 1px #ccc", boxSizing: "border-box", parent: banner});

        // ISI CONTAINER + CONTENT
        var isi_container = machine.createElement({id: "isi_container", width: width, height: 188.5, top: 411, overflow: "hidden", backgroundColor: "#f1fdff", parent: banner});

            var isi_box = machine.createElement({ id: "isi_box", width: width, height: 166, overflow: "auto", fontSize: "0.75em", fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif", parent: isi_container});

                // -------------------- PARAGRAPH TWO
                // header 2
                var isi_title_2 = machine.createElement({
                id: "isi_title_2",
                type: "h1",
                innerHTML: "Important Safety Information </br></br>",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 2
                var isi_txt_2 = machine.createElement({
                id: "isi_txt_2",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.85em",
                innerHTML: "<strong>Do not take QUVIVIQ if you</strong> fall asleep often at unexpected times (narcolepsy) or if you are allergic to QUVIVIQ or any of its ingredients.",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH THREE
                // header 3
                var isi_title_3 = machine.createElement({
                id: "isi_title_3",
                type: "h1",
                innerHTML: "QUVIVIQ may cause serious side effects, including:",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 3
                var isi_txt_3 = machine.createElement({
                id: "isi_txt_3",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.85em",
                innerHTML: "<ul><li><strong>Decreased awareness and alertness.</strong> The morning after you take QUVIVIQ, your ability to drive safely and think clearly may be decreased. You may also have sleepiness during the day.</li><ul><li>Do not take more QUVIVIQ than prescribed.</li><li>Do not take QUVIVIQ unless you are able to stay in bed for at least 7 hours before you must be active again.</li><li>Take QUVIVIQ at night within 30 minutes before going to bed.</li></ul></ul> QUVIVIQ is a federally controlled substance because it can be abused or lead to dependence.",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH FOUR
                // header 4
                var isi_title_4 = machine.createElement({
                id: "isi_title_4",
                type: "h1",
                innerHTML: "Before taking QUVIVIQ, tell your healthcare provider about all of your medical conditions, including if you:",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 4
                var isi_txt_4 = machine.createElement({
                id: "isi_txt_4",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.85em",
                innerHTML: "<ul><li>have a history of depression, mental illness, or suicidal thoughts or actions; drug or alcohol abuse or addiction; a sudden onset of muscle weakness (cataplexy); daytime sleepiness</li><li>have lung or breathing problems, including sleep apnea</li><li>have liver problems</li><li>are pregnant or plan to become pregnant</li><li>are breastfeeding or plan to breastfeed</li></ul>",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH FIVE
                // header 5
                var isi_title_5 = machine.createElement({
                id: "isi_title_5",
                type: "h1",
                innerHTML: "<strong>Tell your healthcare provider about all of the medicines you take</strong>, <span>including prescription and over-the-counter medicines, vitamins, and herbal supplements.</span>",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 5
                var isi_txt_5 = machine.createElement({
                id: "isi_txt_5",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.85em",
                innerHTML: "<ul><li>Taking QUVIVIQ with certain medicines can cause serious side effects. QUVIVIQ may affect the way other medicines work and other medicines may affect the way QUVIVIQ works.</li><li><strong>Do not take QUVIVIQ with other medicines that can make you sleepy unless instructed by your healthcare provider.</strong></li></ul>",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH SIX
                // header 6
                var isi_title_6 = machine.createElement({
                id: "isi_title_6",
                type: "h1",
                innerHTML: "What should I avoid while taking QUVIVIQ?",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 6
                var isi_txt_6 = machine.createElement({
                id: "isi_txt_6",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.85em",
                innerHTML: "<ul><li>Do not drink alcohol while taking QUVIVIQ. It can increase the effects of alcohol, which can be dangerous.</li><li>Do not drive, operate heavy machinery, do anything dangerous, or do other activities that require clear thinking if you do not feel fully awake, or you have taken QUVIVIQ and have less than a full night of sleep (at least 7 hours), or if you have taken more QUVIVIQ than prescribed.</li></ul>",
                position: "relative",
                parent: isi_box
                });
                
                //  -------------------- PARAGRAPH SEVEN
                // isi box content 7
                var isi_title_7 = machine.createElement({
                id: "isi_txt_7",
                type: "h1",
                innerHTML: "QUVIVIQ may cause other serious side effects, including:",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 7
                var isi_txt_7 = machine.createElement({
                id: "isi_txt_7",
                type: "p",
                padding: "0 10px",
                margin: "0",
                fontSize: "0.85em",
                innerHTML: "<ul><li><strong>Worsening depression and suicidal thoughts.</strong> Call your healthcare provider right away if you have any worsening depression or thoughts of suicide or dying.</li><li><strong>Temporary inability to move or talk (sleep paralysis) for up to several minutes, or hallucinations while you are going to sleep or waking up.</strong></li><li><strong>Complex sleep behaviors</strong> such as sleep-walking, sleep-driving, preparing and eating food, making phone calls, having sex or doing other activities while not fully awake that you may not remember the next morning. Stop taking QUVIVIQ and call your healthcare provider right away if you experience a complex sleep behavior.</li></ul>",
                position: "relative",
                parent: isi_box
                });

                //  -------------------- PARAGRAPH EIGHT
                // header 8
                var isi_title_8 = machine.createElement({
                id: "isi_title_8",
                type: "h1",
                innerHTML: "The most common side effects of QUVIVIQ <span>are headache and sleepiness.</span></br></br>",
                padding: "10px 10px 0 10px",
                margin: "0",
                position: "relative",
                fontSize: "0.85em",
                fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                parent: isi_box
                });
                // isi box content 8
                var isi_txt_8 = machine.createElement({
                  id: "isi_txt_8",
                  type: "p",
                  padding: "0 10px",
                  margin: "0",
                  fontSize: "0.85em",
                  innerHTML: "These are not the only side effects of QUVIVIQ. Call your doctor for advice about side effects.</br></br> QUVIVIQ is a prescription medicine for adults who have trouble falling asleep or staying asleep (insomnia).</br></br> You are encouraged to report negative side effects of prescription drugs to the FDA. Visit <a href='https://www.fda.gov/medwatch' target='_blank'>www.fda.gov/medwatch</a> or call 1-800-FDA-1088.</br></br>&copy2024 Idorsia Pharmaceuticals, Ltd.</br>US-DA-01048  08/24</br></br></br></br></br>",
                  position: "relative",
                  parent: isi_box
                  });

            // -------------------- FOOTER
            var isi_footer = machine.createElement({ id: "isi_footer", top: "166px", width: width, height: "22px", backgroundColor: "#f1fdff", borderTop: "1px solid #a1b6bb", fontSize: "0.75em", parent: isi_container});
                // link 1
                var isi_link_1 = machine.createElement({
                  id: "isi_link_1",
                  innerHTML: "<a href='https://www.idorsia.us/dam/jcr:57357654-064f-4333-ab0b-6b0bed5a79e4/Quviviq_PI.pdf' target='_blank'>Prescribing Information</a>",
                  padding: "4px 10px",
                  float: "left",
                  fontSize: "0.85em",
                  position: "relative",
                  fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                  parent: isi_footer
                });
                // link 2
                var isi_link_2 = machine.createElement({
                  id: "isi_link_2",
                  innerHTML: "<a href='https://www.idorsia.us/dam/jcr:40c38584-3e66-46f1-8514-9d6a898c95e6/Quviviq_MG.pdf' target='_blank'>Medication Guide</a>",
                  padding: "4px 10px",
                  float: "right",
                  fontSize: "0.85em",
                  position: "relative",
                  fontFamily: "Gothamy, Gotham-Bold, Arial, sans-serif",
                  parent: isi_footer
                });

        // -------------------- ISI NAVIGATION
        // ISI EXPAND BUTTON
        var isi_header = machine.createElement({ id: "isi_header", left: "240px", top: "411px", width: "55px", backgroundColor: "#f1fdff", marginBottom: "1px", fontSize: "0.5em", parent: banner});
            // expand
            var isi_e = machine.createElement({
              id: "isi_expand",
              type: "p",
              textAlign: "right",
              innerHTML: "EXPAND",
              margin: "0",
              position: "relative",
              display: "block",
              fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif",
              parent: isi_header
            });
                // expand arrow
                var expand_arrow = machine.createElement({
                  id: "expand_arrow",
                  backgroundImage: "arrow.png",
                  position: "relative",
                  float: "right",
                  top: "3px",
                  left: "5px",
                  retina: true,
                  parent: isi_e
                });

        // ISI MINIMIZE BUTTON
        var isi_expanded = machine.createElement({ id: "isi_expanded", left: "237px", width: "57px", backgroundColor: "#f1fdff", marginBottom: "1px", fontSize: "0.5em", parent: banner});
            // minimize
            var isi_m = machine.createElement({
              id: "isi_minimize",
              type: "p",
              textAlign: "right",
              innerHTML: "MINIMIZE",
              margin: "0",
              position: "relative",
              display: "block",
              fontFamily: "Gothamy, Gotham-Book, Arial, sans-serif",
              parent: isi_expanded
            });
                // minimize arrow
                var minimize_arrow = machine.createElement({
                  id: "minimize_arrow",
                  backgroundImage: "arrow.png",
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
    TweenMax.set([txt_1, txt_2, txt_2_1, txt_2_2, txt_2_3, txt_3, txt_4, txt_5, sub_txt_1, sub_txt_2, hero, cta], {opacity: 0});
    // position animating elements before animation
    TweenMax.set([txt_1, txt_2, txt_2_1, txt_2_2, txt_2_3, txt_3, txt_4, txt_5, cta], {y: +15});
    // scale Z's
    TweenMax.set([txt_2_1, txt_2_2, txt_2_3], {scale: 0, transformOrigin: "right center"});
    // frame 1 assets
    var frame_1_assets = [txt_1, txt_2, txt_2_1, txt_2_2, txt_2_3, sub_txt_1];
    // frame 2 assets
    var frame_2_assets = [hero, txt_4, sub_txt_2];
    
    /* isi positioning
	  =============================================================== */
    // set minimize button off stage
    TweenMax.set(isi_expanded, {x: +65});
    // rotate arrow for minimize nav
    TweenMax.set(minimize_arrow, {rotation: 180});

    /* Animations - individual timelines for aminations
	  =============================================================== */
    // elements in
    var element_in = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 1, y: 0, scale: 1, ease: Power2.easeInOut});
    };
    // fade elements out
    var fade_out = function(obj){
      return new builderTimeLine()
        .to(obj, 1, {opacity: 0, ease: Power2.easeInOut});
    };
    // isi scroll
    isi_box.scroll = new builderTimeLine()
      .to(isi_box, 60, {scrollTop: 1250, ease: Power0.easeIn});

    /* Main timeline - chain of animations
	  =============================================================== */
    main_tl = new builderTimeLine({onComplete: run_cta()})
      // offset
      .offset(0.25)
      // frame 1
      .add(element_in(txt_1))
      .offset(0.5)
      .add(element_in(txt_2))
      .offset(0.25)
      .add(element_in(txt_2_1))
      .offset(0.25)
      .add(element_in(txt_2_2))
      .offset(0.25)
      .add(element_in(txt_2_3))
      .chain(0)
      .add(element_in(sub_txt_1))
      .chain(1.5)
      .add(fade_out(frame_1_assets))
      .chain(0)
      // frame 2
      .add(element_in(hero))
      .offset(0.5)
      .add(element_in(txt_3))
      .offset(0.5)
      .add(element_in(sub_txt_2))
      .chain(1.5)
      .add(fade_out(txt_3))
      .offset(0.5)
      .add(element_in(txt_4))
      .chain(2)
      .add(fade_out(frame_2_assets))
      .chain(0)
      // endframe
      .add(element_in(txt_5))
      .offset(0.5)
      .add(element_in(cta))
      .chain(0)
      //isi scroll
      .add(isi_box.scroll)
      ; // main_tl

      // un-comment debug & scrubber for production
        // scrubber(main_tl);
        // console.log("==========================================");
        // console.log("MAIN TIMELINE: ");
        // console.log(main_tl);

    /* User Interactions - clickthroughs, exits, events
	  =============================================================== */
    function run_cta(){
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
    }
    // isi expand button click
    isi_header.addEventListener("click", function(){
        return new builderTimeLine()
          .to(isi_header, 0.1, {x: +65})
          .offset(0)
          .to(isi_container, 1, {height: height, top: 0, transformOrigin: "top center", ease: Power3.easeOut})
          .set(isi_box, {height: height})
          .set(isi_footer, {top: 577})
          .offset(0.65)
          .to(isi_expanded, 0.25, {x: 0});
      });
    // isi minimize button click
    isi_expanded.addEventListener("click", function(){
      return new builderTimeLine()
        .to(isi_expanded, 0.1, {x: +65})
        .offset(0)
        .to(isi_container, 1, {height: 188.5, top: 411, transformOrigin: "bottom center", ease: Power3.easeOut})
        .set(isi_box, {height: 188.5})
        .set(isi_footer, {top: 166})
        .offset(0.65)
        .to(isi_header, 0.25, {x: 0});
    });
    // pause isi scroll (main_tl animation) on hover
    isi_box.addEventListener("mouseenter", function(){
      main_tl.pause();
    });
    // play isi scroll (main_tl animation) on mouse leave
    isi_box.addEventListener("mouseleave", function(){
      main_tl.play();
    });

  }); // preloadImages()
}; // main()

/* Debugger
=============================================================== */
// var local_host = "http://localhost:8080",
//     local_file = "file://",
//     staging_server = "https://banners.merkleyandpartners.com/";

// if (window.location.origin == local_host || window.location.origin == local_file){
//     console.log("==========================================");
//     console.log("INCLUDES: ");
//     machine.include(["../deBug.min.js"]);
// }
