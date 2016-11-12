var nQuestions = 0

var bases = [
     "zi", "ci", "si", "zhi", "chi", "shi", "ri",
     "a", "ba", "pa", "ma", "fa", "da", "ta", "na", "la", "ga", "ka", "ha", "za", "ca", "sa", "zha", "cha", "sha", 
     "ai", "bai", "pai", "mai", "dai", "tai", "nai", "lai", "gai", "kai", "hai", "zai", "cai", "sai", "zhai", "chai", "shai", 
     "an", "ban", "pan", "man", "fan", "dan", "tan", "nan", "lan", "gan", "kan", "han", "zan", "can", "san", "zhan", "chan", "shan", "ran", 
     "ang", "bang", "pang", "mang", "fang", "dang", "tang", "nang", "lang", "gang", "kang", "hang", "zang", "cang", "sang", "zhang", "chang", "shang", "rang", 
     "ao", "bao", "pao", "mao", "dao", "tao", "nao", "lao", "gao", "kao", "hao", "zao", "cao", "sao", "zhao", "chao", "shao", "rao", 
     "e", "me", "de", "te", "ne", "le", "ge", "ke", "he", "ze", "ce", "se", "zhe", "che", "she", "re",
     "ei", "bei", "pei", "mei", "fei", "dei", "nei", "lei", "gei", "hei", "zei", "zhei", "shei", 
     "en", "ben", "pen", "men", "fen", "nen", "gen", "ken", "hen", "zen", "cen", "sen", "zhen", "chen", "shen", "ren",
     "eng", "beng", "peng", "meng", "feng", "deng", "teng", "neng", "leng", "geng", "keng", "heng", "zeng", "ceng", "seng", "zheng", "cheng", "sheng", "reng", 
     "er", 
     "yi", "bi", "pi", "mi", "di", "ti", "ni", "li", "ji", "qi", "xi", 
     "ya", "dia", "lia", "jia", "qia", "xia", 
     "yan", "bian", "pian", "mian", "dian", "tian", "nian", "lian", "jian", "qian", "xian", 
     "yang", "niang", "liang", "jiang", "qiang", "xiang", 
     "yao", "biao", "piao", "miao", "diao", "tiao", "niao", "liao", "jiao", "qiao", "xiao", 
     "ye", "bie", "pie", "mie", "die", "tie", "nie", "lie", "jie", "qie", "xie", 
     "yin", "bin", "pin", "min", "nin", "lin", "jin", "qin", "xin", 
     "ying", "bing", "ping", "ming", "ding", "ting", "ning", "ling", "jing", "qing", "xing", 
     "yong", "jiong", "qiong", "xiong", 
     "you", "miu", "diu", "niu", "liu", "jiu", "qiu", "xiu", 
     "o", "bo", "po", "mo", "fo", 
     "dong", "tong", "nong", "long", "gong", "kong", "hong", "zong", "cong", "song", "zhong", "chong", "rong", 
     "ou", "pou", "mou", "fou", "dou", "tou", "lou", "gou", "kou", "hou", "zou", "cou", "sou", "zhou", "chou", "shou", "rou", 
     "wu", "bu", "pu", "mu", "fu", "du", "tu", "nu", "lu", "gu", "ku", "hu", "zu", "cu", "su", "zhu", "chu", "shu", "ru", 
     "wa", "gua", "kua", "hua", "zhua", "shua", 
     "wai", "guai", "kuai", "huai", "zhuai", "chuai", "shuai", 
     "wan", "duan", "tuan", "nuan", "luan", "guan", "kuan", "huan", "zuan", "cuan", "suan", "zhuan", "chuan", "shuan", "ruan", 
     "wang", "guang", "kuang", "huang", "zhuang", "chuang", "shuang", 
     "wei", "dui", "tui", "gui", "kui", "hui", "zui", "cui", "sui", "zhui", "chui", "shui", "rui", 
     "wen", "dun", "tun", "lun", "gun", "kun", "hun", "zun", "cun", "sun", "zhun", "chun", "shun", "run", 
     "weng", 
     "wo", "duo", "tuo", "nuo", "luo", "guo", "kuo", "huo", "zuo", "cuo", "suo", "zhuo", "chuo", "shuo", "ruo", 
     "yu", "n\u00FC", "l\u00FC", "ju", "qu", "xu", 
     "yuan", "juan", "quan", "xuan", 
     "yue", "n\u00FCe", "l\u00FCe", "jue", "que", "xue", 
     "yun", "jun", "qun", "xun"
];

var pinyins = [];

for (var i = 0; i < bases.length; i++) {
    for (var tone = 1; tone <= 4; tone++) {
	pinyins.push(bases[i] + tone);
    }
}

