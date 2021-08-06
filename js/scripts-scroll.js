// setInterval(Moveon, 100)

// function Moveon() {
// 	$(".text").prepend("&nbsp; ")
// 	console.log("hello")
// }

scrollVert();
var scrollLeft = 0;
var containerHeight = $('.essay-segment').height()
var containerWidth = $('.essay-segment').width()

function scrollVert() {
  $('.essay-english').off('mousewheel').mousewheel(function(e, delta) {
    this.scrollTop -= (delta * 1);
    e.preventDefault(); 
    var sum = document.getElementsByClassName('essay-english')[0].scrollHeight - document.getElementsByClassName('essay-english')[0].scrollTop
    setTimeout(function() {
    	// console.log(sum)
      if (sum == containerHeight ) {
        scrollHoriz();
        scrollVertStop()
		}
    }, 0)
  });
}

function scrollVertStop() {
  $('.essay-english').off('mousewheel').mousewheel(function(e, delta) {
    this.scrollTop -= (delta * 0);
    e.preventDefault(); 
   })
}

function scrollHorizStop() {
  $('.essay-container').off('mousewheel').mousewheel(function(e, delta) {
    this.scrollTop -= (delta * 0);
    e.preventDefault(); 
   })
}


function scrollHoriz() {
  $('.essay-container').off('mousewheel').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 1);
    e.preventDefault();
    scrollLeft = this.scrollLeft
    setTimeout(function() {
      if (scrollLeft == containerWidth ) {
      	scrollVert();
        scrollHorizStop();
        } else if (scrollLeft == 0) {
        	scrollVert();
        	scrollHorizStop();
        }
    }, 0)
  });
}

// function scrollVertChinese() {
//   $('.essay-chinese').off('mousewheel').mousewheel(function(e, delta) {
//     this.scrollTop -= (delta * 1);
//     e.preventDefault(); 
//     var sum = document.getElementById('.essay-chinese').scrollHeight - document.getElementById('.essay-chinese').scrollTop
//     setTimeout(function() {
//       if (sum == containerHeight ) {
//         scrollHoriz();
// 		}
//     }, 0)
//   });
// }