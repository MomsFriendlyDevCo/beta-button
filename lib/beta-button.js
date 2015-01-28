$(function() {
	var siteRoot = 'http://beta.mfdc.biz';

	if (!$('#mfdc-beta-button').length) { // Create default objects
		$('head').append('<link rel="stylesheet" href="' + siteRoot + '/beta-button.css"></script>');

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
});