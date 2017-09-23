$(document).ready(function() {
  //always show home page on refresh
	window.location = '#!/';
	//give focus to search box
	window.onload = function() {
		$("#searchBox").focus();
	}

	//when image clicked in #post populate modal with image and show modal
	$('body').on('click','#post img', function(){
		$('.modal .imgDiv').css('background-image','url('+$(this).attr('src')+')');
		$('.modal').modal('show');
	});
});

//'ngSanitise' needed to inject html code returned
//in the 'description' property of the JSON response
var flickrApp = angular.module('flickrApp', ['ngRoute','ngSanitize','ngAnimate']);

//Routing configuration
flickrApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
		})
		.when('/results', {
			templateUrl : 'pages/results.html',
		})
		.when('/post', {
			templateUrl : 'pages/post.html',
		});
});

//Controller
//$anchorScroll used to scroll to top of #post page when arriving from a scrolled position on the #results page
flickrApp.controller('MainController', function($http,$anchorScroll){
	//maintain 'this' reference
	var thi$ = this;
	//'thi$.searchQuery' is bound to the #searchBox input field
	thi$.searchQuery='';

	//Get posts either from searched words in #searchBox or potato button
	thi$.getPosts = function(event){
		//if seachBox was not the caller of this function, then it was
		//'Potato Photos' button so searchQuery = 'potato'
		if(event.target.id!=='searchBox')
			thi$.searchQuery='potato';
		//else if 'Enter' pressed in empty searchBox escape function
		else if(thi$.searchQuery.length===0)
			return
		//replace all spaces in searchQuery with commas for compatibility with API endpoint
		var tags = thi$.searchQuery.replace(/ /g,',')
		//build AJAX url and send to function that makes AJAX call
		var url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&page=2&tags='+tags+'&tagmode=all&format=json';
		thi$.getPhotosAjax(url);
	}

	//Makes AJAX call and gets photos, stores them in 'thi$.posts'
	thi$.getPhotosAjax = function(url){
		$.ajax({dataType: "json", url: url})
		.then(function(data){
			//set searchString which is bound to #results heading
			thi$.searchString = data.title;
			//store returned posts in 'thi$.posts' array
			//ng-repeat on #results page uses 'thi$.posts' to populate #postsList with '.post's
			thi$.posts = data.items;
			//go to results page
			window.location = '#!/results';
		})
	}

	// Change singular post on #post page to selected one in results using index
	thi$.postDetails = function(index){
		thi$.activePost = thi$.posts[index];
		//store selected photo's tags in 'tagsArray'
		thi$.activePost.tagArray = thi$.activePost.tags.split(' ');
		//go to, and scroll to top of, #post page
		window.location = '#!/post';
		$anchorScroll();
	}

	//Search for photos when a tag is selected on #post page
	thi$.tagSearch = function(event){
		thi$.searchQuery = event.target.innerText;
		var url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags='+event.target.innerText+'&tagmode=all&format=json';
		thi$.getPhotosAjax(url);
	}

});

//Date suffix filter for showing 'st','nd','rd' and th'
flickrApp.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'dd');
    var day = parseInt(dtfilter);
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix;
  };
});
