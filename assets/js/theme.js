///////////////////////////////		
// Set Variables
///////////////////////////////

var gridContainer = jQuery('.thumbs');
var colW;
var gridGutter = 0;
var thumbWidth = 350;
var themeColumns = 3;
var homeBannerTextOffset = -20;
var stickyNavOffsetTop;
var topOffest = (jQuery('body').hasClass('admin-bar')) ? 32 : 0;
var OS;

///////////////////////////////		
// Mobile Detection
///////////////////////////////

function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
		(navigator.userAgent.match(/webOS/i)) ||
		(navigator.userAgent.match(/iPhone/i)) ||
		(navigator.userAgent.match(/iPod/i)) ||
		(navigator.userAgent.match(/iPad/i)) ||
		(navigator.userAgent.match(/BlackBerry/))
    );
}


///////////////////////////////
// Project Filtering 
///////////////////////////////

function projectFilterInit() {
	jQuery('#filterNav a').click(function(){
		var selector = jQuery(this).attr('data-filter');		
		jQuery('#projects .thumbs').isotope({
			filter: selector,			
			hiddenStyle : {
		    	opacity: 0,
		    	scale : 1
			}
		});
	
		if ( !jQuery(this).hasClass('selected') ) {
			jQuery(this).parents('#filterNav').find('.selected').removeClass('selected');
			jQuery(this).addClass('selected');
		}
	
		return false;
	});	
}


///////////////////////////////
// Isotope Items
///////////////////////////////

function isotopeInit() {	
	setColumns();	
	gridContainer.isotope({		
		resizable: false,
		layoutMode: 'fitRows',
		masonry: {
			columnWidth: colW
		}
	});	
	
	jQuery(".thumbs .small").css("visibility", "visible");
			
}

///////////////////////////////
// Isotope Grid Resize
///////////////////////////////

function setColumns()
{	
	var columns;
	var gw = gridContainer.width();
	if(gw<=700){
		columns = 1;		
	}else{
		columns = 3;		
	}
	colW = Math.floor(gw / columns);		
	jQuery('.thumbs .small').each(function(id){
		jQuery(this).css('width',colW+'px');			
	});	
	jQuery('.thumbs .small').show();
}

function gridResize() {	
	setColumns();
	gridContainer.isotope({		
		resizable: false,
		layoutMode: 'fitRows',
		masonry: {
			columnWidth: colW
		}
	});
}

///////////////////////////////
// Set Home Slideshow Height
///////////////////////////////

function setHomeBannerHeight() {
	var windowHeight = jQuery(window).height()-topOffest;	
	jQuery('.home #homeBanner').height(windowHeight / 2.5);	
	jQuery('.home #header .bottom').height(windowHeight / 2.5);	
	
}

///////////////////////////////
// Center Home Slideshow Text
///////////////////////////////

function centerHomeBannerText() {
		var bannerText = jQuery('.home #homeBanner #bannerText');
		var bannerTextTop = (jQuery('.home #header').actual('height')/2) - (jQuery('.home #homeBanner #bannerText').actual('height')/2);		
		bannerText.css('margin-top', bannerTextTop+'px');		
		bannerText.show();		
}

///////////////////////////////
// Home Slideshow Parallax
///////////////////////////////

function homeParallax(){
	if(jQuery('body').hasClass('home')){	
		var top = jQuery(this).scrollTop();			
		//jQuery('.home #homeBanner #bannerText').css('transform', 'translateY(' + (-top/3) + 'px)');
		jQuery('#homeBanner.hasBackground').css({'background-position' : 'center ' + (-top/6)+"px"});
		//jQuery('.homeSection.hasBackground').css({'background-position' : 'center ' + (-(top-1600)/6)+"px"});		
		//Scroll and fade out the banner text
	    jQuery('.home #homeBanner #bannerText').css({'opacity' : 1-(top/700)});		
	}	
}

///////////////////////////////
// Sticky Nav Offset
///////////////////////////////

function setStickyNavOffset(){
	if(!jQuery('body').hasClass('home')){	
		jQuery('#header').css('height', jQuery('#header .top').height() );
	}	
}

///////////////////////////////
// SlideNav
///////////////////////////////

function setSlideNav(){
	jQuery(".menuToggle").pageslide({ direction: "left"});
}

function setHeaderBackground() {		
	var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top	
	
	if (scrollTop > 300 || jQuery(window).width() < 700) { 
		jQuery('#header .top').addClass('solid');
	} else {
		jQuery('#header .top').removeClass('solid');		
	}
}


///////////////////////////////
// Initialize
///////////////////////////////	
	
jQuery.noConflict();
jQuery(document).ready(function(){	
	//Stuff that happens after images are loaded
	jQuery('#container').imagesLoaded(function(){	
		setStickyNavOffset();
		isotopeInit();	
		projectFilterInit();
		if(jQuery('body').hasClass('home')){
			setHomeBannerHeight();
			centerHomeBannerText();
		}
		jQuery('#container').css('opacity', '1' );	
	});
	
	setSlideNav();
	
	setHeaderBackground();	
	if(!isMobile() && jQuery(window).width() >700){			
		homeParallax();
	}	
	
	//Resize events
	jQuery(window).smartresize(function(){
		gridResize();
		setHomeBannerHeight();
		centerHomeBannerText();	
		setHeaderBackground();	
	});
	
	//Scroll events
	jQuery(window).scroll(function() {	
		setHeaderBackground();	
		if(!isMobile() && jQuery(window).width() > 700){			
			homeParallax();
		}
	});
	
	//Set Down Arrow Button
	jQuery('#downButton').click(function(){		
		jQuery.scrollTo("#middle", 1000, { offset:-(jQuery('#header .top').height()+topOffest), axis:'y' });
	});	

	//Scroll to Sections
	jQuery('#to-webdev').click(function(){		
		jQuery.scrollTo("#webdev", 1000, { offset:-(jQuery('#header .top').height()+topOffest), axis:'y' });
	});
	jQuery('#to-stats').click(function(){		
		jQuery.scrollTo("#stats", 1000, { offset:-(jQuery('#header .top').height()+topOffest), axis:'y' });
	});
	jQuery('#to-writing').click(function(){		
		jQuery.scrollTo("#writing", 1000, { offset:-(jQuery('#header .top').height()+topOffest), axis:'y' });
	});
	
	jQuery('img').attr('title','');	
});

jQuery(window).load(function(){
	jQuery('body').width(jQuery('body').width()+1).width('auto');
});
