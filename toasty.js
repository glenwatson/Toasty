(function(ns) { //namespace
	
	//image and audio variables
	var _toastyimage;
	var _toastysound;
	var _toastyimageSrc = 'dan.png';
	var _toastysoundSrc = ['toasty.mp3', 'toasty.wav', 'Deception_Toasty.mp3'];
	
	function _loadToasty() {
		// make dan
		_toastyimage = $('<img src="'+_toastyimageSrc+'" />')
			.css({
				"position" : "fixed",
				"bottom" : "-300px",
				"right" : "-300px"
			});
		//make voice
		var audio = '<audio preload="auto">';
		for (i in _toastysoundSrc)
			audio += '<source src="'+_toastysoundSrc[i]+'" />';
		audio += '</audio>';
		_toastysound = $(audio);

		$('body').append(_toastyimage).append(_toastysound);
		ns.uppercut();
	}
	
	var uppercutkeys = [];
	function _keyDownUppercut(e) {
		uppercutkeys.unshift( e.keyCode || e.keyCode || e.key );
		if (uppercutkeys.length > 4) {
			uppercutkeys = uppercutkeys.slice(0, 4);
		}
		if( 	uppercutkeys[0] === 40 && //down
				uppercutkeys[1] === 38 && //up
				uppercutkeys[2] === 39 && //right
				uppercutkeys[3] === 39) { //right
			//unbind the listener
			//$(document).unbind('keydown',arguments.callee);
			//reset the keys
			uppercutkeys = [];
			ns.toasty();
		}
	}
	
	/*
	 * Listens for right, right, up, down
	 */
	ns.uppercut = function() {
		$(document).on('keydown', _keyDownUppercut);
	}
	
	/*
	 * Stops waiting for uppercut
	 */
	ns.uppercutOff = function() {
		$(document).off('keydown', _keyDownUppercut);
	}
	
	/*
	 * Binds to onclick event
	 * pass in either a DOM element or a CSS selector as a string
	 */
	ns.bind = function(arg) {
		$(arg).click(ns.toasty);
	}
	
	/*
	 * Fires the 
	 * You can call toasty.toasty() to trigger for your own events
	 */
	ns.toasty = function() {
		//plays the <audio> sound
		_toastysound[0].play();
	
		// pops up dan and then hides him again	
		_toastyimage.animate({"bottom" : "0","right" : "0"}, 300,
			function() { 	
				_toastyimage.delay(1000).animate({"bottom" : "-300px", "right" : "-300px"}, 300)
			}
		);
	}
	
	/*
	 * Removes the assests from the page
	 */
	ns.remove = function() {
		_toastyimage.remove();
		_toastysound.remove();
	}
	
	// ensure jQuery is loaded, then call _loadToasty()
	if (typeof jQuery === 'undefined') {
		var j = document.createElement('script');
		j.type = 'text/javascript';
		j.src = 'jQuery1.9.0.js';
		j.onload = _loadToasty;
		document.getElementsByTagName('head')[0].appendChild(j);
	} else {
		_loadToasty();
	}
	
})(window.toasty = window.toasty || {});

// ensure jQuery is loaded, then call loadToasty()
if (typeof jQuery === 'undefined')
{
	var j = document.createElement('script');
	j.type = 'text/javascript';
	j.src = 'jQuery1.9.0.js';
	j.onload = loadToasty;
	document.getElementsByTagName('head')[0].appendChild(j);
}
else
{
	loadToasty();
}