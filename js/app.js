$(function() {
  menuToggle();
  scrollSpy();
});

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

function scrollSpy(){
  var aChildren = $("#navbar li>a"); // find the a children of the list items
  var aArray = []; // create the empty aArray
  for (var i=0; i < aChildren.length; i++) {    
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
  } // this for loop fills the aArray with attribute href values

  $('#page-content-wrapper').scroll(function(){
    var windowPos = $('#page-content-wrapper').scrollTop();
    var docHeight = $('body').height()/2;

    for (var i=0; i < aArray.length; i++) {
      var theID = aArray[i];
      var selecter = "a[href='" + theID + "']";

      if($(theID).length){
        var divPos = $(theID).offset().top; // get the offset of the div from the top of page
        var divHeight = $(theID).height(); // get the height of the div in question

        if (divPos <= docHeight && docHeight < (divPos + divHeight)) {
          $(selecter).addClass("active");
        } else {
          $(selecter).removeClass("active");
        }

        // scroll the nav
        $('#navbar').scrollTop(windowPos/100);
      }
    }
  });
}