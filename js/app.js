$(function() {
  menuToggle();
  scrollSpy();
  cssLoaders(); // init the css loaders
});

// show menu for mobile user
function menuToggle(){
  $("#menu-toggle, #page-cover").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("body").toggleClass("overflow");
  });

  $("#navbar li>a").click(function(){
    $("#wrapper").removeClass("toggled");
    $("body").removeClass("overflow");
    //$('#page-content-wrapper').scrollTo(this.hash, this.hash); 
  });
}

// Spy on the scroll
function scrollSpy(){
  var aChildren = $("#navbar li>a"); // find the a children of the list items
  var navLinks = []; // create the empty navLinks
  var iframeElements = $('iframe');
  var iframes = [];

  // this for loop fills the navLinks with attribute href values
  for (var i=0; i < aChildren.length; i++) {    
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    navLinks.push(ahref);
  }

  // build array with iframes content
  for (var i = 0; i < iframeElements.length; i++) {
    var iframeElement = iframeElements[i];
    var src = $(iframeElement).attr('data-src');
    $(iframeElement).attr({'id': 'video-'+(i+1), "src" : "about:blank"});
    iframes.push({"src": src, "id": 'video-'+(i+1)});

    // Add loader content for iFrame
    $(iframeElement).parent().prepend('<div class="loader"><div class="loader-inner ball-scale-ripple-multiple"></div></div>');
  };

  // scrollSpy on the page-content-wrapper
  $('#page-content-wrapper').scroll(function(){
    var windowPos = $('#page-content-wrapper').scrollTop();
    var docHeight = $('body').height()/2;

    // navSpy highlighting the nav as page scroll
    for (var i=0; i < navLinks.length; i++) {
      var theID = navLinks[i];
      var selecter = "a[href='" + theID + "']";

      if($(theID).length){
        var divPos = $(theID).offset().top; // get the offset of the div from the top of page
        var divHeight = $(theID).height(); // get the height of the div in question
        if(divPos<0){
          $(theID+' .intro-header').css({'background-position-y': Math.abs(parseInt(divPos/10))+'px'});  
        }else{
          $(theID+' .intro-header').css({'background-position-y': '0px'});
        }
        
        if (divPos <= docHeight && docHeight < (divPos + divHeight)) {
          $(selecter).addClass("active");
        } else {
          $(selecter).removeClass("active");
        }

        // scroll the nav
        $('#navbar').scrollTop(windowPos/100);
      }
    }
    // navSpy END

    // lazyload the video
    docHeight = $('body').height();
    for (var i = 0; i < iframes.length; i++) {
      var iframe = iframes[i];
      var selecter = "#"+iframe.id;

      if($(iframe).length){
        var divPos = $(selecter).offset().top; // get the offset of the div from the top of page
        
        if (divPos <= docHeight && !$(selecter).hasClass('lazyload')) {
          $(selecter).addClass("lazyload").attr('src', iframe.src).removeAttr('data-src');
        }
      }
    };
    // Lazyload END
  });
}