/* Theme Name: Shwas
   Author: Hardik
   Author e-mail: hardiknavadiya77@gmail.com 
   Version: 1.0.0
   Created:Jun 2015
   File Description:Main JS file of the template
*/

// const { Collapse } = require("bootstrap");

/* ==============================================
Preloader
=============================================== */

$(window).load(function() {
    $('.status').fadeOut();
    $('.preloader').delay(350).fadeOut('slow');
});



/* ========================== */
/* ==== HELPER FUNCTIONS ==== */


isIE = false;

var isiPad = (navigator.userAgent.match(/iPad/i) != null);


$.fn.isAfter = function (sel) {
	return this.prevAll(sel).length !== 0;
}
$.fn.isBefore = function (sel) {
	return this.nextAll(sel).length !== 0;
}


function validatedata($attr, $defaultValue) {
	if ($attr !== undefined) {
		return $attr
	}
	return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
	if (str == 'true') {
		return true;
	}
	return $defaultValue;
	//return /true/i.test(str);
}


jQuery(document).ready(function () {
	"use strict";
	$ = jQuery.noConflict();


	/* ============================= */
	/* ==== SET ELEMENTS HEIGHT ==== */
	// flexslider
	$('.flexslider.std-slider').each(function () {
		var $this = $(this);
		$this.css('min-height', $this.attr('data-height') + "px");
	})

	// spacer element
	$('.spacer').each(function () {
		var $this = $(this);
		$this.css('height', $this.attr('data-height') + "px");
	})

	

	/* =============================== */
	/* ==== PLACEHOLDERS FALLBACK ==== */

	if ($().placeholder) {
		$("input[placeholder],textarea[placeholder]").placeholder();
	}


	

	$(window).load(function () {


		/* ==================== */
		/* ==== FLEXSLIDER ==== */

		if (($().flexslider) && ($(".flexslider").length > 0)) {

			$('.flexslider.std-slider').each(function () {
				var $this = $(this);

				// initialize
				$this.find(".slides > li").each(function () {
					var $slide_item = $(this);
					var bg = validatedata($slide_item.attr('data-bg'), false);
					if (bg) {
						$slide_item.css('background-image', 'url("' + bg + '")');
					}
					$slide_item.css('min-height', $this.attr('data-height') + "px");

					// hide slider content due to fade animation

					/*
					$slide_item.find(".inner").hide();

					$slide_item.find(".inner [data-fx]").each(function () {
						$(this).removeClass("animated");
					})
					*/
				})

				var loop = validatedata(parseBoolean($this.attr("data-loop")), false);
				var smooth = validatedata(parseBoolean($this.attr("data-smooth")), false);
				var slideshow = validatedata(parseBoolean($this.attr("data-slideshow")), false);
				var speed = validatedata(parseInt($this.attr('data-speed')), 7000);
				var animspeed = validatedata(parseInt($this.attr("data-animspeed")), 600);
				var controls = validatedata(parseBoolean($this.attr('data-controls')), false);
				var dircontrols = validatedata(parseBoolean($this.attr('data-dircontrols')), false);

				$this.flexslider({
					animation: "fade",              //String: Select your animation type, "fade" or "slide"
					animationLoop: loop,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
					smoothHeight: smooth,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
					slideshow: slideshow,                //Boolean: Animate slider automatically
					slideshowSpeed: speed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
					animationSpeed: animspeed,            //Integer: Set the speed of animations, in milliseconds

					// Primary Controls
					controlNav: controls,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
					directionNav: dircontrols,             //Boolean: Create navigation for previous/next navigation? (true/false)
					touch:false,

					pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
					prevText: " ",           //String: Set the text for the "previous" directionNav item
					nextText: " ",
					useCSS: false,

					// Callback API
					start: function () {
						//$this.removeClass("loading-slider");

						setTimeout(function () {
							$this.find(".slides > li.flex-active-slide .inner [data-fx]").each(function () {
								var $content = $(this);
								$content.addClass($content.data('fx')).addClass("activate");
							})
						}, 650);

					},
					before: function () {

						$this.find(".slides > li .inner [data-fx]").each(function () {
							var $content = $(this);
							$content.removeClass($content.data('fx')).removeClass("activate");
						})
					},           //Callback: function(slider) - Fires asynchronously with each slider animation
					after: function () {
						setTimeout(function () {
							$this.find(".slides > li.flex-active-slide .inner [data-fx]").each(function () {
								var $content = $(this);
								$content.addClass($content.data('fx')).addClass("activate");
							})
						}, 150);
					},            //Callback: function(slider) - Fires after each slider animation completes
					end: function () {
					},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
					added: function () {
					},            //{NEW} Callback: function(slider) - Fires after a slide is added
					removed: function () {
					}           //{NEW} Callback: function(slider) - Fires after a slide is removed
				});
			});
		}


	});
	



});
/* / document ready */

var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj){
  var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
  var container, timeout;

  originalLeave.call(this, obj);

  if(obj.currentTarget) {
    container = $(obj.currentTarget).siblings('.popover')
    timeout = self.timeout;
    container.one('mouseenter', function(){
      //We entered the actual popover – call off the dogs
      clearTimeout(timeout);
      //Let's monitor popover content instead
      container.one('mouseleave', function(){
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    })
  }
};


$('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'auto', delay: {show: 50, hide: 400}});

// document.querySelectorAll('.number-plus').forEach(counter => {
//     const updateCount = () => {
//         const target = +counter.getAttribute('data-target');
//         const count = +counter.innerText.replace('+', '');

//         // Calculate increment (reduce the divisor to speed up the count)
//         const increment = target / 100; // Faster speed

//         if (count < target) {
//             // Update counter
//             counter.innerText = Math.ceil(count + increment) + '+';
//             setTimeout(updateCount, 1); // Call function again after 1ms
//         } else {
//             counter.innerText = target + '+';
//         }
//     };

//     updateCount();
// });
// document.querySelectorAll('.number').forEach(counter => {
//     const updateCount = () => {
//         const target = +counter.getAttribute('data-target');
//         const count = +counter.innerText.replace('', '');

//         // Calculate increment (reduce the divisor to speed up the count)
//         const increment = target / 100; // Faster speed

//         if (count < target) {
//             // Update counter
//             counter.innerText = Math.ceil(count + increment) + '';
//             setTimeout(updateCount, 1); // Call function again after 1ms
//         } else {
//             counter.innerText = target + '';
//         }
//     };

//     updateCount();
// });

document.addEventListener("DOMContentLoaded", function () {
	// console.log("DOMContentLoaded");
    const counters = document.querySelectorAll('.number-plus, .number');

    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '').replace('', '');
        const isPlus = counter.classList.contains('number-plus');

        // Calculate increment (reduce the divisor to speed up the count)
        const increment = target / 100; // Faster speed

        if (count < target) {
            // Update counter
            counter.innerText = Math.ceil(count + increment) + (isPlus ? '+' : '');
            setTimeout(() => updateCount(counter), 1); // Call function again after 1ms
        } else {
            counter.innerText = target + (isPlus ? '+' : '');
        }
    };

    // Intersection Observer setup
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                updateCount(counter);
                observer.unobserve(counter); // Stop observing after animation is done
            }
        });
    }, { threshold: 1.0 }); // Adjust threshold for when to trigger the animation

    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
});


