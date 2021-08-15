$(document).ready(function(){

    var essay = essayObj
    var $splash = $(".splash")
    var $essayModule = $(["<div class='essay-container'>",
    						"<div class='essay-segment'>",
    							"<div class='essay-english' lang='en'>",
								"</div>",
								"<div class='essay-chinese' lang='cn'>",
    							"</div>",
							"</div>",
    					"</div>"].join("\n")
					)

    var section = 0
    var imageCount = 0

	$(".right-arrow").click( function() {
		section += 1
		if(section >= (Object.keys(essay).length - 1)) { section = 0 }
	})

	$(".left-arrow").click( function() {
		section -= 1
		if (section < 0) { section = 8 }	
	})

	$(".arrow").click( function() {

		$(".scroll-container").html($essayModule)
	
		console.log(section)

		sectionUpdate()
		addImages()
		addImages()

	})

	// find out how many images there are (2). reveal the corresponding images and no more.


	function sectionUpdate () {

		// populate text with essay.js 

		var $sectionEN = $("<p>").append("" + essay[section].en.title + "<br>") 
		var $sectionCN = $("<p>").append("" + essay[section].cn.title + "<br>")

		for(let i = 0; i < essay[section].en.text.length; i++) {
			$sectionEN.append("<br>" + essay[section].en.text[i] + "<br>")
			$sectionCN.append("<br>" + essay[section].cn.text[i] + "<br>")		
		}

		$(".essay-english").html($sectionEN)
		$(".essay-chinese").html($sectionCN)
	}

	function addImages() {

		// turn text into array in order to randomly insert image spans.

		var $obstruct = "<span class='obstruct-left'></span>"
		var $target = [$(".essay-english p"), $(".essay-chinese p")]

		for (let i = 0; i < $target.length; i++) {

			const myArr = $target[i][0].outerHTML.split(" ")
			myArr.splice((Math.floor(Math.random() * myArr.length/2)), 0, $obstruct)
			newText = myArr.join(" ")
			$target[i].html(newText)
			// console.log($target[i][0])

		}

		obstructMovements()
	}

	function obstructMovements() {
			$(".obstruct-left").click( function() {
			$(this).addClass("obstruct-large image").append("<img src='" + essay[section].img[0] + "'/>")
			$(".obstruct-right").removeClass("obstruct-large")
		})

		$(".obstruct-right").click( function() {
			$(this).addClass("obstruct-large image").append("<img src='" + essay[section].img[0] + "'/>")
			$(".obstruct-left").removeClass("obstruct-large")
		})
	}

});