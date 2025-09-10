/**
 * Map image tooltip behavior for the Demonstration Sites page
 * Handles interactive tooltips that appear when hovering over map triggers
 */
$(function() {
	// Configuration constants
	const TOOLTIP_OFFSET = 16;
	const FALLBACK_GRADIENT = 'linear-gradient(180deg, rgba(45, 114, 82, 0) 0%, rgba(16, 150, 168, 0.69) 100%)';
	
	// Mobile detection
	const isMobile = () => {
		return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	};

	// Get demonstration data from the page
	const demoData = window.demoMapData || [];
	
	// Create dynamic mapping from database data
	const createDynamicMapping = () => {
		const titleMap = {};
		const preferredKeys = [];
		
		demoData.forEach(demo => {
			if (demo.slug) {
				titleMap[demo.slug] = demo.name || demo.slug;
				preferredKeys.push(demo.slug);
			}
		});
		
		return { titleMap, preferredKeys };
	};

	const { titleMap: TITLE_MAP, preferredKeys: PREFERRED_KEYS } = createDynamicMapping();

	// DOM elements
	const $mapContainer = $('.demonstration-map .container');
	if (!$mapContainer.length) return;

	const $tooltip = $('<div class="map-image-tooltip" aria-hidden="true"><div class="map-tooltip-title"></div></div>');
	$mapContainer.append($tooltip);

	/**
	 * Extracts the appropriate CSS modifier class from element classes
	 * @param {jQuery} $element - The target element
	 * @returns {string} The modifier class or empty string
	 */
	const getModifierClass = ($element) => {
		const classes = ($element.attr('class') || '').split(/\s+/);
		const foundKey = PREFERRED_KEYS.find(key => classes.includes(key));
		return foundKey ? `${foundKey}-img` : '';
	};

	/**
	 * Hides the tooltip and resets its state
	 */
	const hideTooltip = () => {
		$tooltip.removeClass('active');
		$tooltip.attr('class', 'map-image-tooltip');
		$tooltip.css('background-image', '');
		$tooltip.find('.map-tooltip-title').text('');
	};

	/**
	 * Positions the tooltip relative to the mouse cursor
	 * @param {Event} event - The mouse/touch event
	 */
	const positionTooltip = (event) => {
		const offset = $mapContainer.offset();
		const left = event.pageX - offset.left + TOOLTIP_OFFSET;
		const top = event.pageY - offset.top + TOOLTIP_OFFSET;
		$tooltip.css({ left, top });
	};

	/**
	 * Applies fallback background image if CSS background is not configured
	 * @param {string} imageSrc - The image source URL
	 */
	const applyFallbackBackground = (imageSrc) => {
		if (imageSrc) {
			const backgroundImage = `${FALLBACK_GRADIENT}, url("${imageSrc}")`;
			$tooltip.css('background-image', backgroundImage);
		}
	};

	/**
	 * Gets demonstration data by slug
	 * @param {string} slug - The demonstration slug
	 * @returns {Object|null} The demonstration data or null
	 */
	const getDemoBySlug = (slug) => {
		return demoData.find(demo => demo.slug === slug) || null;
	};

	/**
	 * Shows tooltip for the specified target element
	 * @param {Event} event - The mouse/touch event
	 * @param {jQuery} $target - The target element
	 */
	const showTooltipFor = (event, $target) => {
		// Disable tooltip entirely on mobile devices
		if (isMobile()) {
			return;
		}
		const modifier = getModifierClass($target);
		const key = modifier.replace('-img', '');
		const demo = getDemoBySlug(key);
		const title = demo ? demo.name : (TITLE_MAP[key] || $target.data('title') || key);
		
		// Set tooltip title
		$tooltip.find('.map-tooltip-title').text(title || '');

		// Reset background image
		$tooltip.css('background-image', '');

		// Apply modifier class and activate tooltip
		$tooltip.attr('class', `map-image-tooltip ${modifier} active`);

		// Check if CSS background is configured, otherwise use database image
		const computedBackground = $tooltip.css('background-image');
		const hasBackgroundLayer = computedBackground && computedBackground !== 'none';
		
		if (!hasBackgroundLayer) {
			// Try to get image from database first, then fallback to data attribute
			const imageSrc = demo?.cover?.path || $target.data('image');
			applyFallbackBackground(imageSrc);
		}

		positionTooltip(event);
	};

	// Event handlers
	const handleMouseEnter = (event) => showTooltipFor(event, $(event.currentTarget));
	const handleMouseMove = (event) => {
		if ($tooltip.hasClass('active')) {
			positionTooltip(event);
		}
	};
	const handleMouseLeave = () => hideTooltip();
	
	// Mobile touch handlers - prevent tooltip on mobile to avoid conflicts with popup
	const handleTouchStart = (event) => {
		// On mobile, don't show tooltip, just prepare for click
		if (isMobile()) {
			event.preventDefault();
		}
	};
	const handleTouchEnd = () => {
		// Hide any tooltip that might be showing
		hideTooltip();
	};

	// Event bindings
	// Only bind hover handlers on non-mobile devices
	if (!isMobile()) {
		$(document)
			.on('mouseenter pointerenter', '.map-trigger', handleMouseEnter)
			.on('mousemove pointermove', '.map-trigger', handleMouseMove)
			.on('mouseleave pointerleave', '.map-trigger', handleMouseLeave);
	}

	// Always bind touch and click handlers (tooltip won't show on mobile)
	$(document)
		.on('touchstart', '.map-trigger', handleTouchStart)
		.on('touchend touchcancel', '.map-trigger', handleTouchEnd)
		.on('click', '.map-trigger', function(event) {
			// Open popup by slug matched from class list
			const classes = (this.getAttribute('class') || '').split(/\s+/);
			const slug = PREFERRED_KEYS.find(key => classes.includes(key));
			if (!slug) return;

			// Activate overlay and the specific popup
			const $overlay = $('.demo-popup-overlay');
			const $popup = $overlay.find(`.demo-popup[data-slug="${slug}"]`);
			if ($popup.length) {
				$overlay.addClass('active').attr('aria-hidden', 'false');
				$overlay.find('.demo-popup').removeClass('active').attr('aria-hidden', 'true');
				$popup.addClass('active').attr('aria-hidden', 'false');
				$('body').addClass('no-scroll');
				// Hide tooltip if visible
				hideTooltip();
				
				// On mobile, scroll to top of popup for better UX
				if (isMobile()) {
					setTimeout(() => {
						$overlay[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
					}, 100);
				}
			}
		})
		.on('click', '.demo-popup-close', function() {
			const $overlay = $('.demo-popup-overlay');
			$overlay.removeClass('active').attr('aria-hidden', 'true');
			$overlay.find('.demo-popup').removeClass('active').attr('aria-hidden', 'true');
			$('body').removeClass('no-scroll');
		})
		.on('click', '.demo-popup-overlay', function(e) {
			// Close when clicking outside the dialog box
			if ($(e.target).is('.demo-popup-overlay')) {
				$(this).removeClass('active').attr('aria-hidden', 'true');
				$(this).find('.demo-popup').removeClass('active').attr('aria-hidden', 'true');
				$('body').removeClass('no-scroll');
			}
		})
		.on('keydown', function(e){
			if (e.key === 'Escape') {
				const $overlay = $('.demo-popup-overlay');
				if ($overlay.hasClass('active')) {
					$overlay.removeClass('active').attr('aria-hidden', 'true');
					$overlay.find('.demo-popup').removeClass('active').attr('aria-hidden', 'true');
					$('body').removeClass('no-scroll');
				}
			}
		});
});


