$(document).ready(function(){

    const essay = essayObj
    const $splash = $(".splash")
    const $introElements = $(["<div class='splash'>",
							"<img src='./assets/main-image.png'/>",
							"<div class='intro'>",
								"<div class='intro-text'>",
								"</div>",
							"</div>",
    					"</div>"].join("\n")
					)

    const $essayElements = $(["<div class='essay-container'>",
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

    sectionUpdate()

    $(".scenes li").click( function() {
    	section = $(this).data("attr")
		sectionUpdate()
		addImages()
    })

	$(".right-arrow").click( function() {
		section += 1
		if(section >= (essayLength - 1)) { section = 0 }
	})

	$(".left-arrow").click( function() {
		section -= 1
		if (section < 0) { section = essayLength }	
	})

	$(".arrow").click( function() {
	
		sectionUpdate()
		addImages()

	})

	// find out how many images there are (2). reveal the corresponding images and no more.


	function sectionUpdate () {

		// populate text with essay.js 

		let $sectionEN = $("<p>").append("" + essay[section].en.title + "<br>") 
		let $sectionCN = $("<p>").append("" + essay[section].cn.title + "<br>")
		let $introEN = $("<p>")
		let $introCN = $("<p>")

		if(section == 0) {

			$(".scroll-container").html($introElements)

			for(let i = 0; i < essay[section].en.text.length; i++) {
				$introEN.append(essay[section].en.text[i] + "<br>")
				$introCN.append(essay[section].cn.text[i] + "<br>")		
			}

			$(".intro-text").html($introEN).append($introCN)

    	} else if (section > 0) {

			$(".scroll-container").html($essayElements)


			for(let i = 0; i < essay[section].en.text.length; i++) {
				$sectionEN.append("<br>" + essay[section].en.text[i] + "<br>")
				$sectionCN.append("<br>" + essay[section].cn.text[i] + "<br>")		
			}

			$(".essay-english").html($sectionEN)
			$(".essay-chinese").html($sectionCN)
		}
	}

	function addImages() {

		// turn text into array in order to randomly insert image spans.
		const numObjects = 3;

		const $obstruct = ["<span class='obstruct-left'></span>", "<span class='obstruct-right'></span>"]
		const $target = [$(".essay-english p"), $(".essay-chinese p")]

		for (let i = 0; i < $target.length; i++) {

			const objArr = $target[i][0].outerHTML.split(" ")
			for (let j=0; j<numObjects; j++) {
				objArr.splice(objArr.length/6 + (Math.floor(Math.random() * objArr.length/2)), 0, $obstruct[1])
				objArr.splice(objArr.length/6 + (Math.floor(Math.random() * objArr.length/2)), 0, $obstruct[0])
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

	// function scrollListener() {
	//   $('.essay-english, .essay-chinese').off('mousewheel').mousewheel(function(e, delta) {
	//     this.scrollTop -= (delta * 1);
	//     e.preventDefault(); 
	//     console.log(scrollTop)
	//     // var sum = document.getElementsByClassName('essay-english')[0].scrollHeight - document.getElementsByClassName('essay-english')[0].scrollTop
	//   });
	// }


});