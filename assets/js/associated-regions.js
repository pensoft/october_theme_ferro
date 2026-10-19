/*
 * Associated regions - region pop-up on the open call page
 */
$(function() {
	const TRANSITION_MS = 350;
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

		// Force reflow so the open transition runs after display:block
		$panel[0].offsetWidth;
		setupReadMore($panel);
		$panel.addClass('open');
		$panel.find('.region-panel-close').trigger('focus');
	}

	// Clamp long region texts; the toggle only shows when the text overflows the collapsed height
	function setupReadMore($panel) {
		const $body = $panel.find('.region-panel-body');
		const $more = $panel.find('.region-panel-more');
		if (!$body.length) return;

		$body.removeClass('expanded').addClass('is-collapsible');
		$more.attr('aria-expanded', 'false');

		const overflows = $body[0].scrollHeight > $body[0].clientHeight + 1;
		$body.toggleClass('is-collapsible', overflows);
		$more.prop('hidden', !overflows);
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
		.on('click', '.region-panel-more', function() {
			const expanded = $(this).attr('aria-expanded') !== 'true';
			$(this).attr('aria-expanded', String(expanded))
				.siblings('.region-panel-body').toggleClass('expanded', expanded);
		})
		.on('click', '.region-panel-overlay', function(e) {
			if ($(e.target).is('.region-panel-overlay')) closePanel();
		})
		.on('keydown', function(e) {
			if (e.key === 'Escape') closePanel();
		});
});
