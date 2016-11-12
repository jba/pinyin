var nQuestions = 0

var bases = ["chi", "wo", "wei", "wai", "wu"];

var pinyins = [];

for (var i = 0; i < bases.length; i++) {
    for (var tone = 1; tone <= 4; tone++) {
	pinyins.push(bases[i] + tone);
    }
}

var pinyinSet = new Set(pinyins);
      
function addQuestion() {
    nQuestions++;
    var answer = pickPinyin();
    var result = document.createElement("span");
    var t = document.createElement("input");
    t.id = "t" + nQuestions;
    t.type = "text";
    t.size = 10;
    t.onkeydown = function() { 
	if (event.keyCode == 13) 
	    checkResponse(t.value, answer, result);
    }
    var children = [
		    spacer(),
		    document.createTextNode("#" + nQuestions + " "),
		    t, 
		    spacer(),
		    playButton("Play Again", answer),
		    spacer(),
		    result
		    ];
    var q = document.createElement("div");
    q.style="line-height: 30px";
    for (var i = 0; i < children.length; i++) {
	q.appendChild(children[i]);
    }
    document.getElementById("questions").appendChild(q);

    play3(audio(answer));
}

function checkResponse(response, answer, resultNode) {
    if (response == answer) { 
	resultNode.innerHTML = "yes";
    } else { 
	resultNode.innerHTML = "no, " + answer;
	// var a = audio(response);
	//	resultNode.parentNode.insertBefore(playButton(response, a), resultNode.nextSibling)
    }
}

var intervalMillis = 1800;

function play3(audio) {
    var f = function() { audio.play(); };
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

function playButton(text, pinyin) {
    return button(text, function() { audio(pinyin).play() });
}
    

function pickPinyin() {
    var i = Math.floor(Math.random() * pinyins.length);
    return pinyins[i];
}

var audios = new Map();

function audio(pinyin) {
    if (audios.has(pinyin)) {
	return audios.get(pinyin);
    }
    var a = document.createElement("audio");
    console.log("creating audio for " + pinyin);
    var as = document.createElement("source");
    as.src = "https://www.yoyochinese.com/files/" + pinyin + ".mp3";
    as.type = "audio/mpeg";
    a.appendChild(as);
    audios.set(pinyin, a);
    return a;
}

function spacer() { return document.createTextNode(" "); }
        
