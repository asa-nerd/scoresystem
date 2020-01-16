
// ----------------------------------------------
// Set variables


var canvas; 
var wx;

var staveDistance = 12;
var noteSpacing = 32;
var pitchReordered;

var rectSize = 120;
var textFontSize = 16;
var down3, up3, up4, down4, note;

var colorAnna, colorMarie, colorElektronik;

var fs = fullscreen();

var floatContainer;
var textField, instrField, playModeField, scaleTypeField;
var buttonFS, buttonConfig;
var scoreSVG;

var symbol, dynamics, score;
var dynamicsAnna, dynamicsMarie;
var symbolHolder;
var scoreHolder;

// ----------------------------------------------
// Setup

function setup() {
	canvas = createCanvas(1000,800);

	// initiate socket.io
	socket = io();

	// connect functions to incoming OSC messages			
	socket.on('/text', writeText);
	socket.on('/instruction', writeInstruction);
	socket.on('/playMod', writePlayMode);
	socket.on('/symbol', drawSymbol);
	socket.on('/dynamics', drawDynamics);
	socket.on('/pitchset', drawPitchsets);
	socket.on('/scaletype', printScaleType);


	// Load gfx for signs
	/*down3 = loadSVG('img/3down.svg');
	up3 = loadSVG('img/3up.svg');
	down4 = loadSVG('img/4down.svg');
	up4 = loadSVG('img/4up.svg');
	note = loadSVG('img/note.svg');*/
	

	// Set HTML & CSS layout and styling for the UI elements
	floatContainer = createDiv();
	floatContainer.id('floatContainer');
	floatContainer.style("width: 1000px");
	floatContainer.style("height: 800px");
	floatContainer.style("background: red");
	floatContainer.style("margin-left: auto");
	floatContainer.style("margin-right: auto");
	floatContainer.style("position: relative");
	canvas.parent('floatContainer');
	canvas.style("position: absolute");
	canvas.style("left: 0px");
	canvas.style("top: 0px");

	instrField = createDiv();
	playModeField = createDiv();
	scaleTypeField = createDiv();
	textField = createDiv();

	buttonFS = createButton('Fullscreen');
	buttonFS.position(20, 510);
  	buttonFS.mousePressed(doFullscreen);
	buttonConfig = createButton('Config');
	buttonConfig.position(180, 510);
  	//buttonConfig.mousePressed(doFullscreen);
	
	instrField.parent('floatContainer');
	playModeField.parent('floatContainer');
	scaleTypeField.parent('floatContainer');
	textField.parent('floatContainer');
	buttonFS.parent('floatContainer');
	buttonConfig.parent('floatContainer');
	
	applyStyles(textField);
	applyStyles(instrField);
	applyStyles(playModeField);
	applyStyles(scaleTypeField);

	instrField.style("width: 690px;");
	instrField.style("height: 140px;");
	instrField.style("position: relative");
	instrField.style("left: 300px");
	instrField.style("top: 0px");

	playModeField.style("width: 690px;");
	playModeField.style("height: 20px;");
	playModeField.style("position: relative");
	playModeField.style("left: 300px");
	playModeField.style("top: 10px");

	scaleTypeField.style("width: 140px;");
	scaleTypeField.style("height: 20px;");
	scaleTypeField.style("position: relative");
	scaleTypeField.style("left: 300px");
	scaleTypeField.style("top: 10px");

	textField.style("width: 690px;");
	textField.style("height: 200px;");
	textField.style("position: relative");
	textField.style("left: 300px");
	textField.style("top: 300px");

	buttonFS.style("position: relative");
	buttonFS.style("left: 0px");
	buttonFS.style("top: 80px");

	buttonConfig.style("position: relative");
	buttonConfig.style("left: 10px");
	buttonConfig.style("top: 80px");


	// Setup SVG Elements for Dynamics, Symbol and Score
				/*scoreSVG = createElement('SVG');
				scoreSVG.id('scoresvg');
				scoreSVG.parent('floatContainer');
				//applyStyles(scoreSVG);
				//scoreSVG.style("position: absolute");
				scoreSVG.style("left: 0px");
				scoreSVG.style("top: 0px");

				scoreSVG.style("width: 500px");
				scoreSVG.style("height: 500px");*/

	// Link Objects to HTML-Containers
	symbol = Snap("#symbol");
	dynamics = Snap("#dynamics");
	score = Snap("#score");
	
	// Setup Box for symbol
	//symbolHolder = symbol.circle(150, 150, 100);
	//symbolHolder.attr('fill', 'red');
	
	// Setup Box for dynamics
	dynamicsAnna = dynamics.text(60, 50, "");
	dynamicsMarie = dynamics.text(60, 90, "");
	dynamicsAnna.attr({'font-size':36, fill:'blue', 'text-anchor':'middle'});
	dynamicsMarie.attr({'font-size':36,  fill:'red', 'text-anchor':'middle'});

	// Setup Box for score/pitchsets
	scoreHolder = score.circle(150, 150, 100);
	scoreHolder.attr('fill', 'red');    

	// Asign colors for Anna, Marie and Electronic
	colorAnna = color(0,170,255);
	colorMarie = color(255,0,0);
	colorElektronik = color(200,200,200);

	// Draw welcome interface
	background(0);
	drawStaff();
	writeText("Ready.");
	drawSymbol("->->L/");
	printScaleType("Ready");
	writeInstruction("Even more ready than the others.");
	writePlayMode("Ready.", "Ready.");

	
}

// ----------------------------------------------
// Draw loop

function draw() {

}