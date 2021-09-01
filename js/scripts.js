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
		if(section === 0) {

			$(".scroll-container").empty()
			$(".scroll-container").html(introElements)

			numCells = 25
			numRows = 5
			numCols = 5
			cellArr = []
			titleArr = []
			sectionArr = []
			rowArr = []
			rows = $("<div>")

			// en and cn titles in an array titleArr (16)
			for (j=1; j < essayLength - 3; j++) {
				titleArr.push([essay[j].en.title.toUpperCase(), j], [essay[j].cn.title, j])				
				}

			// populate cellArr with numbered cells
			for (i=0; i<numCells; i++) {
				let cell = $("<span>").append("").addClass("landingCell").attr("cell-data", i)
				cellArr.push(cell)
			}

			// populate rowArr with numbered rows
			for (i=0; i<numRows; i++) {
				let row = $("<div>").append("").addClass("landingRow").attr("row-data", i)
				rowArr.push(row)
			}

			// populate each row with set number of cells in order
			for (i=0; i<numRows; i++) {
				for (k=0; k<numCols; k++) {
					rowArr[i].append(cellArr[(i * numCols) + k])
				}
				rows.append(rowArr[i])	
			}

			// place rows & cells
			$(".intro-grid").html(rows)

			// populate random cells with a chapter title each
			$.each(titleArr, function( key, item ) {
				randCell = Math.floor(Math.random() * (cellArr.length))
				cellArr[randCell].html(titleArr[key][0]).addClass("chapter-link").attr("data-attr", titleArr[key][1])
				cellArr.splice(randCell, 1)
			})
			
			// change cell width when hovered, return after Timeout
			$(".landingCell").hover( function() {
				$(this).css({ "border" : "none", 
								"width" : 20 + Math.floor(Math.random() * 30) + "%",
							})

				setTimeout(function() {
					$(".landingCell").css({ "width" : 20 + Math.floor(Math.random() * 10) + "%"
							})
				}, 5000)
			})
			
			// Mobile titles

			$(".mobile-title .nav-bar").html(essay[section].en.title.toUpperCase() + "<br>" + essay[section].cn.title.toUpperCase())

			let introTitlesEN = $("<div class='intro-text'>").append("<div class='colour-header'>EPISODES</div>")
			let introTitlesCN = $("<div class='intro-text'>").append("<div class='colour-header'>情節</div>")

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

			// $(".video-wrapper").css({ "display" : "block"})

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
			$(".essay-title").html("<span id='en'>" + essay[section].en.title.toUpperCase() + "</span>" + "<br><br>" + "<span id='cn'>" + essay[section].cn.title + "</span>")

			addImages().then( () =>  addFootnotes()).then( () => addImageListeners() )


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

	async function addImages() {

		// total number of obstruct-left and obstruct-right objects.
		const numObjects = 6;
		const obstruct = []
		const target = [$(".essay-english p"), $(".essay-chinese p")]

		// split text into words/fragments to randomly insert voids
		const objArrEN = target[0][0].outerHTML.split(" ")
		const objArrCN = target[1][0].outerHTML.split("•") // chinese text is split using "•" as text doesn't have spaces

		// insert left and right voids
		for (let i=1; i<numObjects + 1; i++) {
			obstruct.push("<span class='obstruct-left  tooltip' data-attr='" + i + "'></span>")
			obstruct.push("<span class='obstruct-right tooltip '  data-attr='" + i + "'></span>")
		}

		// get intervals between voids
		var intervalEN = Math.floor(objArrEN.length/(numObjects*2))
		var intervalCN = Math.floor(objArrCN.length/(numObjects*2))

		console.log(objArrEN.length, intervalEN, obstruct.length)

		// populate the voids in order with slightly random spacing
		for ( let j=0; j<obstruct.length; j++) {
			objArrEN.splice((intervalEN * (j)) + (Math.random() * intervalEN), 0, obstruct[j])
			objArrCN.splice((intervalCN * (j)) + (Math.random() * intervalCN), 0, obstruct[j])
		}


		newTextEN = objArrEN.join(" ")
		newTextCN = objArrCN.join("")

		target[0].html(newTextEN)
		target[1].html(newTextCN)

		$(".essay-english .obstruct-left[data-attr='1']").addClass("image").addClass("obstruct-small").append("<img src='" + essay[section].img[0] + "' alt='" + essay[section].img[0].split("/").pop() + "'/>")
		$(".essay-chinese .obstruct-left[data-attr='1']").addClass("image").addClass("obstruct-small").append("<img src='" + essay[section].img[1] + "' alt='" + essay[section].img[0].split("/").pop() + "'/>")
		
		let blanks = $(".obstruct-left[data-attr!='1'], .obstruct-right[data-attr!='1']")
		
		$.each( blanks, function(item, key) {
			$(this).css({ "width" : 10 + Math.floor(Math.random() * 80) + "%",
						"height" : 5 + Math.floor(Math.random() * 30) + "vh"
					})
		})
	}

	async function addFootnotes() {

		const target = [$(".essay-english p"), $(".essay-chinese p")]

		$.each(target, function(key, item) {
			text = item[0].outerHTML
			// console.log(text)
			const regex = /footnotehere(\d+)/gm;
			const subst = `<span class='footnote' data-footnote='$1'><\/span>`;

			// The substituted value will be contained in the result variable
			const result = text.replace(regex, subst);
			item.html(result)
		})

		footnotes = $(".footnote")

			$.each(footnotes, function(key, item) {
				num = $(this).data("footnote")
				sup = $("<sup>").append(num)
				fn = $("<span>").attr("id", "tooltip-span").html(essay[section].footnotes[num])
				fnInline = $("<span>").attr("id", "fn-span").html(" <em>" + essay[section].footnotes[num] + "</em>")
				
				item.append(sup[0])
				item.append(fn[0])
				item.append(fnInline[0])

			})

			if (section > 0 && viewportWidth < 800) {
				$(".footnote").click( function() {
					$(this).find("#fn-span").toggle()
				})
			}

			window.onmousemove = function (e) {
		    var x = e.clientX,
		        y = e.clientY;

	        if ( section > 0 && viewportWidth > 800 ) {

		        $(".footnote").find("#tooltip-span").css({
		        		"top" : (y + 10) + "px",
		        		"left" : (x + 10) + "px",
		        	})
		    }
			};

	}

	function addImageListeners() {

		$(".essay-english .obstruct-left[data-attr='1']").click( function() {
			lightboxListener( $(this).find("img").attr("src") )
		})

		$(".essay-chinese .obstruct-left[data-attr='1']").click( function() {
			lightboxListener( $(this).find("img").attr("src") )
		})

		$(".obstruct-small").hover( function() {
			$(this).removeClass("obstruct-small").addClass("obstruct-large")
		})	
	}

	// lightbox takes the clicked image and displays wide.
	function lightboxListener( path ) {
		const obj = $(this)
		$(".container").append("<div class='lightbox'><div class='lightbox-contents'><img src='" + path + "'><div class='lightbox-description'>" + path.split("/").pop() + "</div></div></div>" )
		$(this).unbind("click", lightboxListener)
		$(".lightbox").click( function() {
			$(this).remove()
		})
	}

    // chapter links to pages
    function buttons() {

   		$(".chapter-link, .button").click( function() {
	    	section = $(this).data("attr")
	    	$(this).unbind("click")
			sectionUpdate()
    	})

		$("#video-1, #video-2").click( function() {
			let videoNum = $(this).attr("video-attr")
			$(".video").html(essay.videos[videoNum].iframe)
		})

	}
});