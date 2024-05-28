$(window).scroll(animateNumbers);
var viewed = false;

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};
// var keepFooter = function(documentHasScroll){
//     if (!document.getElementById("layout-footer")){
//         return;
//     }
//
//     if(documentHasScroll){
//         document.getElementById("layout-footer").classList.remove('fixed-bottom');
//     }else{
//         document.getElementById("layout-footer").classList.add('fixed-bottom');
//     }
// }



$(document).ready(function() {
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}

	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);


	$('body').on('click', '.work_packages .accordion-toggle, .pilots .accordion-toggle, .messages .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children().find(".plusminus").text('+');
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children().find(".plusminus").text('-');
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});

	$('.work_packages .accordion-content, .pilots .accordion-content, .messages .accordion-toggle').each(function( index, value ) {
		$(value).find('a').attr( "onclick", "window.open(this.href, '_blank');" )
	});

	$('.pilots .accordion-border').click(function(){
		// $("path").removeClass('active_path');
		// var tooltip = document.getElementById("tooltip");
		// tooltip.classList.remove("active");
		var title = $(this).find(".accordion-toggle .col-xs.start-xs").text();
		var toggler = $(this).find(".accordion-toggle");

		if (toggler.next(".accordion-content").is(':visible')) {
			$("path[title='"+title+"']").removeClass('active_path');
		} else {
			$("path[title='"+title+"']").addClass('active_path');
		}
	});

	$('.nav.nav-pills').removeAttr('id');

	var count = $("h1").text().length;


	$('.events .tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and its associated content
		var $active, $content, $links = $(this).find('a');
		var speed = "fast";
		var activeTab = $(location.hash);
		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

        if($(this).parent().parent().hasClass('events')){
            $active.addClass('active');
        }

		$content = $($active[0].hash);

		// Hide the remaining content
		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		if(activeTab.length){
			$content.slideDown(speed);
			//scroll to element
			$('html, body').animate({
				scrollTop:  activeTab.offset().top - $('header').height()
			}, speed);
		}

		// Bind the click event handler
		$(this).find("a").click(function (e) {
			if($(this).hasClass('active')) {
				$content.slideDown({
					scrollTop: $content.offset().top - $('header').height()
				}, speed);
				var screenSize = getScreenSize();
				if (screenSize.width < 800) {
					// scroll to element
					$('html, body').animate({
						scrollTop: $content.offset().top - $('header').height() + 300  // mobile
					}, speed);
				}else{
					//scroll to element icons top
					$('html, body').animate({
						scrollTop:  $content.offset().top - $('header').height() + 300
					}, speed);
				}
				e.preventDefault();
				return false;
			}
			// Make the old tab inactive.
			$active.removeClass('active');
			// $content.slideUp({
			// 	scrollTop: $content.offset().top - $('header').height() - $('.left_sidebar').height()
			// }, speed);
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $(this.hash);

			location.hash = $active[0].hash;

			// Make the tab active.
			$active.addClass('active');
			$content.slideDown({
				scrollTop: $content.offset().top - $('header').height()
			}, speed);
			// var screenSize = getScreenSize();
			// if (screenSize.width < 800) {
			// 	// scroll to element
			// 	$('html, body').animate({
			// 		scrollTop: $content.offset().top - $('header').height() + 300 // mobile
			// 	}, speed);
			// }else{
			// 	//scroll to element icons top
			// 	$('html, body').animate({
			// 		scrollTop:  $content.offset().top - $('header').height() + 300
			// 	}, speed);
			// }

			// Prevent the anchor\'s default click action
			e.preventDefault();
		});
	});

    // News category tabs
    $('.category-tabs-container a').click(function() {
        $('.category-tabs-container a').removeClass('active');
        $(this).addClass('active');
    });

	$('.numbers').attr('data-aos', 'fade-up');
	$('.mission .container').attr('data-aos', 'fade-up');
	$('.vision .container').attr('data-aos', 'fade-up');
	$('.goals .container').attr('data-aos', 'fade-up');
	$('.card-img-top').attr('data-aos', 'fade-up');
	$('.logo-container').attr('data-aos', 'fade-up');
	$('.subscribe-items a').attr('data-aos', 'fade-up');
	$('.icons a').attr('data-aos', 'fade-up');
	$('.about h1.display-1').attr('data-aos', 'fade-up');
	$('h2.underline').attr('data-aos', 'fade-up');
	$('.news_column').attr('data-aos', 'fade-up');
	$('.timeline-item').attr('data-aos', 'fade-up');

	// about page

	$('.about img').attr('data-aos', 'fade-up');

	$('.country_map').attr('data-aos', 'fade-up');
	$('.partner-item').attr('data-aos', 'fade-up');

	// media
	$('.flyer_image_container img').attr('data-aos', 'fade-up');
	$('.broshure_and_poster img').attr('data-aos', 'fade-up');
	$('.card_image_container').attr('data-aos', 'fade-up');
	$('.coordinator_image').attr('data-aos', 'fade-up');


