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
    								"<span class='intro-void-large'>",
    								"</span>",
    								"<div>",
										"當城市不再炊煙，只餘蔓草",
									"</div>",
								"</div>",
								"<div class='intro-chapter-english'>",
								"</div>",
								"<div class='intro-chapter-chinese'>",
								"</div>",
								"<div class='intro-title-sm'>",
									"當城市不再炊煙，只餘蔓草",
								"</div>",
								"<div class='intro-blurb'>",
								"</div>",
							"</div>"
								].join("\n")
					)

    const essayElements = $(["<div class='essay-container'>",
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

    // right and left arrows move between sections.
	$(".right-arrow").click( function() {
		section += 1
		if(section >= (essayLength - 1)) { section = 0 }
	})

	$(".left-arrow").click( function() {
		section -= 1
		if (section < 0) { section = essayLength - 2}
	})

	$(".arrow").click( function() {
		sectionUpdate()
    	console.log(section)
	})

	// sectionUpdate() repopulates the view according to var section.
	function sectionUpdate () {

		// populate intro
		if(section == 0) {

			$(".scroll-container").html(introElements)

			let introTitlesEN = $("<div class='intro-text'>").append("<div class='colour-header'>EPISODES</div>")
			let introTitlesCN = $("<div class='intro-text'>").append("<div class='colour-header'>情节</div>")

			for(let i = 1; i < essayLength - 1; i++) {

				// introTitlesEN.append($("span").attr("data-attr", i).attr("class", "chapter-link").append(essay[i].en.title))
				introTitlesEN.append("<span " + "class='chapter-link' data-attr='" + i + "'>" + "*" + essay[i].en.title + "</span><br><br>")
				introTitlesCN.append("<span " + "class='chapter-link' data-attr='" + i + "'>" + "*" + essay[i].cn.title + "</span><br><br>")
			}

			$(".intro-chapter-english").html(introTitlesEN)
			$(".intro-chapter-chinese").html(introTitlesCN)

			let introTitlesENArr = $(".intro-chapter-english > .intro-text").children().toArray()
			let introTitlesCNArr = $(".intro-chapter-chinese > .intro-text").children().toArray()
			let introVoid = $("<span class='intro-void-small'></span")

			introTitlesENArr.splice(introTitlesENArr.length/6 + (Math.floor(Math.random() * introTitlesENArr.length/1.5)), 0, introVoid[0])
			introTitlesCNArr.splice(introTitlesCNArr.length/6 + (Math.floor(Math.random() * introTitlesCNArr.length/1.5)), 0, introVoid[0])

			// console.log(introTitlesENArr)
			// console.log(introTitlesCNArr)

			let insertIntroVoidEN = $("<div />");
			let insertIntroVoidCN = $("<div />");

			$.each(introTitlesENArr, function(key, item) { insertIntroVoidEN.append(item); console.log(item)});
			$.each(introTitlesCNArr, function(key, item) { insertIntroVoidCN.append(item); });

			console.log(insertIntroVoidEN)
			// console.log(insertIntroVoidCN)

			insertIntroVoidEN = insertIntroVoidEN.html()
			insertIntroVoidCN = insertIntroVoidCN.html()

			$(".intro-chapter-english > .intro-text").html(insertIntroVoidEN)
			$(".intro-chapter-chinese > .intro-text").html(insertIntroVoidCN)

		    // chapter links to pages
		    $(".chapter-link").click( function() {
		    	console.log("hello!!")
		    	section = $(this).data("attr")
		    	console.log(section)
				sectionUpdate()
				addImages()
		    })

		    // intro blurb bit

		    blurb = $("<div/>").append("<span class='intro-void-small'/>")
    				.append($("<span />").html(essay[0].en.text))
    				.append('<br>')
    				.append("<span class='intro-void-large'/>")
    				.append($("<span />").html(essay[0].cn.text))

		    $(".intro-blurb").html(blurb)
		    console.log(blurb)

		    // change intro void sizes
		    $(".intro-segment > *").hover(function() {
		    	$(this).find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small");
		    	$(this).next().find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large")
		    	// $(this).removeClass("intro-void-small").addClass("intro-void-large")
		    }, function() {
		    	// $(this).find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    	$(this).find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large")
		    	$(this).next().find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    })

		    // $(".intro-segment > *").hover(function() {
		    // 	// $(this).find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small");
		    // 	// $(this).next().find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large")
		    // 	$(this).find( ".intro-void-small" ).removeClass("intro-void-small").addClass("intro-void-large");
		    // }, function() {
		    // 	$(this).find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    // 	// $(this).next().find( ".intro-void-large" ).removeClass("intro-void-large").addClass("intro-void-small")
		    // })



		// populate essay pages
    	} else if (section > 0) {

    		let sectionEN = $("<p>").append(essay[section].en.title + "<br>")
			let sectionCN = $("<p>").append(essay[section].cn.title + "<br>")

			$(".scroll-container").html(essayElements)


			for(let i = 0; i < essay[section].en.text.length; i++) {
				sectionEN.append("<br>" + essay[section].en.text[i] + "<br>")
				sectionCN.append("<br>" + essay[section].cn.text[i] + "<br>")		
			}

			$(".essay-english").html(sectionEN)
			$(".essay-chinese").html(sectionCN)

			addImages()

		}
	}

	function addImages() {

		// total number of obstruct-left and obstruct-right objects.
		const numObjects = 3;

		const obstruct = ["<span class='obstruct-left'></span>", "<span class='obstruct-right'></span>"]
		const target = [$(".essay-english p"), $(".essay-chinese p")]

		for (let i = 0; i < target.length; i++) {

			const objArr = target[i][0].outerHTML.split(" ")
			for (let j=0; j<numObjects; j++) {
				objArr.splice(objArr.length/6 + (Math.floor(Math.random() * objArr.length/2)), 0, obstruct[1])
				objArr.splice(objArr.length/6 + (Math.floor(Math.random() * objArr.length/2)), 0, obstruct[0])
			}

			newText = objArr.join(" ")
			target[i].html(newText)

		}

		addImageListeners()
	}

	// When obstructs are clicked they resize the image
	// when clicked again the lightbox shows 
	function addImageListeners() {

		$(".obstruct-left").click( function() {
			$(".obstruct-left.image").empty().removeClass("obstruct-large").removeClass("image")
			$(this).addClass("obstruct-large").addClass("image").append("<img src='" + essay[section].img[0] + "'/>")
			$(".obstruct-right").removeClass("obstruct-large")
			var object = $(this)
			var src = $(this).children("img").attr("src")
			lightboxListener(object, src)

		})

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