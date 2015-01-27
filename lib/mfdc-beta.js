$(function() {
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
