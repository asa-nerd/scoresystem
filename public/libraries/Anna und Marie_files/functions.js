// ----------------------------------------------
// general functions

//function touchStarted(){
/*function mousePressed(){
    fullscreen(!fs);
    return false;
}*/

function doFullscreen(){
	
	fullscreen(!fs);
    return false;
}

function windowResized(){
	//wx = windowWidth/2 - 500;
	//canvas.position(wx, 20);
}



function drawStaff(){
	push();
		stroke(0);
	  	strokeWeight(1);
	  	translate(0,400);
	  	for (var i = 0; i >= -4; i--){
	  		line(10, i*staveDistance, width-10, i*staveDistance);
	  	}
	pop();
}

function applyStyles(_divElement){
	_divElement.style("background-color: white");
	_divElement.style("z-index: 10000");
	_divElement.style("padding: 10px");
	_divElement.style("border: 1px solid grey");
	_divElement.style("font-family: Verdana");
	_divElement.style("font-size: 16px");
}

function drawNoteLines(currentPitch, notePosYnew, notePositionX, stepY){
	// draw lines for notes outside staves
	var offsetX = 8;

	if (currentPitch <= 13 ){												
			/*var lineShift = 0;
			switch (currentMacro%12){
				case 0: lineShift = -1; break;
				case 1: lineShift = -1; isSemi = true; break;
				case 2: lineShift = -1; break;
				case 3: lineShift = -1; isSemi = true; isDown = true; break;
				case 4: lineShift = -1; break;
				case 5: lineShift = -1; break;
				case 6: lineShift = -1; isSemi = true; break;
				case 7: lineShift = 0; break;
				case 8: lineShift = 0; isSemi = true; break;
				case 9: lineShift = 0; break;
				case 10: lineShift = 0; isSemi = true; break;
				case 11: lineShift = 0; break;
			}*/

			

			if (currentPitch == 0){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2)+staveDistance/2;
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 1){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2)+staveDistance/2;
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 2){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 3){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2)+staveDistance/2;
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 4){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 5){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 6){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 7){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2)+staveDistance/2;
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 8){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2)+staveDistance/2;
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 9){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 10){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2+staveDistance/2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 11){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 12){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			if (currentPitch == 13){
				var xModi = 0;
				for (var k = 0; k < 4; k++){
					xModi = (k * stepY*2);
					line(notePositionX-offsetX, notePosYnew-xModi, notePositionX+offsetX, notePosYnew-xModi);
				}
			}
			
	}

	
	if (currentPitch >= 31){	

		if (currentPitch == 32){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2);
				line(notePositionX-10, notePosYnew+xModi, notePositionX+10, notePosYnew+xModi);
			}
		}
		if (currentPitch == 33){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 34){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 35){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 36){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 37){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2)+staveDistance/2;
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 38){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2)+staveDistance/2;
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 39){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 40){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 41){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 42){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 43){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 44){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2)+staveDistance/2;
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 45){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
	
		if (currentPitch == 47){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}
		if (currentPitch == 48){
			var xModi = 0;
			for (var k = 0; k < 6; k++){
				xModi = (k * stepY*2+staveDistance/2);
				line(notePositionX-offsetX, notePosYnew+xModi, notePositionX+offsetX, notePosYnew+xModi);
			}
		}

	}
	
			
}
