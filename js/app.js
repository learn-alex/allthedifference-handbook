$(function() {
  menuToggle();
  scrollSpy();
  showTooltip();
  navFunctionality();
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

// show tooltip
function showTooltip(){
  // add tooltip to class
  $('.highlight').attr({"data-toggle": "tooltip", "data-placement": "auto top", "title": "Pay attention to highlighted words and build your vocabulary!"});
  $('.pencil').attr({"data-toggle": "tooltip", "data-placement": "auto top", "title": "Each activity with this pencil is worth 10 points. Keep track of your points and add up your score."});
  // init tooltip
  $('[data-toggle="tooltip"]').tooltip();
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
    var i;

    // navSpy highlighting the nav as page scroll
    for (i = 0; i < navLinks.length; i++) {
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
        
        // scroll the nav
        $('#navbar').scrollTop(windowPos/100);
      }
    }
    // navSpy END

    // lazyload the video
    docHeight = $('body').height();
    for (i = 0; i < iframes.length; i++) {
      var iframe = iframes[i];
      var selecter = "#"+iframe.id;

      if($(iframe).length){
        var divPos = $(selecter).offset().top; // get the offset of the div from the top of page
        
        if (divPos <= docHeight && !$(selecter).hasClass('lazyload')) {
          $(selecter).addClass("lazyload").attr('src', iframe.src).removeAttr('data-src');
        }
      }
    }
    // Lazyload END
  });
}

function navFunctionality(){
  highlightNav();
  unfoldNav();
}

function highlightNav(){
  $('ul#navbar a').on('click', function(){
    var allLinks = $('ul#navbar a');

    // Remove class active from all nav elems 
    allLinks.removeClass('active');
    addActiveToNestedElems($(this));
  });
}

function addActiveToNestedElems(elem){
  // This funciton will highlight all parent navigation of the clicked element. 

  var end = false;
  while(!end){
    // Add class active to the current nav elem
    elem.addClass('active');

    // If the current nav elem is a nav header, break the loop
    if (elem.closest('ul').attr('id') == 'navbar'){ end = true; }

    // Otherwise, traverse up the nav bar to the parent elem of the clicked elem. Set 'elem' to that element. 
    elem = elem.closest('ul').closest('li').children('a').first();
  }
}

function unfoldNav(){
  $('ul#navbar .nav-sub1 li a').on('click', function(){
    $(this).closest('li').children('.nav-sub2').toggle();
    console.log($(this))
  });
}