// 	// create references to the modal...
// 	var modal = document.getElementById('myModal');
// // to all images -- note I'm using a class!o
// 	var images = document.getElementsByClassName('myImages');
// // the image in the modal
// 	var modalImg = document.getElementById("img01");
// // and the caption in the modal
// 	var captionText = document.getElementById("caption");
//
// // Go through all of the images with our custom class
// 	for (var i = 0; i < images.length; i++) {
// 		var img = images[i];
// 		// and attach our click listener for this image.
// 		img.onclick = function(evt) {
// 			modal.style.display = "block";
// 			modalImg.src = this.src;
// 			captionText.innerHTML = this.alt;
// 		}
// 	}
//
// 	var span = document.getElementsByClassName("close_modal")[0];
//
// 	span.onclick = function() {
// 		modal.style.display = "none";
// 	}

	$('.partners .partner_description, .partners .list-item-body').each(function(){
		var countParagraphs = $(this).find('p').length;
		if(countParagraphs > 1) {
			$(this).find('p').first().append('<div class="dorsal">Read more</div>');
			$(this).find('p:not(:first)').wrapAll("<div class='toogle-contact-paragraphs'></div>")
		}
	});

	$('.dorsal').click(function () {
		var link = $(this);
		link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
			if ($(this).is(':visible')) {
				link.text('Read less');
			} else {
				link.text('Read more');
			}
		});

	});

	$('.see_all_partners_link').hide();

	$('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
		'<a class="folder-background" style="display:flex; background: url(https://rest-coast.eu/storage/app/media/pensoft/living-documents.svg) center center no-repeat; background-size: 100px; height: 200px" href="/internal-repository/living-documents" title="Living documents"></a>\n' +
		'<h3 class="card-header"><a href="/internal-repository/living-documents" title="Living documents">Living documents</a></h3>\n' +
		'</div>').insertAfter($('.card.internal').last());

	$('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
		'<a class="folder-background" style="display:flex; background: url(https://rest-coast.eu/storage/app/media/pensoft/living-documents.svg) center center no-repeat; background-size: 100px; height: 200px" href="/internal-repository/dissemination-report-forms" title="Dissemination report forms"></a>\n' +
		'<h3 class="card-header"><a href="/internal-repository/dissemination-report-forms" title="Reporting forms">Reporting forms</a></h3>\n' +
		'</div>').insertAfter($('.card.internal').last());

	$('<small>To download individual image please right click</small>').insertAfter($('.all_images_container'));


});


function createTippy(element, options) {
	return new Promise(resolve => {
		tippy(element, Object.assign({}, {
			allowHTML: true,
			interactive: true,
			animation: 'scale',
			theme: 'light',
            placement: 'left',
		}, options));
		resolve();
	});
}
//
// function getScreenSize() {
// 	var myHeight = 0;
// 	var myWidth = 0;
// 	if (window.innerWidth && window.innerHeight) {
// 		// Netscape & Mozilla
// 		myHeight = window.innerHeight;
// 		myWidth = window.innerWidth;
// 	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
// 		// IE > 6
// 		myHeight = document.documentElement.clientHeight;
// 		myWidth = document.documentElement.clientWidth;
// 	} else if (document.body.offsetWidth && document.body.offsetHeight) {
// 		// IE = 6
// 		myHeight = document.body.offsetHeight;
// 		myWidth = document.body.offsetWidth;
// 	} else if (document.body.clientWidth && document.body.clientHeight) {
// 		// IE < 6
// 		myHeight = document.body.clientHeight;
// 		myWidth = document.body.clientWidth;
// 	}
//
// 	return {'width': myWidth, 'height': myHeight};
// }



function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSearchAndSocialMedia(){
	var liSearch = '<li class="nav-item search_field"><a href=\"javascript: void(0);\" onclick=\"showSearchForm();\"></a></li>';
	// var liSocial = '<li class="nav-item social"><a href=\"https://www.facebook.com/BiCIKLProjectH2020\" target=\"_blank\" class=\"pr p-facebook big\" target=\"_blank\"></a><a href=\"https://twitter.com/BiCIKL_H2020\" target=\"_blank\" class=\"pr p-twitter big\" target=\"_blank\"></a></li>';
	var menu = $('#menuToggle');
	// menu.find('>ul').append(liSearch).append(liSocial);
	menu.find('>ul').append(liSearch);
}

