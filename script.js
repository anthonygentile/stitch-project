(function($){
	$.fn.dpdwn = function(options) {
		// allows for chaining
		return this.each(function() {
			// Variables
			var $wrap = $(this),
				$btn = $wrap.find(".select-btn"),
				$list = $wrap.find(".select-list"),
				$listLinks = $list.find("a"),
				dpdwnTitle = $wrap.attr("data-title"),
				$dpdwnTitle = $(dpdwnTitle);
			// Defaults
			var defaults = {
				optionName: "value"
			};
			// Combine Defaults and Options into Settings
			var settings = $.extend({}, defaults, options);

			var plugin = {

				// Dropdown Toggle
				dpdwnToggle: function() {
					$btn.on("click", function(e) {
						if ($wrap.hasClass("active")) {
							$list.slideUp("fast");
						} else {
							$list.slideDown("fast");
						}
						$wrap.toggleClass("active");
						e.stopPropagation();
					});
				},

				// Link Clicked
				linkClicked: function() {
					$listLinks.on("click", function() {
						var $this = $(this),
							newTitle = $this.attr('data-title');
						$listLinks.removeClass('current');
						$this.addClass('current');
						if ($dpdwnTitle != '' || $dpdwnTitle != undefined) $dpdwnTitle.html(newTitle); // change dropdown title
						$wrap.removeClass("active");
						$list.slideUp("fast");
					});
				},

				// Escape Toggle
				escapeToggle: function() {
					$(document).on("click", function(e) {
						$wrap.removeClass("active");
						$list.slideUp("fast");
					});
				},

				// Start it All
				init: function() {
					plugin.dpdwnToggle();
					plugin.escapeToggle();
					plugin.linkClicked();
				}

			};
			// START IT ALL
			plugin.init();
		});
	}
})(jQuery);


$(function(){




		//////////////////////////////
		// ADA
		//////////////////////////////


		// $('*').on('focus', function() {
		// 	console.log(document.activeElement);
		// });

		$('a, button, [tabindex], h1, h2, h3, h4, h5, h6, p, img, .error, .entry-content li').not('[tabindex="0"], [tabindex^="-"]').each(function(i) {
			$(this).attr('tabindex', 0);
		});

		function redirect_focus(el) {
			// console.log(el);
			$(el).attr('tabindex', -1).on('blur focusout', function() {
				$(this).removeAttr('tabindex');
			}).focus();
		}

		function scroll_to_target(el) {
			// console.log(el);
			var $scroll_to = $(el).offset().top;
			var $header_height = $('#header').height();
			if($scroll_to >= $header_height) {
				$scroll_to = $(el).offset().top - $header_height;
			}
			$('html, body').animate({
				scrollTop: $scroll_to
			}, 500);
		}

		// $('a[href^="#"]:not(a[href="#"])').click(function(e) {
		// 	e.preventDefault();
		// 	$(e.target).blur();
		// 	var scroll_target = $(e.target).attr('href');
		// 	scroll_to_target($(scroll_target));
		// });

		 $('.skip').click(function(e) {
			e.preventDefault();
			var skipTo = '#' + this.href.split('#')[1];
			scroll_to_target($(skipTo));
			redirect_focus($(skipTo));
		});





	// Init - Dropdown
	$('.select').dpdwn();

});
