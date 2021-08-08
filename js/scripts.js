$(document).ready(function(){

    var textEN = essayObjEN.en
    var textCN = essayObjCN.cn
    var essayMod = "<div class='essay-container'><div class='essay-segment'><div class='essay-english' lang='en'></div><div class='essay-chinese' lang='cn'></div></div></div>"


    for(let i = 0; i < Object.keys(textEN).length; i++) {

    	$( essayMod ).clone().appendTo(".scroll-container").attr("id", i+1)

    	for (let j = 0; j < $(".essay-english").length; j++) {

	    	for (let k = 0; k < textEN[i+1].length; k++) { 

	    		var essayPara = textEN[i+1][k]
				$("#" + (i+1) + " .essay-english" ).append("<p>" + essayPara + "</p>")
			}
    	}
    }


    for(let i = 0; i < Object.keys(textCN).length; i++) {

    	// $( essayMod ).clone().appendTo(".scroll-container")

    	for (let j = 0; j < $(".essay-chinese").length; j++) {

	    	for (let k = 0; k < textCN[i+1].length; k++) { 

	    		var essayPara = textCN[i+1][k]
				$("#" + (i+1) + " .essay-chinese" ).append("<p>" + essayPara + "</p>")
			}
    	}
    }

});