function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
}

function requestFormLibrary() {
	$('#mylibraryForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function requestFormPartners() {
	$('#myPartnersForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	if($(elem).height()){
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	return;

}

function animateNumbersOld() {
	if (isScrolledIntoView($(".numbers")) && !viewed) {
		viewed = true;
		$('.count').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 1500,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	}
}


function animateNumbers() {
	if (isScrolledIntoView($(".numbers")) && !viewed) {
		viewed = true;
		$('.count').each(function () {
			var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 1800,
				easing: 'swing',
				step: function (now) {
					$(this).text(parseFloat(now).toFixed(size));
				}
			});
		});
	}
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
		appendSearchAndSocialMedia()
		requestFormLibrary()
		// requestFormPartners()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

function handlePilotsSVGMapMouseMove(event) {
	var title = $(event.target).attr('title');
	var tooltip = document.getElementById("tooltip");
	if (!title) {
		title = $(event.target).parent().attr('title');
	}

	switch (title) {
		case 'Nahal Dalia':
		case 'Catalan coast Ebro delta':
		case 'Rhone Delta':
		case 'Venice lagoon':
		case 'Foros Bay':
		case 'Wadden Sea':
		case 'Sicily lagoon':
		case 'Arcachon bay':
		case 'Vistula lagoon':
			break;
		default:
			return tooltip.classList.remove("active");
	}

	var x = event.clientX;
	var y = event.clientY;

	tooltip.style.left = (x + 20) + "px";
	tooltip.style.top = (y - 20) + "px";

	tooltip.innerHTML = $(event.target).attr('title');
	tooltip.classList.add("active");

}

function onPilots(pTitle) {
	// $("path").removeClass('active_path');
	var tooltip = document.getElementById("tooltip");
	tooltip.classList.remove("active");
	$("path[title='"+pTitle+"']").addClass('active_path');

	$('.accordion-border').each(function(){
		var title = $(this).find(".accordion-toggle .col-xs.start-xs").text();
		var toggler = $(this).find(".accordion-toggle");

		if(title == pTitle && !toggler.next(".accordion-content").is(':visible')){
			toggler.trigger( "click" );
		}
	});
}

function createCustomTippy(element, options) {
    return new Promise(resolve => {
        tippy(element, Object.assign({}, {
            allowHTML: true,
            interactive: true,
            animation: 'scale',
            theme: 'light',
            trigger: 'click',
        }, options));
        resolve();
    });
}


function initMailingTooltip(){
    var searchStr = '';
    $('.group-holder').eq(0).find('.inputWithTooltip span').each(function(i, obj) {
        $('<img src="/storage/app/media/CMS_icons_groups.svg" style="max-width: 16px; margin-right: 5px;" class="icon mailing_list_tooltip_'+i+'" />').insertBefore(this);
        searchStr = $.trim($(obj).text());
        //groups
        $.request('onFetchMailingList', {
            update: { 'mailing_list': '#mailing_list_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('<script>createTippy(\'.row:nth-of-type(3) .row:nth-of-type(2) .mailing_list_tooltip_' + i + '\', {' +
                'placement: \'left\',\n' +
                'content: \'' + response.mailing_list + '\'})</script>').insertAfter(this);
        });
    });
    $('.group-holder').eq(1).find('.inputWithTooltip span').each(function(i, obj) {
        $('<img src="/storage/app/media/CMS_icons_individuals.svg" style="max-width: 16px; margin-right: 5px;" class="icon mailing_list_tooltip_individuals_'+i+'" />').insertBefore(this);
        searchStr = $.trim($(obj).text());
        //individuals
        $.request('onFetchSingleMail', {
            update: { 'individual_email': '#individual_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('<script>createTippy(\'.row:nth-of-type(4) .row:nth-of-type(2) .mailing_list_tooltip_individuals_' + i + '\', {' +
                'placement: \'left\',\n' +
                'content: \'' + response.individual_email + '\'})</script>').insertAfter(this);
        });
    });
}

function handleCustomSVGMapMouseMove(event) {
    var countryCode = $(event.target).parent().attr('country_code');
    var title = $(event.target).parent().attr('title');

    if(!title){
        title = $(event.target).attr('title');
        countryCode = $(event.target).attr('country_code');
    }
    if(!title){
        title = $(event.target).parent().parent().attr('title');
        countryCode = $(event.target).parent().parent().attr('country_code');
    }

    var tooltip = document.getElementById("tooltip");

    switch (countryCode) {
        case "AF":
        case "AX":
        case "AL":
        case "DZ":
        case "AS":
        case "AD":
        case "AO":
        case "AI":
        case "AQ":
        case "AG":
        case "AR":
        case "AM":
        case "AW":
        case "AT":
        case "AZ":
        case "BS":
        case "BH":
        case "BD":
        case "BB":
        case "BY":
        case "BE":
        case "BZ":
        case "BJ":
        case "BM":
        case "BT":
        case "BO":
        case "BQ":
        case "BA":
        case "BW":
        case "BV":
        case "BR":
        case "IO":
        case "BN":
        case "BG":
        case "BF":
        case "BI":
        case "KH":
        case "CM":
        case "CV":
        case "KY":
        case "CF":
        case "TD":
        case "CL":
        case "CN":
        case "CX":
        case "CC":
        case "CO":
        case "KM":
        case "CG":
        case "CD":
        case "CK":
        case "CR":
        case "CI":
        case "HR":
        case "CU":
        case "CW":
        case "CY":
        case "CZ":
        case "DK":
        case "DJ":
        case "DM":
        case "DO":
        case "EC":
        case "EG":
        case "SV":
        case "GQ":
        case "ER":
        case "EE":
        case "ET":
        case "FK":
        case "FO":
        case "FI":
        case "FJ":
        case "GF":
        case "PF":
        case "TF":
        case "GA":
        case "GM":
        case "GE":
        case "GH":
        case "GI":
        case "GR":
        case "GL":
        case "GD":
        case "GP":
        case "GU":
        case "GT":
        case "GG":
        case "GN":
        case "GW":
        case "GY":
        case "HT":
        case "HM":
        case "VA":
        case "HN":
        case "HK":
        case "IS":
        case "ID":
        case "IR":
        case "IQ":
        case "IM":
        case "IL":
        case "IT":
        case "JM":
        case "JP":
        case "JE":
        case "JO":
        case "KZ":
        case "KE":
        case "KI":
        case "KP":
        case "KR":
        case "KW":
        case "KG":
        case "LA":
        case "LV":
        case "LB":
        case "LS":
        case "LR":
        case "LY":
        case "LI":
        case "LT":
        case "LU":
        case "MO":
        case "MK":
        case "MG":
        case "MW":
        case "MY":
        case "MV":
        case "ML":
        case "MT":
        case "MH":
        case "MQ":
        case "MR":
        case "MU":
        case "YT":
        case "MX":
        case "FM":
        case "MD":
        case "MC":
        case "MN":
        case "ME":
        case "MS":
        case "MA":
        case "MZ":
        case "MM":
        case "NA":
        case "NR":
        case "NP":
        case "NC":
        case "FR":
        case "IN":
        case "NL":
        case "HU":
        case "IE":
        case "CA":
        case "NZ":
        case "DE":
        case "NI":
        case "NE":
        case "NG":
        case "NU":
        case "NF":
        case "MP":
        case "NO":
        case "OM":
        case "PK":
        case "PW":
        case "PS":
        case "PA":
        case "PG":
        case "PY":
        case "PE":
        case "PH":
        case "PN":
        case "PT":
        case "PR":
        case "QA":
        case "RE":
        case "RU":
        case "RW":
        case "BL":
        case "SH":
        case "KN":
        case "LC":
        case "MF":
        case "PM":
        case "VC":
        case "WS":
        case "SM":
        case "ST":
        case "SA":
        case "SN":
        case "RS":
        case "SC":
        case "SL":
        case "SG":
        case "SX":
        case "SK":
        case "SI":
        case "SB":
        case "SO":
        case "ZA":
        case "GS":
        case "LK":
        case "SD":
        case "SR":
        case "SJ":
        case "SZ":
        case "SE":
        case "SY":
        case "TW":
        case "TJ":
        case "TZ":
        case "TH":
        case "TL":
        case "TG":
        case "TK":
        case "TO":
        case "TT":
        case "TN":
        case "TR":
        case "TM":
        case "TC":
        case "TV":
        case "UG":
        case "UA":
        case "AE":
        case "UM":
        case "UY":
        case "UZ":
        case "VU":
        case "VE":
        case "VN":
        case "VG":
        case "VI":
        case "WF":
        case "EH":
        case "YE":
        case "ZM":
        case "ZW":
        case "US":
        case "GB":
        case "ES":
        case "AU":
        case "RO":
        case "CH":
        case "PL":
            break;
        default:
            return tooltip.classList.remove("active");
    }

    var x = event.clientX;
    var y = event.clientY;

    tooltip.style.left = (x + 20) + "px";
    tooltip.style.top = (y - 20) + "px";

    tooltip.innerHTML = title;
    tooltip.classList.add("active");

}



init()
