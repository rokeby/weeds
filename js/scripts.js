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

	$(".right-arrow").click( function() {

		$(".scroll-container").html($essayModule)
		section += 1
		if(section >= (Object.keys(essay).length - 1)) {
			section = 0
		}
		sectionUpdate()
		console.log(section)
	})

	$(".left-arrow").click( function() {

		$(".scroll-container").html($essayModule)
		section -= 1
		if (section < 0) {
			section = 8
		}
		sectionUpdate()
		console.log(section)
	})

	function sectionUpdate () {

		var $sectionEN = $("<p>").append("<p>" + essay[section].en.title + "</p>") 
		var $sectionCN = $("<p>").append("<p>" + essay[section].cn.title + "</p>")

		for(let i = 0; i < essay[section].en.text.length; i++) {

			$sectionEN.append("<p>" + essay[section].en.text[i] + "</p>")
			$sectionCN.append("<p>" + essay[section].cn.text[i] + "</p>")
		
		}

		$(".essay-english").html($sectionEN)
		$(".essay-chinese").html($sectionCN)

	}

});



