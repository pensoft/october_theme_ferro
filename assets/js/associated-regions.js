/*
 * Associated regions - slide-in panel on the open call page
 */
$(function() {
	const TRANSITION_MS = 450;
	const $overlay = $('.region-panel-overlay');
	if (!$overlay.length) return;

	// Move to <body> so no ancestor stacking context keeps it below the fixed header
	$overlay.appendTo('body');

	let $trigger = null;
	let closeTimer = null;

	function openPanel(slug, $button) {
		const $panel = $overlay.find(`.region-panel[data-region="${slug}"]`);
		if (!$panel.length) return;

		clearTimeout(closeTimer);
		$trigger = $button;

		$overlay.find('.region-panel').removeClass('active open').attr('aria-hidden', 'true');
		$overlay.addClass('active').attr('aria-hidden', 'false');
		$panel.addClass('active').attr('aria-hidden', 'false').scrollTop(0);
		$('body').addClass('no-scroll');

		// Force reflow so the slide-in transition runs after display:block
		$panel[0].offsetWidth;
		$panel.addClass('open');
		$panel.find('.region-panel-close').trigger('focus');
	}

	function closePanel() {
		if (!$overlay.hasClass('active')) return;

		const $panel = $overlay.find('.region-panel.active');
		$panel.removeClass('open');
		$overlay.removeClass('active').attr('aria-hidden', 'true');
		$('body').removeClass('no-scroll');

		closeTimer = setTimeout(function() {
			$panel.removeClass('active').attr('aria-hidden', 'true');
		}, TRANSITION_MS);

		if ($trigger) {
			$trigger.trigger('focus');
			$trigger = null;
		}
	}

	$(document)
		.on('click', '.associated-region', function() {
			openPanel($(this).data('region'), $(this));
		})
		.on('click', '.region-panel-close', closePanel)
		.on('click', '.region-panel-overlay', function(e) {
			if ($(e.target).is('.region-panel-overlay')) closePanel();
		})
		.on('keydown', function(e) {
			if (e.key === 'Escape') closePanel();
		});
});
