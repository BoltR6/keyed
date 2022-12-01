/** Current Page 
     - "menu"
     - "taiko"
     - "run"
	   - "learn"     **/
let page = "menu";

/** Global Curtain Transition **/
let lockinput = false;
let curtainmode = "raise";
let curtain = 0;
let after = () => {};
function lowerCurtain(f){
	lockinput = true;
	curtainmode = "lower";
	after = f;
}

/** Button Function **/
function Button(x, y, t, f) {
	textSize(20);
	textFont(coloring.primaryFont);
	
	if (mouseX > x - (textWidth(t) / 2) - 10 && mouseX < x - (textWidth(t) / 2) - 10 + textWidth(t) + 20 && mouseY > y && mouseY < y + 65) {
		fill(coloring.secondary);
		stroke(0, 0, 0, 75);
		if(mouseIsPressed && !lockinput){
			f();
		}
	} else {
		fill(coloring.secondary);
		stroke(lerpColor(coloring.secondary, color(0), 0.10));
	}

	strokeWeight(4);
	rect(x - (textWidth(t) / 2) - 10, y, textWidth(t) + 20, 65, 5);

	fill(0);
	stroke(0);
	strokeWeight(0);
	textAlign(CENTER);
	text(t, x, y + 38);
	
	return textWidth(t) + 20;
}

/** Update Keys **/
function keyPressed() {
	if(!lockinput){
		run.keys[key] = true;
		menu.keys[key] = true;
		taiko.keys[key] = true;
		learn.keys[learn] = true;
	}
}
function keyReleased() {
	if(!lockinput){
		run.keys[key] = false;
		menu.keys[key] = false;
		taiko.keys[key] = false;
		learn.keys[learn] = false;
	}
}

/** Graphics **/
const coloring = {
	primaryFont: null,
	secondaryFont: null,
	
	primary: null,
	secondary: null,
	tertiary: null,
	quaternary: null,
}

/** Variables **/
const user = {
	
};
const menu = {
	keys: [],
	section: "Vowels 1",
	inSection: false,

	sections: {
		"Vowels 1": [
			{type: "learn", name: "Learn A", x:150, y:165, chars: ['a']},
			{type: "learn", name: "Learn E", x:270, y:165, chars: ['e']},
			{type: "learn", name: "Learn I", x:385, y:165, chars: ['i']},
			
			{type: "run", name: "Practice 1", x:280, y:265, notice:"Beginner", chars: ['a','e','i']},
			{type: "taiko", name: "Practice 2", x:420, y:265, chars: ['a','e','i'],bpm:30},

			{type: "run", name: "Practice 3", x:280, y:365, notice:"Proficient", chars: ['a','e','i']},
			{type: "taiko", name: "Practice 4", x:420, y:365, chars: ['a','e','i'],bpm:60},

			{type: "run", name: "Practice 5", x:280, y:465, notice:"Mastery", chars: ['a','e','i']},
			{type: "taiko", name: "Practice 6", x:420, y:465, chars: ['a','e','i'],bpm:120},
			
		],
		"Vowels 2": [
			
		],
		
		"Consonants 1": [
			
		],
		"Consonants 2": [
			
		],
		"Consonants 3": [
			
		],
		"Consonants 4": [
			
		],
		"Consonants 5": [
			
		],
		"Consonants 6": [
			
		],
		"Consonants 7": [
			
		],
	},
	
	coloring: null,
};
const taiko = { 
	lowercase: "abcdefghijklmnopqrstuvwxyz".split(''),
	uppercase: "ABCDEFGHIJKLMNOPOQRSTUVWXYZ".split(''),
	special: "0123456789,.?;:\'\"!()".split(''),
	keys: [],
	pool: [],
	time: {
		offset: 0,
		set: 0,
	},
	player: {
		score: {
			raw: 0,
			display: 0
		},
		combo: 0,
		maxcombo: 0,
		health: 100,
		popup: {
			text: "nothing",
			opacity: 0,
		},
	},
	notes: [],
	mods: {
		split: true,
		capital: true,
		special: true,
		bpm: 120,
		speed: 5,
	},
};
const run = {
	keys: [],
};
const learn = {
	keys: [],
};

/**
	"Called directly before setup(), the preload() function is used to handle asynchronous loading of external files in a blocking way."
	"Nothing besides load calls (loadImage, loadJSON, loadFont, loadStrings, etc.) should be inside the preload function."
**/
function preload(){
	coloring.primaryFont = loadFont("assets/semibold.ttf");
	coloring.secondaryFont = loadFont("assets/hyperbold.ttf");
}

function setup() {
	createCanvas(800, 600);

	//For some odd reason, a variable cannot be initialized to a color before setup.
	coloring.primary = color(55, 62, 152);
	coloring.secondary = color(254,227,110);
	coloring.tertiary = color(241, 103, 117);
	coloring.quaternary = color(42, 42, 42);
}

function draw() {
	switch (page) {
		case "menu":
			menuDraw(menu,taiko,run,learn);
			break;
			
		case "run":
			runDraw(run);
			break;
			
		case "learn":
			learnDraw(learn);
			break;
			
		case "taiko":
			taikoDraw(taiko);
			break;
		case "taikoend":
			taikoEnd(taiko);
			break;
	}

	/** Curtain Handling, do not touch **/
	if(curtainmode == "raise"){
		curtain = constrain(curtain + (100 - curtain) / 15, 0, 100);
		if(curtain > 99.8 && after != 0){
			after();
			after = 0;
			lockinput = false;
		}
	}else{
		curtain = constrain(curtain - (curtain) / 15, 0, 100);
		if(curtain < 0.2){
			after();
			after = 0;
			curtainmode = "raise";
			lockinput = false;
		}
	}
	fill(0);
	rect(0, 0, 800, 600 * (1 - (curtain / 100)));
}