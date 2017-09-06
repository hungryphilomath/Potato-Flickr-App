$(document).ready(function(){

///////ONLOAD CODE

// resizeElements();



//////FUNCTIONS

/*
function resizeElements(){
   $('#album #gallery .frame').height(($('#album #gallery .frame').width()*3)/4);
  // Resize columns to be equal height for windows wider than 767px
  if (!window.matchMedia('(max-width: 767px)').matches) {
    var heights = $('#comedy .tile,#writing .tile').map(function(){
      return $(this).height();
    }).get();
    $('.tile').map(function(){
      $(this).height(Math.max.apply(null, heights))
    })
  }
  var heights = $('#photography .tile').map(function(){
    return $(this).height();
  }).get();
  $('#photography .tile').map(function(){
    $(this).height(Math.max.apply(null, heights))
  })
}
*/

///////BINDED FUNCTIONS

/*Resize elements on window resize*/
$(window).resize(function(){
  resizeElements();
});

/*Bootstrap scroll spy adds 'active' class to the <li> elements with a child <a>
 containing href linking to the section or div currently in view*/
$('#home').scrollspy({target:'nav',offset:200});

/*Nav "burger" menu button*/
$('.navBurger').click(function(){
	$(this).toggleClass('open');
	$('nav').toggle('slide', {direction:'right'});
});

/*Smooth scrolling when navbar <li> element clicked*/
$('.myNavbar li').click(function(e){
	//prevent default behaviour of page jumping direclty to link
	e.preventDefault();
	//get ID of target section
	var clickedId = $(this).children('a').attr('href');
	//get y coordinates of top of targetted section
	var clickedIdY = $(clickedId).offset().top;
	var scrollPosition = clickedIdY;
	// if mobile navbar
	if($('nav').width() === 175){
		//remove 'open' class from burger menu to switch from X to burger
		$('.navBurger').removeClass('open');
		//hide mobile navbar
		$('nav').toggle('slide',{direction:'right'});
	} else{
		//get height of navbar with padding
		var navbarHeight = $('nav').outerHeight();
		//subtract navbar height from scrollPosition so target section appears below navbar
		scrollPosition -= navbarHeight;
	}
	//smooth scroll to scrollPosition (jquery UI plugin required)
	$('html, body').animate({scrollTop: scrollPosition},1250,'easeInOutExpo');
});



})
