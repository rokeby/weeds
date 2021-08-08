$(document).ready(function(){
        // $.getJSON("/js/essay-en.json", function(data){
        //     console.log(data.en);
        // }).fail(function(e){
        // 	console.log(e);
        //     console.log("An error has occurred.");
        // });
        var text = essayObj.en

        // console.log(text)

        for(let i = 0; i < Object.keys(text).length; i++) {
			$(".intro-text").prepend("<p>" + text[i] + "<p>")
        }

    });

