$(function() {
	var siteRoot = 'http://beta.mfdc.biz';

	if (!$('#mfdc-beta-button').length) { // Create default objects
		$('head').append('<link rel="stylesheet" href="' + '/lib/beta-button.css"></script>');

		if ($('#mfdc-beta-buttons').length) { // User wishes to use custom button list
			$('#mfdc-beta-buttons img').each(function() { // Add site prefix to each image
				$(this).attr('src', siteRoot + $(this).attr('src'));
			});
			$('body').append(
				'<a id="mfdc-beta-button" href="#wheel"></a>' +
				'<ul id="wheel">' +
					$('#mfdc-beta-buttons').html() +
				'</ul>'
			);
			$('#mfdc-beta-buttons').remove();
		} else { // Supply base style sheet
			$('body').append(
				'<a id="mfdc-beta-button" href="#wheel"></a>' +
				'<ul id="wheel">' +
					'<li class="item" data-tooltip="View MFDC Basecamp page"><a href="https://mfdc.basecamphq.com"><img src="' + siteRoot + '/img/basecamp.png"/></a></li>' +
					'<li class="item" data-tooltip="Visit the MFDC.biz site"><a href="http://mfdc.biz"><img src="' + siteRoot + '/img/mfdc.png"/></a></li>' +
					'<li class="item" data-tooltip="Contact us"><a href="mailto:info@mfdc.biz"><img src="' + siteRoot + '/img/email.png"/></a></li>' +
				'</ul>'
			);
		}
	}

	// Utility functions for editing {{{
	var bbActive;

	function bbHoverEnter(e) {
		var that = $(e.target);

		if (!that.attr('bb-editable')) { // If WE are not the bb-editable item forward to the nearest parent
			that.closest('[bb-editable]').trigger('mouseover');
			return;
		}

		bbActive = that;
		if (!bbActive) return;

		var position = $(bbActive).position();

		$('#bb-hover-area').css({
			display: 'block',
			left: position.left,
			top: position.top,
			width: bbActive.width(),
			height: bbActive.height(),
		});
	}

	function bbHoverLeave(e) {
		bbActive = undefined;
		$('#bb-hover-area').css('display', 'none');
	}
	// }}}

	var isEnabled = false;
	$.setBeta = function(enabled) {
		isEnabled = (enabled === undefined) ? ! isEnabled : enabled;

		if (isEnabled) {
			$('#mfdc-beta-button')
				.css({
					bottom: '-80px',
					right: '-80px',
				})
				.animate({
					duration: 1000,
					easing: 'easeOutBounce',
					bottom: '40px',
					right: '40px',
				});
			$('body').removeClass('mfdc-beta-button-hide');

			$(document)
				.on('mouseenter', '[bb-editable]', bbHoverEnter)
				.on('mouseleave', '#bb-hover-area', bbHoverLeave);

			$('<div id="bb-hover-area"><span class="btn btn-default btn-lg"><i class="fa fa-pencil"></i> Edit</span></div>').appendTo($('body'));
		} else {
			$('#mfdc-beta-button')
				.animate({
					duration: 1000,
					easing: 'easeOutBounce',
					bottom: '-80px',
					right: '-80px',
				}, function() {
					$('body').addClass('mfdc-beta-button-hide');
				});

			$(document)
				.off('mouseenter', '[bb-editable]', bbHoverEnter)
				.off('mouseleave', '#bb-hover-area', bbHoverLeave);

			$('div#bb-hover-area').remove();
		}
	};

	$('#mfdc-beta-button')
		.wheelmenu({
			trigger: 'hover',
			animation: 'fly',
			animationSpeed: 'fast',
			angle: 'NW'
		})
		.on('hover', function() {
			$('.wheel [data-tooltip]').tooltip('hide');
		});
	$('.wheel [data-tooltip]').each(function() {
		$(this).tooltip({
			title: $(this).data('tooltip'),
			placement: 'left',
			delay: 200
		});
	});

	$(window).on('keypress', function(e) {
		if (e.which != 109) return; // Only respond to 'm'
		$.setBeta();
	});

	$.setBeta(!$('body').hasClass('mfdc-beta-button-hide'));
});
