// setInterval(Moveon, 100)

// function Moveon() {
// 	$(".text").prepend("&nbsp; ")
// 	console.log("hello")
// }

console.log("hi")

scrollVert();
var scrollLeft = 0;

function scrollVert() {
  $('html, body, *').off('mousewheel').mousewheel(function(e, delta) {
    this.scrollTop -= (delta * 40);
    console.log(this.scrollTop)
    e.preventDefault();
    setTimeout(function() {
      if ($(window).scrollTop() + $(window).height() == $(document).height())
        scrollHoriz();
    }, 0)

  });
}
function scrollHoriz() {
  $('html, body, *').off('mousewheel').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 40);
    // console.log(delta)
    e.preventDefault();
    scrollLeft=this.scrollLeft
    setTimeout(function() {
      if (scrollLeft == 0) scrollVert();
    }, 0)
  });
}