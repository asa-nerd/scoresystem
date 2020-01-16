// ----------------------------------------------
// general functions

function doFullscreen(){	
	//fullscreen(!fs);
	toggleFullScreen();
	fs = !fs;
}

function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;
  
	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
	  requestFullScreen.call(docEl);
	}
	else {
	  cancelFullScreen.call(doc);
	}
  }

function windowResized(){
	//wx = windowWidth/2 - 500;
	//canvas.position(wx, 20);
}

function applyStyles(_divElement){
	_divElement.style("background-color: white");
	_divElement.style("z-index: 10000");
	_divElement.style("padding: 10px");
	_divElement.style("border: 1px solid grey");
	_divElement.style("font-family: Verdana");
	_divElement.style("font-size: 16px");
}

function resetScoreSystem(){
	score.clear();
}

function drawNoteLines(currentPitch, notePosYnew, notePositionX, stepY){
	// draw lines for notes outside staves
	var offsetX = 8;
	var offsteYLow = 209;
	var offsteYHigh = 245;
	var lineCenterX = notePositionX +5;
	
	if (currentPitch <= 13 ){	
			var xModi = 0;
			var stavlines = [];
			switch (currentPitch){								// determine if lines have to be shifted
				case 0: xModi = staveDistance/2; break;			// depending on pith (midi)
				case 1: xModi = staveDistance/2; break;
				case 2: xModi = 0; break;
				case 3: xModi = staveDistance/2; break;
				case 4: xModi = 0; break;
				case 5: xModi = 0; break;
				case 6: xModi = 0; break;
				case 7: xModi = staveDistance/2; break;
				case 8: xModi = staveDistance/2; break;
				case 9: xModi = 0; break;
				case 10: xModi = staveDistance/2; break;
				case 11: xModi = 0; break;
				case 12: xModi = 0; break;
				case 13: xModi = 0; break;
			}

			for (var k = 0; k < 4; k++){						// draw the lines
				var lineXstart = lineCenterX-offsetX;
				var lineXend = lineCenterX+offsetX;
				var lineY = offsteYLow+notePosYnew-xModi+(k * stepY*2);
				stavlines[k] = score.line(lineXstart, lineY, lineXend, lineY);
				stavlines[k].attr({stroke: "black", strokeWidth: 1});
			}
	}

	if (currentPitch > 31){
			//var linesQuantity = Math.floor((currentPitch-2)/2) - 14;
			var linesQuantity = 6;
			var xModi = 0;
			var stavlines = [];
			switch (currentPitch){
				case 32: xModi = 0; break;
				case 33: xModi = staveDistance/2; break;
				case 34: xModi = 0; break;
				case 35: xModi = staveDistance/2; break;
				case 36: xModi = 0; break;
				case 37: xModi = staveDistance/2; break;
				case 38: xModi = staveDistance/2; break;
				case 39: xModi = 0; break;
				case 40: xModi = staveDistance/2; break;
				case 41: xModi = staveDistance/2; break;
				case 42: xModi = staveDistance/2; break;
				case 43: xModi = 0; break;
				case 44: xModi = staveDistance/2; break;
				case 45: xModi = staveDistance/2; break;
				//case 46: xModi = ; break;
				case 47: xModi = 0; break;
				case 48: xModi = staveDistance/2; break;
			}

			for (var k = 0; k < linesQuantity; k++){						// draw the lines
				var lineXstart = lineCenterX-offsetX;
				var lineXend = lineCenterX+offsetX;
				var lineY = offsteYHigh+notePosYnew+xModi+(k * stepY*2);
				stavlines[k] = score.line(lineXstart, lineY, lineXend, lineY);
				stavlines[k].attr({stroke: "black", strokeWidth: 0.75});
			}
	}	
}
