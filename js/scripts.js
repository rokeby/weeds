$(document).ready(function(){

    const essay = essayObj
    const splash = $(".splash")
    const introElements = $(["<div class='intro-container'>",
    							"<div class='intro-chapter-english'>",
    							"</div>",
    							"<div class='intro-chapter-chinese'>",
    							"</div>",
    							"<div class='intro-grid'>",
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
    								"<div class='credits-english'>",
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
	    							"<div class='credits-chinese'>",
		    							"<div class='credits-heading colour-header'>",
		    							"項目簡介",
		    							"</div>",
		    							"<div id='項目簡介' class='credits-body'>",
		    							"</div>",
		    							"<div class='credits-heading colour-header'>",
		    							"鳴謝",
		    							"</div>",
		    							"<div id='鳴謝' class='credits-body'>",
		    							"</div>",
		    							"<div class='credits-heading colour-header'>",
		    							"簡歷",
		    							"</div>",
		    							"<div id='簡歷' class='credits-body'>",
		    							"</div>",
	    							"</div>",
								"</div>"].join("\n")
								)

    const bibliographyElements = $(["<div class='bibliography-container'>",
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
    let viewportHeight = $(window).height();
	let viewportWidth = $(window).width();

    sectionUpdate()

// sectionUpdate() repopulates the view according to current section.
	function sectionUpdate () {

		console.log("section = " + section)

		// populate intro
		if(section == 0) {

			$(".scroll-container").empty()
			$(".scroll-container").html(introElements)

			numCells = 25
			numRows = 5
			numCols = 5
			cellArr = []
			titleArr = []
			sectionArr = []
			rowArr = []

			// en and cn titles in an array titleArr (16)
			for (j=1; j < essayLength - 3; j++) {
				titleArr.push([essay[j].en.title.toUpperCase(), j], [essay[j].cn.title, j])				
				}

			for (i=0; i<numCells; i++) {

				let cell = $("<span>").append("").addClass("landingCell").attr("cell-data", i)
				cellArr.push(cell)
			}

			for (i=0; i<numRows; i++) {
				let row = $("<div>").append("").addClass("landingRow").attr("row-data", i)
				rowArr.push(row)
			}

			let rows = $("<div>")

			for (i=0; i<numRows; i++) {
				for (k=0; k<numCols; k++) {
					rowArr[i].append(cellArr[(i * numCols) + k])
				}
				rows.append(rowArr[i])	
			}

			$(".intro-grid").html(rows)

			$.each(titleArr, function( key, item ) {
				randCell = Math.floor(Math.random() * (cellArr.length))
				cellArr[randCell].html(titleArr[key][0]).addClass("chapter-link").attr("data-attr", titleArr[key][1])
				cellArr.splice(randCell, 1)
			})
			
			$(".landingCell").hover( function() {
				$(this).css({ "border" : "none", 
								"width" : 20 + Math.floor(Math.random() * 10) + "%",
							})

				setTimeout(function() {
					$(".landingCell").css({ "width" : 20 + Math.floor(Math.random() * 10) + "%"
							})
				}, 5000)
			})
			
			$(".mobile-title .nav-bar").html(essay[section].en.title.toUpperCase() + "<br>" + essay[section].cn.title.toUpperCase())

			let introTitlesEN = $("<div class='intro-text'>").append("<div class='colour-header'>EPISODES</div>")
			let introTitlesCN = $("<div class='intro-text'>").append("<div class='colour-header'>情节</div>")

			for(let i = 1; i < essayLength - 3; i++) {
				introTitlesEN.append("<span " + "class='chapter-link' data-attr='" + i + "'>" + "*" + essay[i].en.title + "</span><br><br>")
				introTitlesCN.append("<span " + "class='chapter-link' data-attr='" + i + "'>" + "*" + essay[i].cn.title + "</span><br><br>")
			}

			$(".intro-chapter-english").html(introTitlesEN)
			$(".intro-chapter-chinese").html(introTitlesCN)

			let introTitlesENArr = $(".intro-chapter-english > .intro-text").children()
			let introTitlesCNArr = $(".intro-chapter-chinese > .intro-text").children()

			$(".intro-chapter-english > .intro-text").html(introTitlesENArr)
			$(".intro-chapter-chinese > .intro-text").html(introTitlesCNArr)


			buttons()

		// populate essay pages
    	} else if (section > 0) {

			$(".mobile-title .nav-bar").html(essay[section].en.title.toUpperCase() + "<br>" + essay[section].cn.title.toUpperCase())

    		let sectionEN = $("<p>")
			let sectionCN = $("<p>")

			$(".scroll-container").html(essayElements)

			// Mobile settings

			for(let i = 0; i < essay[section].en.text.length; i++) {
				sectionEN.append(essay[section].en.text[i] + "<br><br>")
				sectionCN.append(essay[section].cn.text[i] + "<br><br>")		
			}

			$(".essay-english").html(sectionEN)
			$(".essay-chinese").html(sectionCN)
			$(".essay-title").html("<span class='intro-void-large'/></span>" + "<span id='en'>" + essay[section].en.title.toUpperCase() + "</span>" + "<br><br>" + "<span id='cn'>" + essay[section].cn.title + "</span>")

			addImages()
			addFootnotes()

		} else if (section == "credits") {
			$(".scroll-container").html(creditsElements)
			$(".mobile-title .nav-bar").html("CREDITS")

			for (let i=0; i<Object.keys(essay.credits).length; i++) {

				lang = Object.keys(essay.credits)[i]
				headings = essay.credits[lang]

				for ( let i=0; i<Object.keys(headings).length; i++) {

					creditsObj = Object.keys(headings)[i]
					creditsText = $("<p>")
					
					$.each(headings[creditsObj], function(key, item) {
						creditsText.append("<p>" + item + "</p>");
					});

					$(".credits-" + lang + " > #" + creditsObj).html(creditsText)
				}
			}

		} else if (section == "bib") {
			$(".scroll-container").html(bibliographyElements)
			$(".mobile-title .nav-bar").html("BIBLIOGRAPHY")

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
		const obstruct = []
		const target = [$(".essay-english p"), $(".essay-chinese p")]

		const objArrEN = target[0][0].outerHTML.split(" ")
		const objArrCN = target[1][0].outerHTML.split("•")

		for (let i=1; i<numObjects + 1; i++) {
			obstruct.push("<span class='obstruct-left tooltip' data-attr='" + i + "'></span>")
			obstruct.push("<span class='obstruct-right tooltip' data-attr='" + i + "'></span>")
		}

		var intervalEN = objArrEN.length/numObjects
		var intervalCN = objArrCN.length/numObjects

		for ( let j=0; j<obstruct.length; j++) {
			objArrEN.splice((Math.floor(Math.random() * (intervalEN * (j)) + (Math.random() * intervalEN))), 0, obstruct[j])
			objArrCN.splice((Math.floor(Math.random() * (intervalCN * (j)) + (Math.random() * intervalCN))), 0, obstruct[j])
		}

		newTextEN = objArrEN.join(" ")
		newTextCN = objArrCN.join("")

		target[0].html(newTextEN)
		target[1].html(newTextCN)

		$(".essay-english .obstruct-left[data-attr='1']").addClass("image").addClass("obstruct-large").append("<img src='" + essay[section].img[0] + "'/>")
		$(".essay-chinese .obstruct-left[data-attr='1']").addClass("image").addClass("obstruct-large").append("<img src='" + essay[section].img[1] + "'/>")

		addImageListeners()
	}

	function addFootnotes() {

		footnotes = $(".footnote")

			$.each(footnotes, function(key, item) {
				num = $(this).data("footnote")
				sup = $("<sup>").append(num)
				item.append(sup[0])
			})
	}

	function addImageListeners() {

		// $(".obstruct-left, .obstruct-right").append("<span id='tooltip-span'></span>")

		// window.onmousemove = function (e) {
		//     var x = e.clientX,
		//         y = e.clientY;

		//         // console.log( section, x, y)

	 //        if ( section > 0 ) { 

	 //        $(".obstruct-left").find("#tooltip-span").css({
	 //        		"top" : (y + 10) + "px",
	 //        		"left" : (x + 10) + "px",
	 //        	}).html(essay[section].img[0].split("/").pop())

	 //        $(".obstruct-right").find("#tooltip-span").css({
	 //        		"top" : (y + 10) + "px",
	 //        		"left" : (x + 10) + "px",
	 //        	}).html(essay[section].img[1].split("/").pop())
	 //    }
		// };

		// imageObstructs = [$(".obstruct-left")[0], $(".obstruct-right")[0]]

		// $.each(imageObstructs, function(key, item) {
		// 	console.log(item)
		// 	item.html("<img src='" + essay[section].img[0] + "'/>")
		// })


		$(".essay-english .obstruct-left[data-attr='1']").click( function() {
			lightboxListener( $(this).find("img").attr("src") )
		})

		$(".essay-chinese .obstruct-left[data-attr='1']").click( function() {
			lightboxListener( $(this).find("img").attr("src") )
		})
	}

	// lightbox takes the clicked image and displays wide.
	function lightboxListener( path ) {
		const obj = $(this)
		$(".container").append("<div class='lightbox'><img src='" + path + "'></div>" )
		$(this).unbind("click", lightboxListener)
		$(".lightbox").click( function() {
			$(this).remove()
		})
	}

    // chapter links to pages
    function buttons() {
   		$(".chapter-link, .button").click( function() {
    	section = $(this).data("attr")
		sectionUpdate()
    	})

		$("#video-1, #video-2").click( function() {
		let videoNum = $(this).attr("video-attr")
		$(".video").html(essay.videos[videoNum].iframe)
	})

		$("#video-button").click( function() {
		$(".video-space").addClass("flex")
		$("#close-video").css({"display" : "block"})
		$("#home, #close-video, .main").click(function() {
			$(".video-space").removeClass("flex")
			$("#close-video").css({"display" : "none"})
			})
	})

    }

});