var pinyinSet = new Set(pinyins);

var correctResponses = new Set();
      
function addQuestion() {
    var sp = selectPinyins(document.getElementById("pattern").value);
    console.log("choosing from " + sp.length + " pinyins");
    if (sp.length == 0) {
	alert("no pinyins to choose from");
	return;
    }
    nQuestions++;
    var answer = pickFromList(sp);
    var result = document.createElement("span");
    var t = document.createElement("input");
    t.id = "t" + nQuestions;
    t.type = "text";
    t.size = 10;
    t.onkeydown = function() { 
	if (event.keyCode == 9 || event.keyCode == 13) 
	    checkResponse(t.value, answer, result);
    }
    var children = [
		    spacer(),
		    document.createTextNode("#" + nQuestions + " "),
		    spacer(),
		    playButton("Play Again", answer),
		    spacer(),
		    t, 
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
    if (response == "") 
	return;
    if (resultNode.nextSibling != null)
	resultNode.parentNode.removeChild(resultNode.nextSibling);
    resultNode.innerHTML = "&nbsp;&nbsp;"
    if (response == answer) { 
	resultNode.innerHTML += "Yes!";
	correctResponses.add(response);
    } else { 
	var last =response[response.length-1];
	if (!(last=="1" || last=="2" || last=="3" || last=="4")) {
	    resultNode.innerHTML += "You forgot the tone.";
	} else {
	    resultNode.innerHTML += "<b>" + answer + "</b>. ";
	    if (!pinyinSet.has(response)) {
		resultNode.innerHTML += "&nbsp;&nbsp;\"" + response + "\" is not a valid pinyin.";
	    } else {
		insertAfter(resultNode, button("Compare " + response + " to " + answer, function() {
			    playThen(audio(response), 100, function() { play(audio(answer)); });
			}));
	    }
	}
    }
}

function play(audio) {
    audio.onended = null;
    audio.play();
}

function playThen(audio, interval, endFunc) {
    audio.onended = function() { setTimeout(endFunc, interval) };
    audio.play();
}

var intervalMillis = 900;

function play3(audio) {
    playThen(audio, intervalMillis, function() { 
	    playThen(audio, intervalMillis, function() {
		    play(audio);
		});
	});
}

function button(text, func) {
    var b = document.createElement("button");
    b.innerHTML = text;
    b.onclick = func;
    return b;
}

function playButton(text, pinyin) {
    return button(text, function() { play(audio(pinyin)); });
}
    
function insertAfter(aNode, newNode) {
    aNode.parentNode.insertBefore(newNode, aNode.nextSibling);
}


function pickFromList(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}

var audios = new Map();

// Some filenames are of the form xxx_0.mp3.
var fileReplacements = {
    "zhi1": "zhi1_0",
    "zhi2": "zhi2_0",
    "a3": "a3_0",
    "sai1": "sai1_0",
    "sai2": "sai2_0",
    "sai3": "sai3_0",
    "sai4": "sai4_0",
    "tu1": "tu1_0",
    "xue1": "xue1_0",
    "xue2": "xue2_0",
    "xue3": "xue3_0",
    "xue4": "xue4_0",
    "n\u00FC1": "nv1",
    "n\u00FC2": "nv2",
    "n\u00FC3": "nv3",
    "n\u00FC4": "nv4",
    "l\u00FC1": "lv1",
    "l\u00FC2": "lv2",
    "l\u00FC3": "lv3",
    "l\u00FC4": "lv4",
    "n\u00FCe1": "nue1",
    "n\u00FCe2": "nue2",
    "n\u00FCe3": "nue3",
    "n\u00FCe4": "nue4",
    "l\u00FCe1": "lue1",
    "l\u00FCe2": "lue2",
    "l\u00FCe3": "lue3",
    "l\u00FCe4": "lue4",
};

function audio(pinyin) {
    if (audios.has(pinyin)) {
	return audios.get(pinyin);
    }
    var fname = pinyin;
    if (pinyin in fileReplacements)
	fname = fileReplacements[pinyin];
    var a = new Audio("https://www.yoyochinese.com/files/" + fname + ".mp3");
    audios.set(pinyin, a);
    return a;
}

function spacer() { return document.createTextNode(" "); }
        
function selectPinyins(pattern) {
    var repeat = !document.getElementById("norepeat").checked;
    var re = pattern.replace(/\*/g, ".*");
    var result = [];
    for (var i = 0; i < pinyins.length; i++) {
	var p = pinyins[i];
	if (p.match(re) && (repeat || !correctResponses.has(p)))
	    result.push(p);
    }
    return result;
}


