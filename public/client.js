
// -------------------------------------------------------------
// Anna & Marie
// Client App for Web-Browsers
// V 0.9
// -------------------------------------------------------------

var canvas; 														// Set variables
var wx;

var staveDistance = 12;
var noteSpacing = 32;
var pitchReordered;

var rectSize = 120;
var textFontSize = 16;
var down3Blueprint, up3Blueprint, up4Blueprint, down4Blueprint, noteBlueprint;

var colorAnna, colorMarie, colorElektronik;

var fs = false;

var floatContainer;
var textField, textFieldP, instrField, playModeField, scaleTypeField;
var buttonFS;
var scoreSVG;

var symbol, dynamics, score;
var dynamicsAnna, dynamicsMarie;
var symbolHolder;
var scoreHolder;

var currentNote;


// -------------------------------------------------------------
// Setup
// -------------------------------------------------------------

function setup() {
	canvas = createCanvas(1000,800);

	var socket = new WebSocket('ws://'+location.host); // Open a websocket connection to the same URL as indicated in the browser 
		
	socket.onmessage = function(msg){						// connect functions to incoming OSC messages
		var messJSON = JSON.parse(msg.data);
		switch(messJSON.message){
			case "/text":
				writeText(messJSON.parameter1);
				break;
			case "/instruction":
				writeInstruction(messJSON.parameter1);
				break;
			case "/playMod":
				writePlayMode(messJSON.parameter1, messJSON.parameter2);
				break;
			case "/symbol":
				drawSymbol(messJSON.parameter1);
				break;
			case "/dynamics":
				drawDynamics(messJSON.parameter1, messJSON.parameter2);
				break;
			case "/pitchset":
				drawPitchsets(messJSON.parameter1, messJSON.parameter2);
				break;
			case "/scaletype":
				printScaleType(messJSON.parameter1);
				break;
			default:
				break;
		}
	};		

	canvas.parent('floatContainer');
	canvas.style("position: absolute");
	canvas.style("left: 0px");
	canvas.style("top: 0px");

	instrField = createDiv();
	playModeField = createDiv();
	scaleTypeField = createDiv();
	textField = createDiv();
	//textFieldP = createP();

	buttonFS = createButton('Fullscreen');
	buttonFS.position(20, 510);
  	buttonFS.mousePressed(doFullscreen);
	
	instrField.parent('floatContainer');
	playModeField.parent('floatContainer');
	scaleTypeField.parent('floatContainer');
	textField.parent('floatContainer');
	//textFieldP.parent('textField');
	buttonFS.parent('floatContainer');
	
	applyStyles(textField);
	//applyStyles(textFieldP);
	applyStyles(instrField);
	applyStyles(playModeField);
	applyStyles(scaleTypeField);

	instrField.style("width: 670px;");
	instrField.style("height: 140px;");
	instrField.style("position: relative");
	instrField.style("left: 300px");
	instrField.style("top: 0px");

	playModeField.style("width: 670px;");
	playModeField.style("height: 20px;");
	playModeField.style("position: relative");
	playModeField.style("left: 300px");
	playModeField.style("top: 10px");

	scaleTypeField.style("width: 340px;");
	scaleTypeField.style("height: 20px;");
	scaleTypeField.style("position: relative");
	scaleTypeField.style("left: 300px");
	scaleTypeField.style("top: 20px");

	textField.style("width: 970px;");
	textField.style("height: 200px;");
	textField.style("position: relative");
	textField.style("left: 0px");
	textField.style("top: 290px");

	buttonFS.style("position: relative");
	buttonFS.style("left: 0px");
	buttonFS.style("top: -340px");


	// Setup SVG Elements for Dynamics, Symbol and Score

	// Link Objects to HTML-Containers
	symbol = Snap("#symbol");			
	dynamics = Snap("#dynamics");
	score = Snap("#score");
	
	// Setup Box for dynamics
	dynamicsAnna = dynamics.text(60, 50, "");
	dynamicsMarie = dynamics.text(60, 90, "");
	dynamicsAnna.attr({'font-size':36, fill:'red', 'text-anchor':'middle'});
	dynamicsMarie.attr({'font-size':36,  fill:'blue', 'text-anchor':'middle'});

	// Setup Box for score/pitchsets
	// Load gfx for signs
	Snap.load("img/note.svg", onSVGLoadedNote);
	Snap.load("img/2up.svg", onSVGLoadedUp2);
	Snap.load("img/3down.svg", onSVGLoadedDown3);
	Snap.load("img/3up.svg", onSVGLoadedUp3);
	Snap.load("img/4up.svg", onSVGLoadedUp4);
	Snap.load("img/4down.svg", onSVGLoadedDown4);

	function onSVGLoadedNote( data ){noteBlueprint = data.select("g");}
	function onSVGLoadedUp2( data ){up2Blueprint = data.select("g");}
	function onSVGLoadedDown3( data ){down3Blueprint = data.select("g");}
	function onSVGLoadedUp3( data ){up3Blueprint = data.select("g");}
	function onSVGLoadedUp4( data ){up4Blueprint = data.select("g");}
	function onSVGLoadedDown4( data ){down4Blueprint = data.select("g");}

	// Asign colors for Anna, Marie and Electronic
	colorAnna = color(0,170,255);
	colorMarie = color(255,0,0);
	colorElektronik = color(200,200,200);

	// Draw welcome interface
	drawStaff();
	writeText("Ready.");
	drawSymbol("->->L/");
	printScaleType("Ready");
	drawDynamics("rdy", "rdy");
	writeInstruction("Even more ready than the others.");
	writePlayMode("Ready Anna?", "Ready Marie?");
}

// ----------------------------------------------
// Draw loop

function draw() {

}


