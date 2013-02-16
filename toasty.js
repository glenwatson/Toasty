// ensure jQuery is loaded, then call loadKnee()
if (typeof jQuery === 'undefined')
{
	var j = document.createElement('script');
	j.type = 'text/javascript';
	j.src = 'https://raw.github.com/glenwatson/Toasty/master/jQuery1.9.0.js';
	j.onload = loadKnee;
	document.getElementsByTagName('head')[0].appendChild(j);
}
else
{
	loadKnee();
}

//key recognition
var uppercutkeys = [], uppercut = "39,39,38,40";
$(document).keydown(function(e)
{
	uppercutkeys.push( e.keyCode );
	if ( uppercutkeys.toString().indexOf( uppercut ) >= 0 )
	{
		//unbind the listener
		//$(document).unbind('keydown',arguments.callee);
		//reset the keys
		uppercutkeys = [];
		
		//image and audio variables
		var toastyimage = $('<img id="bigdan" style="display: none" src="https://raw.github.com/glenwatson/Toasty/master/dan.png" />');
		var toastysound = $('<audio id="toasty" preload="auto"><source src="https://raw.github.com/glenwatson/Toasty/master/Deception_Toasty.mp3" /><source src="https://raw.github.com/glenwatson/Toasty/master/toasty.mp3" /><source src="https://raw.github.com/glenwatson/Toasty/master/toasty.wav" /></audio>');
		
		//set the default style of the image to be out of sight
		$('body').append(toastyimage);
		$('body').append(toastysound);
		var danforden = $('#bigdan').css({
			"position":"fixed",
			"bottom": "-300px",
			"right" : "-300px",
			"display" : "block"
		})
		
		//plays the <audio> sound
		document.getElementById('toasty').play();
		
		// pops up dan and then hides him again	
		danforden.animate({"bottom" : "0","right" : "0"}, 300,
			function() { 	
				$('#bigdan').delay(1000).animate({"bottom": "-300px", "right" : "-300px"}, 300, 
					function()
					{
						//clean-up
						toastyimage.remove();
						toastysound.remove();
					}
				)
			}
		);
		
	}          
});