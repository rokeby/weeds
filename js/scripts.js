$(document).ready(function(){

    const essay = essayObj
    const splash = $(".splash")
    const introElements = $(["<div class='intro-segment'>",
								"<div class='intro-title'>",
    								"<span class='intro-void-small'>",
    								"</span>",
									"<div>",
										"NO HUMANS IN THE CITY, BUT WEEDS",
    								"</div>",
								"</div>",
								"<div class='intro-chapter-english'>",
								"</div>",
								"<div class='intro-chapter-chinese'>",
								"</div>",
								"<div class='intro-title-sm'>",
								"<span class='intro-void-large'>",
    								"</span>",
									"當城市不再炊煙，只餘蔓草",
								"</div>",
								"<div class='intro-blurb'>",
								"</div>",
							"</div>"
								].join("\n")
					)

    const essayElements = $(["<div class='essay-container'>",
    						"<div class='essay-segment'>",
    							"<div class='essay-title'>",
    							"</div>",
    							"<div class='essay-english' lang='en'>",
								"</div>",
								"<div class='essay-chinese' lang='cn'>",
    							"</div>",
							"</div>",
    					"</div>"].join("\n")
					)

    const creditsElements = $(["<div class='credits-container'>",
	    							"<div class='about'>",
		    							"<div class='credits-heading colour-header'>",
		    							"About",
		    							"</div>",
		    							"<div id='about' class='credits-body'>",
		    							"</div>",
		    							"<div class='credits-heading colour-header'>",
		    							"Acknowledgements",
		    							"</div>",
		    							"<div id='acknowledgements' class='credits-body'>",
		    							"</div>",
		    							"<div class='credits-heading colour-header'>",
		    							"Bios",
		    							"</div>",
		    							"<div id='bios' class='credits-body'>",
		    							"</div>",
	    							"</div>",
	    							"<div class='bibliography'>",
		    							"<div  class='credits-heading colour-header'>",
		    							"Bibliography",
		    							"</div>",
		    							"<div id='bibliography' class='credits-body'>",
		    							"</div>",
	    							"</div>",
								"</div>"].join("\n")
								)

    let section = 0
    const essayLength = Object.keys(essay).length

    sectionUpdate()

	// Videos Panel

	$("#video-button").click( function() {
		$(".video-space").addClass("flex")
		$("#home").click(function() {
			$(".video-space").removeClass("flex")		
			})
	})



	$("#video-1, #video-2").click( function() {
		let videoNum = $(this).attr("video-attr")
		$(".video").html(essay.videos[videoNum].iframe)
	})


	// sectionUpdate() repopulates the view according to var section.
	function sectionUpdate () {

		// populate intro
		if(section == 0) {

			$(".scroll-container").html(introElements)

			let introTitlesEN = $("<div class='intro-text'>").append("<div class='colour-header'>EPISODES</div>")
			let introTitlesCN = $("<div class='intro-text'>").append("<div class='colour-header'>情节</div>")

			for(let i = 1; i < essayLength - 2; i++) {
				introTitlesEN.append("<span " + "class='chapter-link' data-attr='" + i + "'>" + "*" + essay[i].en.title + "</span><br><br>")
				introTitlesCN.append("<span " + "class='chapter-link' data-attr='" + i + "'>" + "*" + essay[i].cn.title + "</span><br><br>")
			}

			$(".intro-chapter-english").html(introTitlesEN)
			$(".intro-chapter-chinese").html(introTitlesCN)

			let introTitlesENArr = $(".intro-chapter-english > .intro-text").children().toArray()
			let introTitlesCNArr = $(".intro-chapter-chinese > .intro-text").children().toArray()
			let introVoidEN = $("<span class='intro-void-small'></span")
			let introVoidCN = $("<span class='intro-void-large'></span")

			introTitlesENArr.splice(introTitlesENArr.length/6 + (Math.floor(Math.random() * introTitlesENArr.length/1.5)), 0, introVoidEN[0])
			introTitlesCNArr.splice(introTitlesCNArr.length/6 + (Math.floor(Math.random() * introTitlesCNArr.length/1.5)), 0, introVoidCN[0])

			let insertIntroVoidEN = $("<div />");
			let insertIntroVoidCN = $("<div />");

			$.each(introTitlesENArr, function(key, item) { insertIntroVoidEN.append(item);});
			$.each(introTitlesCNArr, function(key, item) { insertIntroVoidCN.append(item);});

			insertIntroVoidEN = insertIntroVoidEN.html()
			insertIntroVoidCN = insertIntroVoidCN.html()

			$(".intro-chapter-english > .intro-text").html(insertIntroVoidEN)
			$(".intro-chapter-chinese > .intro-text").html(insertIntroVoidCN)

		    // chapter links to pages
		    $(".chapter-link, .button").click( function() {

		    	// $(this).css({ "color" : "#6F68F6" })
		    	// $(".button").not(this).css({ "color" : "black" })

		    	section = $(this).data("attr")
				sectionUpdate()
				// console.log(section)
		    })

		    // intro blurb bit

		    blurb = $("<div/>").append("<span class='intro-void-small'/>")
    				.append($("<span />").html(essay[0].en.text))
    				.append('<br>')
    				.append("<span class='intro-void-large'/>")
    				.append($("<span />").html(essay[0].cn.text))

		    $(".intro-blurb").html(blurb)

		    // change intro void sizes
		    $(".intro-title").hover(function() {
		    	$(this).find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    }, function() {
		    	$(this).find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large")
		    })

		    $(".intro-segment > *").hover(function() {
		    	$(this).next().find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large")
		    	.next().find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large")
		    }, function() {
		    	$(this).next().find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    	.next().find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    })

		// populate essay pages
    	} else if (section > 0) {
    		console.log(section)

    		let sectionEN = $("<p>")
			let sectionCN = $("<p>")

			$(".scroll-container").html(essayElements)

			for(let i = 0; i < essay[section].en.text.length; i++) {
				sectionEN.append(essay[section].en.text[i] + "<br><br>")
				sectionCN.append(essay[section].cn.text[i] + "<br><br>")		
			}

			$(".essay-english").html(sectionEN)
			$(".essay-chinese").html(sectionCN)
			$(".essay-title").html("<span class='intro-void-large'/></span>" + essay[section].en.title.toUpperCase() + "<br><br>" + essay[section].cn.title)
			addImages()

		} else if (section == "credits") {
			$(".scroll-container").html(creditsElements)

			for ( let i=0; i<Object.keys(essay.bib).length; i++) {

				bibObj = Object.keys(essay.bib)[i]
				bibText = $("<p>")
				$.each(essay.bib[bibObj], function(key, item) {
					bibText.append("<p>" + item + "</p>");
				});

				$("#" + bibObj).html(bibText)
			}
		}
	}

	function addImages() {

		// total number of obstruct-left and obstruct-right objects.
		const numObjects = 8;

		const obstruct = ["<span class='obstruct-left tooltip'></span>", "<span class='obstruct-right tooltip'></span>"]
		const target = [$(".essay-english p"), $(".essay-chinese p")]
		// console.log(target[0])
		// console.log(target[1])


		const objArrEN = target[0][0].outerHTML.split(" ")
		const objArrCN = target[1][0].outerHTML.split("•")
		// console.log(objArrCN)

		for (let j=0; j<numObjects; j++) {
			objArrEN.splice((Math.floor(Math.random() * objArrEN.length/1.5)), 0, obstruct[1])
			objArrEN.splice((Math.floor(Math.random() * objArrEN.length/1.5)), 0, obstruct[0])
			objArrCN.splice((Math.floor(Math.random() * objArrCN.length/1.5)), 0, obstruct[1])
			objArrCN.splice((Math.floor(Math.random() * objArrCN.length/1.5)), 0, obstruct[0])
		}
		newTextEN = objArrEN.join(" ")
		newTextCN = objArrCN.join("")

		target[0].html(newTextEN)
		target[1].html(newTextCN)

		addImageListeners()
	}

	function addImageListeners() {

		$(".obstruct-left, .obstruct-right").append("<span id='tooltip-span'>hello</span>")

		window.onmousemove = function (e) {
		    var x = e.clientX,
		        y = e.clientY;

	        // console.log(x, y)

	        // let re = essay[section].img[0]
	        // re.lastIndexOf("/")
	        // console.log(re.lastIndexOf("/"))

	        $(".obstruct-left").find("#tooltip-span").css({
	        		"top" : (y + 10) + "px",
	        		"left" : (x + 10) + "px",
	        	}).html(essay[section].img[0].split("/").pop())

	        $(".obstruct-right").find("#tooltip-span").css({
	        		"top" : (y + 10) + "px",
	        		"left" : (x + 10) + "px",
	        	}).html(essay[section].img[1].split("/").pop())
		};


		$(".obstruct-left").click( function() {
			$(".obstruct-left.image").empty().removeClass("obstruct-large").removeClass("image")
			$(this).addClass("obstruct-large").addClass("image").append("<img src='" + essay[section].img[0] + "'/>")
			$(".obstruct-right").removeClass("obstruct-large")
			var object = $(this)
			var src = $(this).children("img").attr("src")
			lightboxListener(object, src)
		})
		// .hover( function() {
		// 	// $(this).css({"border" : "1px red solid"})
		// 	$(".tooltip").css({"display" : "block", 
		// 						"position" : "absolute",
		// 						"left" : xPos,
		// 						"top" : yPos,
		// 						"width" : "40px",
		// 						"height" : "20px",
		// 						"border" : "1px black solid",
		// 					})
		// 	console.log('hovering!')
		// })

		$(".obstruct-right").click( function() {
			$(".obstruct-right.image").empty().removeClass("obstruct-large").removeClass("image")
			$(this).addClass("obstruct-large").addClass("image").append("<img src='" + essay[section].img[1] + "'/>")
			$(".obstruct-left").removeClass("obstruct-large")
			var object = $(this)
			var src = $(this).children("img").attr("src")
			lightboxListener(object, src)
		})
	}

	// lightbox takes the clicked image and displays wide.
	function lightboxListener( element, path ) {

		// console.log(path, element)
		var clicks = element.data('clicks')

		if (clicks) {
			$(".container").append("<div class='lightbox'><img src='" + path + "'></div>" )
		} else if (clicks == false) {
			$(".container").append("<div class='lightbox'><img src='" + path + "'></div>" )
		} else {
		}

		element.data("clicks", !clicks)

		$(".lightbox").click( function() {
			$(this).remove()
		})
	}
});