# Ahmed's Potato Flickr App

Hi guys,

Thanks for the assignment. I hope you like it. Here are just a few notes on...

## Layout and Design

* index's body has ng-view div into which pages #home, #results are #post injected

* 'wrapper' class used to contain the pages and center them

* buttons have class 'cta' (call to action)

* I used two breakpoints for responsiveness, 800px as per spec, and 600px for mobile stacking.

* Bootstrap not used for responsiveness due to 800px breakpoint as bootstrap's is 768px, did not want to override bootstrap breakpoints to avoid breaking other features that may be integrated later.

## Extra features

I added a few features not included in the spec, hope you like them...

  * A search box on #home to get images with desired tag or tags
  * A filter box on #results to filter out posts that do not have desired tag
  * Clicking on a tag in #post page will search flickr for images with that tag
  * Clicking on the photo in the #post page brings up modal with larger photo


## Functionality

* `window.onload` function in script.js always reroutes to #home to eliminate seeing empty #results and #post pages
* back buttons reroute to previous page (#post -> #results -> #home)
* user can either search for tags separated by spaces (later replaced with commas as per API requirement) or click the button 'potato photos' cta button
* \#searchBox is bound to mainCtrl property searchQuery
* pressing enter or clicking button launch MainController's getPosts() method
* if #searchBox empty the function is escaped with return statement
* if #searchBox called getPosts(), spaces searchQuery string replaced with commas for API compatibility and stored in tags so that if user returns to homepage searchQuery in searchBox shows their exact search and not comma joined one
* if potato button called getPosts(), searchQuery = potato
* url is built with tags and method getPhotosAjax() is called
* getPhotosAjax() makes ajax call and stores the response in MainController's posts array, and routes to results page
* ng-repeat used in #results to show data from posts array 
* if post image or title clicked MainController's postDetails() is run with the index of the source object in the array
* postDetails() populates #post page with data form selected post's corresponding object in posts array (found using indexOf()), routes to the post page and scrolls to the top
* if a tag is clicked in #post page the tagSearch() method is run
* tagSearch() runs the getPhotosAjax() with the tags set to the text of the selected tag

