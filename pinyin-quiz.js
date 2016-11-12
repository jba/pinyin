var nQuestions = 0

var bases = ["chi", "wo", "wei", "wai", "wu"];
var pinyins = [];

for (var i = 0; i < bases.length; i++) {
    for (var tone = 1; tone <= 4; tone++) {
	pinyins.push(bases[i] + tone);
    }
}
      
function play(id) {
    console.log("play", id);
    document.getElementById(id).play();
}

var intervalMillis = 1800

function play3(id) {
    var f = function() { play(id); };
    setTimeout(f, 10);
    setTimeout(f, 10+intervalMillis);
    setTimeout(f, 10+2*intervalMillis);
}

function button(text, func) {
    var b = document.createElement("button");
    b.innerHTML = text;
    b.onclick = func;
    return b;
}

function pick() {
    var i = Math.floor(Math.random() * pinyins.length);
    return pinyins[i];
}

function spacer() { return document.createTextNode(" "); }
        

function addQuestion() {
    nQuestions++;
    var answer = pick();
    var q = document.createElement("div");

    var a = document.createElement("audio");
    a.id = "a" + nQuestions;
    var as = document.createElement("source");
    as.src = "https://www.yoyochinese.com/files/" + answer + ".mp3";
    as.type = "audio/mpeg";
    a.appendChild(as);

    var t = document.createElement("input");
    t.id = "t" + nQuestions;
    t.type = "text";
    t.size = 10;				    

    var result = document.createElement("span");
      
    var children = [
		    document.createTextNode("#" + nQuestions + " "),
		    a, 
		    t, 
		    spacer(),
		    button("Play Again", function() { play(a.id) }),
		    spacer(),
		    button("Check", function() {  
			    if (t.value == answer) { 
				result.innerHTML = "yes";
			    } else { 
				result.innerHTML = "no, " + answer;
			    }
			}),
		    spacer(),
		    result
		    ];
    for (var i = 0; i < children.length; i++) {
	q.appendChild(children[i]);
    }
    document.body.appendChild(q);
    play3(a.id);				    
}
