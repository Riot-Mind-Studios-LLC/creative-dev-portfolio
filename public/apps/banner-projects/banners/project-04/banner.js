var bannerboy = bannerboy || {};
bannerboy.main = function() {

	var width = bannerboy.utils.getDimensions().width;
	var height = bannerboy.utils.getDimensions().height;
	var banner = bannerboy.createElement({id: "banner", width: width, height: height, backgroundColor: "#000", overflow: "hidden", cursor: "pointer", parent: document.body});
	var loops = 2;
	var main_tl;

	var images = [
		"panel.jpg", 
		"cta_txt_over.png", 
		"cta_txt_idle.png",  
		"play.svg",
		"pause.svg",
		"sound.svg",
		"mute.svg"
	];

	bannerboy.preloadImages(images, function() {

		/* Create static elements
		================================================= */
		var panel = bannerboy.createElement({backgroundImage: "panel.jpg", retina: true, parent: banner});
	  
	  	/* Additional elements
		================================================= */
		var video_container = bannerboy.createElement({width: width, height: height, insertBefore: panel});
		var cover = bannerboy.createElement({backgroundColor: "#000", width: width, height: height, parent: banner});
		var border = bannerboy.createElement({border: "solid 1px #000", boxSizing: "border-box", width: width, height: height, parent: banner});

		var play_btn_container = bannerboy.createElement({right: 8, top: 8, width: 28, height: 28, opacity: 0, parent: banner});
			var play_btn = bannerboy.createElement({backgroundImage: "play.svg", width: 28, height: 28, backgroundSize: "100% 100%", visibility: "hidden", parent: play_btn_container});
			var pause_btn = bannerboy.createElement({backgroundImage: "pause.svg", width: 28, height: 28,  backgroundSize: "100% 100%", parent: play_btn_container});

		var sound_btn_container = bannerboy.createElement({left: 8, top: 8, width: 28, height: 28, opacity: 0, parent: banner});
			var unmute_btn = bannerboy.createElement({backgroundImage: "sound.svg", width: 28, height: 28,  backgroundSize:"100% 100%", visibility: "hidden", parent: sound_btn_container});
			var mute_btn = bannerboy.createElement({backgroundImage: "mute.svg", width: 28, height: 28,  backgroundSize:"100% 100%", parent: sound_btn_container});

		var cta = bannerboy.createElement({left: 205, top: 220, width: 85, height: 20, parent: banner});
			var cta_base = bannerboy.createElement({backgroundColor: "#000000", width: 85, height: 20, parent: cta});
			var cta_txt_over = bannerboy.createElement({backgroundImage: "cta_txt_over.png", left: 7, top: 6, retina: true, parent: cta});
			var cta_txt_idle = bannerboy.createElement({backgroundImage: "cta_txt_idle.png", left: 7, top: 6, retina: true, parent: cta});
			
		var video = createVideo();

		/* Adjust elements
		================================================= */
		TweenMax.ticker.fps(10);

		// add black border to cta base
		cta_base.set({border: "1px solid #000000"});

		// video controls event handelers
		play_btn_container.addEventListener("click", onPlayPauseHandler);
		play_btn_container.addEventListener("mouseenter", onVideoControlsOver);
		play_btn_container.addEventListener("mouseleave", onVideoControlsOut);
		sound_btn_container.addEventListener("click", onMuteUnmuteHandler);
		sound_btn_container.addEventListener("mouseenter", onVideoControlsOver);
		sound_btn_container.addEventListener("mouseleave", onVideoControlsOut);

		/* Initialize
		================================================= */
		function initiateBanner() {
			TweenMax.to(cover, 0.2, {opacity: 0, ease: Power2.easeOut});
			play_btn_container.set({opacity: 0.5});
			sound_btn_container.set({opacity: 0.5});
			TweenMax.ticker.addEventListener("tick", onVideoPlaying);
		};

		/* Video Eventhandlers
		================================================= */
		function onVideoPlaying() {
			if (video.currentTime >= video.duration - 1.65) {
				main_tl.play();
				TweenMax.ticker.removeEventListener("tick", onVideoPlaying);
			};
		};

		/* Animations
		================================================= */
		panel.in = new BBTimeline()
		.fromTo([panel, cta], 0.1, {opacity: 0}, {opacity: 1})
		
		
		/* Timeline
		================================================= */
		main_tl = new BBTimeline({paused: true})
		.offset(0.1)

		.to(play_btn_container, 0.5, {opacity: 0, display: "none"})
		.to(sound_btn_container, 0.5, {opacity: 0, display: "none"})
		.to(video_container, 0.5, {autoAlpha: 0, ease: Power3.easeOut})

		//.offset(0.1)
		.add(panel.in);

		/* Interactions - CTA Event Handelers
		================================================= */
		border.onclick = function() {
			onClickthrough();
		};

		border.onmouseenter = function() {
			onCtaOver();
		};

		border.onmouseleave = function() {
			onCtaOut();
		};

		cta.onclick = function() {
			onClickthrough();
		};

		cta.onmouseenter = function() {
			onCtaOver();
		};

		cta.onmouseleave = function() {
			onCtaOut();
		};

		function onCtaOver(e) {
			cta_txt_idle.set({opacity: 0});
			cta_txt_over.set({opacity: 1});
			cta_base.set({backgroundColor: "#fff"});
		};

		function onCtaOut(e) {
			cta_txt_idle.set({opacity: 1});
			cta_txt_over.set({opacity: 0});
			cta_base.set({backgroundColor: "#000"});
		};

		function onClickthrough(e) {
			video.pause();
			main_tl.play();
			Enabler.exit("exit");
		};

		function onPlayPauseHandler(e) {
			if (video.paused) {
				video.play();
				TweenMax.set(play_btn, {visibility: "hidden"});
				TweenMax.set(pause_btn, {visibility: "visible"});
			} else {
				video.pause();
				TweenMax.set(play_btn, {visibility: "visible"});
				TweenMax.set(pause_btn, {visibility: "hidden"});
			};
		};

		function onMuteUnmuteHandler(e) {
			if (video.muted) {
				video.volume = 1;
				video.muted = false;
				mute_btn.style.visibility = "hidden";
				unmute_btn.style.visibility = "visible";
			} else {
				video.volume = 0;
				video.muted = true;
				mute_btn.style.visibility = "visible";
				unmute_btn.style.visibility = "hidden";
			};
		};

		function onVideoControlsOver(e) {
			TweenMax.to(this, 0.2, {opacity: 1, ease: Power1.easeOut});
		};

		function onVideoControlsOut(e) {
			TweenMax.to(this, 0.2, {opacity: 0.5, ease: Power1.easenOut});
		};

		/* Video
		================================================= */
		function createVideo() {
			var video = bannerboy.createElement({type: "video", sources: [{url: Enabler.getUrl("video.mp4"), type: "video/mp4"}], width: width, height: height, controls: false, muted: true, autoplay: true, preload: "none", parent: video_container});
			video.volume = 0;

			//preload video
			video.load();

			video.onCanPlayThroughReady = function() {
				video.removeEventListener("canplaythrough", video.onCanPlayThroughReady);
				initiateBanner();

				console.log("ready");
			}

			video.addEventListener("canplaythrough", video.onCanPlayThroughReady);

			Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
				studio.video.Reporter.attach('video', video);
			});

			return video;
		}
	});
};

// Make sure both Body and DC are ready before calling Main
bannerboy.sourcesLoaded = 0;
bannerboy.isReady = function() {
	bannerboy.sourcesLoaded++;
	if (bannerboy.sourcesLoaded === 2) bannerboy.main();
}

bannerboy.dc.init({
	onInit: function() {},
	onPolite: function() { bannerboy.isReady();	},
	onVisible: function() {}
});
