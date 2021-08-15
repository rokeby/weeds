$(document).ready(function(){

    const essay = essayObj
    const $splash = $(".splash")
    const $essayModule = $(["<div class='essay-container'>",
    						"<div class='essay-segment'>",
    							"<div class='essay-english' lang='en'>",
								"</div>",
								"<div class='essay-chinese' lang='cn'>",
    							"</div>",
							"</div>",
    					"</div>"].join("\n")
					)

    let section = 0
    const essayLength = Object.keys(essay).length

	$(".right-arrow").click( function() {
		section += 1
		if(section >= (essayLength - 1)) { section = 0 }
	})

	$(".left-arrow").click( function() {
		section -= 1
		if (section < 0) { section = essayLength }	
	})

	$(".arrow").click( function() {

		$(".scroll-container").html($essayModule)
	
		console.log(section)

		sectionUpdate()
		addImages()

	})

	// find out how many images there are (2). reveal the corresponding images and no more.


	function sectionUpdate () {

		// populate text with essay.js 

		let $sectionEN = $("<p>").append("" + essay[section].en.title + "<br>") 
		let $sectionCN = $("<p>").append("" + essay[section].cn.title + "<br>")

		for(let i = 0; i < essay[section].en.text.length; i++) {
			$sectionEN.append("<br>" + essay[section].en.text[i] + "<br>")
			$sectionCN.append("<br>" + essay[section].cn.text[i] + "<br>")		
		}

		$(".essay-english").html($sectionEN)
		$(".essay-chinese").html($sectionCN)
	}

	function addImages() {

		// turn text into array in order to randomly insert image spans.
		const numObjects = 6;

		const $obstruct = ["<span class='obstruct-left'></span>", "<span class='obstruct-right'></span>"]
		const $target = [$(".essay-english p"), $(".essay-chinese p")]

		for (let i = 0; i < $target.length; i++) {

			const objArr = $target[i][0].outerHTML.split(" ")
			for (let j=0; j<numObjects; j++) {
				objArr.splice(objArr.length/4 + (Math.floor(Math.random() * objArr.length/2)), 0, $obstruct[1])
				objArr.splice(objArr.length/4 + (Math.floor(Math.random() * objArr.length/2)), 0, $obstruct[0])
			}
			newText = objArr.join(" ")
			$target[i].html(newText)
		}

		addImageListeners()
	}

	function addImageListeners() {
		$(".obstruct-left").click( function() {
			$(".obstruct-left.image").empty().removeClass("obstruct-large").removeClass("image")
			$(this).addClass("obstruct-large").addClass("image").append("<img src='" + essay[section].img[0] + "'/>")
			$(".obstruct-right").removeClass("obstruct-large")
		})

		$(".obstruct-right").click( function() {
			$(".obstruct-right.image").empty().removeClass("obstruct-large").removeClass("image")
			$(this).addClass("obstruct-large").addClass("image").append("<img src='" + essay[section].img[1] + "'/>")
			$(".obstruct-left").removeClass("obstruct-large")
		})
	}

});