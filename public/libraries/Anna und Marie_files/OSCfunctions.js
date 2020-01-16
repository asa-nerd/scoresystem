// ----------------------------------------------
// functions triggered by OSC messages

function writeText(tx){
	textField.html(tx);
}

function writeInstruction(tx){
	instrField.html(tx);
}


function writePlayMode(_pmAnna, _pmMarie){
	playModeField.html(_pmAnna+" "+_pmMarie);
}


function makeArrow(_color){
	if (_color == "red"){
		stroke(colorAnna);
	}else if (_color == "green"){
		stroke(colorElektronik);
	}else if (_color == "orange"){
		stroke(colorMarie);
	}
	var arrowLength = 100;
	strokeWeight(3);
	line(0,0,arrowLength,0);
	line(arrowLength-10,-10, arrowLength,0);
	line(arrowLength-10,10, arrowLength,0);
}

function makeArrowSVG(_color, _x, _y, _rotate, _arrowLength){
	var thickness = 2;
	var line1 = symbol.line(0,0,_arrowLength,0);
	var line2 = symbol.line(_arrowLength-8,-8, _arrowLength,0);
	var line3 = symbol.line(_arrowLength-8,8, _arrowLength,0);
	var arrow = symbol.group(line1, line2, line3);
    
	switch(_color){
		case "red":
			arrow.attr({stroke: "red", strokeWidth: thickness});
		    break;
		 case "grey":
			arrow.attr({stroke: "grey", strokeWidth: thickness});
		    break;
		case "blue":
			arrow.attr({stroke: "blue", strokeWidth: thickness});
		    break;
	}
    var bboxArrow = arrow.getBBox();	//get bounding and center box of element
    
    var t = new Snap.Matrix()			// setup Matrix for transformations
	t.translate(_x, _y);
	t.rotate(_rotate, bboxArrow.cx, bboxArrow.cy);
	arrow.transform(t); 
}

function drawSymbol(symb){
	
	symbol = Snap("#symbol");
	var arrowLength = 60;
	var boxWidth = 120;
	var arrowX = (boxWidth/2)-(arrowLength/2)

		//symbol 1-3 ----------------------------------------------------------
		if (symb.length == 3){
			switch (symb){
				case ">>>":
				makeArrowSVG("red",arrowX, 30, 0, arrowLength);
				makeArrowSVG("grey",arrowX,60, 0, arrowLength);
				makeArrowSVG("blue",arrowX,90, 0, arrowLength);
				break;
			case "-|/":
				makeArrowSVG("red",arrowX, 60, -45, arrowLength);
				makeArrowSVG("grey",arrowX,60, 45, arrowLength);
				makeArrowSVG("blue",arrowX,60, 0, arrowLength);
				break;
			case ">|<":
				makeArrowSVG("red",60, 30, 360/3, arrowLength);
				makeArrowSVG("grey",60,90, 360/1.5, arrowLength);
				makeArrowSVG("blue",10,60, 0, arrowLength);
				break;
			}
		} else if (symb.length == 6){
				var ev = symb.slice(0, 2);
				var bv = symb.slice(2, 4);
				var sy = symb.slice(4, 6);
			switch (symb){
				
				//symbol 4 ----------------------------------------------------------
				case "-><-L/":
					break;
				case "L/-><-":
					break;
				case "->L/<-":
						if (ev == "->"){ makeArrowSVG("red",0, 60, 0, arrowLength);}
						if (bv == "->"){ makeArrowSVG("grey",0,60, 0, arrowLength);}					
						if (sy == "->"){ makeArrowSVG("blue",0,60, 0, arrowLength);}

						if (ev == "<-"){ makeArrowSVG("red",60, 60, 360/2, arrowLength);}
						if (bv == "<-"){ makeArrowSVG("grey",60,60, 360/2, arrowLength);}					
						if (sy == "<-"){ makeArrowSVG("blue",60,60, 360/2, arrowLength);}
						
						if (ev == "L/"){ makeArrowSVG("red",0, 60, -360/4, arrowLength);}
						if (bv == "L/"){ makeArrowSVG("grey",0,60, -360/4, arrowLength);}					
						if (sy == "L/"){ makeArrowSVG("blue",0,60, -360/4, arrowLength);}
					break;
				//symbol 5 ----------------------------------------------------------
				case "->L/->":
						makeArrowSVG("blue",arrowX, 45, 0, arrowLength);
						makeArrowSVG("grey",arrowX, 75, 0, arrowLength);
						makeArrowSVG("red",arrowX, 60, -90, arrowLength);
					break;
				case "L/->->":
						makeArrowSVG("red",arrowX, 45, 0, arrowLength);
						makeArrowSVG("grey",arrowX, 75, 0, arrowLength);
						makeArrowSVG("blue",arrowX, 60, -90, arrowLength);
					break;
				case "->->L/":
						makeArrowSVG("blue",arrowX, 45, 0, arrowLength);
						makeArrowSVG("red",arrowX, 75, 0, arrowLength);
						makeArrowSVG("grey",arrowX, 60, -90, arrowLength);
					break;
				//symbol 6 ----------------------------------------------------------
						
				case "->-><-":
						makeArrowSVG("red",0, 75, 0, arrowLength);
						makeArrowSVG("blue",0, 45, 0, arrowLength);
						makeArrowSVG("grey",60, 60, -360/2, arrowLength);
					break;
				case "<-->->":
						makeArrowSVG("grey",0, 75, 0, arrowLength);
						makeArrowSVG("red",0, 45, 0, arrowLength);
						makeArrowSVG("blue",60, 60, -360/2, arrowLength);
					break;
				case "-><-->":
						makeArrowSVG("grey",0, 75, 0, arrowLength);
						makeArrowSVG("blue",0, 45, 0, arrowLength);
						makeArrowSVG("red",60, 60, -360/2, arrowLength);
					break;				
			}
		}
}

function drawDynamics(dynAnna, dynMarie){
	dynamicsAnna.attr({ text: dynAnna});
	dynamicsMarie.attr({ text: dynMarie});
}

function drawPitchsets(_pitchsetAnna, _pitchsetMarie){
	// 2 Arrays: (1) Pitchset Anna (2) Pitchset Marie

	// Erase old pitchset
	push();
		translate(0,320);
		noStroke();
		fill(255);
		rect(0,0,width, 160);
		rect(500,-80,width, 240);
	pop();

	// Draw fresh staff
    drawStaff();

    // draw pitchsets for Anna and Marie
    push();
	    translate(0,400);				
		translate(10,4.5*staveDistance);
		fill(0);
		drawScale(_pitchsetAnna, 0);
		translate(width,0);	
		drawScale(_pitchsetMarie, 1);
	pop();

}

function printScaleType(_scale){
	var scaleText = "undefined";
	
	switch (_scale){
			case "H": scaleText = "Halbton Skala"; break;
			case "W": scaleText = "Ganzton Skala"; break;
			case "WH": scaleText = "Ganzton-Halbton Skala"; break;
			case "HW": scaleText = "Halbton-Ganzton Skala"; break;
			case "WHH": scaleText = "Ganz-Halb-Halbton"; break;
			case "WHW": scaleText = "Halb-Halb-Ganzton"; break;	
			case "Ready": scaleText = "Ready."; break;	
	}
	scaleTypeField.html(scaleText);
	/*push();
		textAlign(LEFT);
		translate(0,214);
		noStroke();
		fill(255);
		rect(0,-30,300, 50);
		fill(0);
		textSize(textFontSize);
		text(scaleText, 10, 0);
	pop();*/
}	


function drawScale(_pitchset, _direction){
	// lowest Midi note 48 = C3

	// split String array to numbers array
	var pitchset = _pitchset.split(",");

	var currentPitch;
	var notePositionX = 0;
	var notePositionY;
	var stepDir; 
	var k = 0;

	// If direction is backwards (_direction = 0) then reverse notes in array
	if(_direction != 0){
		for (var i = pitchset.length-1; i > 0; i--){
			pitchReordered[k] = pitchset[i];
			k ++;			
		}
		stepDir = -1;
	}else{
		pitchReordered = pitchset;
		stepDir = 1;
	}
 
	push();		
		for (var i = 1; i < pitchReordered.length-1; i++){				// Loop through pitchset array
			var cp = pitchReordered[i].split(".");						// get microtonality
			var currentMacro = cp[0];									// Halftones
			var currentMicro = cp[1];									// Microtones
			var currentMicro = (pitchReordered[i] % 1).toFixed(3)
			var accidentialMicro = 0;
			var currentShift = 0;

			switch (currentMicro){
				case "undefined": currentShift = 0; accidentialMicro = 0; break; 
				case "333": currentShift = 0; accidentialMicro = 1; break; 
				case "5": currentShift = 0; accidentialMicro = 2; break; 
				case "666": currentShift = 1; accidentialMicro = 3; break; 
			}
			
			currentPitch = currentMacro-48;							//
			var stepY = staveDistance/2;
			notePositionY = -(currentPitch*stepY);					// calculate y-position of note
			notePositionX = i*noteSpacing*stepDir; 					// step one step to the right
			
			// Accidential
			var octave = Math.floor(currentPitch/12);				// Calculate octave starting at MIDI 48 (C)
			var octaveShift = (octave*5);
			var noteShift = 0;
			var isSemi = false;
			var notePosYnew;

			if (currentMicro == 0){
				switch (currentMacro%12){
					case 0: noteShift = 0; break; case 1: noteShift = 1; isSemi = true; break; case 2: noteShift = 1; break;
					case 3: noteShift = 2; isSemi = true; break; case 4: noteShift = 2; break; case 5: noteShift = 2; break;
					case 6: noteShift = 3; isSemi = true; break; case 7: noteShift = 3; break; case 8: noteShift = 4; isSemi = true; break;
					case 9: noteShift = 4; break; case 10: noteShift = 5; isSemi = true; break; case 11: noteShift = 5; break;
				}

				notePosYnew = notePositionY+(noteShift*stepY)+(octaveShift*stepY); 	 // Calculate new yPos
				if (isSemi == true){
					textSize(16);
					text('#', notePositionX-16, notePosYnew+5);
				}
			}

			if (currentMicro == 0.5){
				var isDown = false;
				switch (currentMacro%12){
					case 0: noteShift = 0; break; case 1: noteShift = 0; isDown = true; isSemi = true; break; case 2: noteShift = 1; break;
					case 3: noteShift = 1; isSemi = true; isDown = true; break; case 4: noteShift = 2; break; case 5: noteShift = 2; break;
					case 6: noteShift = 2; isDown = true; isSemi = true; break; case 7: noteShift = 3; break; case 8: noteShift = 3; isDown = true; isSemi = true; break;
					case 9: noteShift = 4; break; case 10: noteShift = 4; isDown = true;  isSemi = true; break; case 11: noteShift = 5; break;
				}

				notePosYnew = notePositionY+(noteShift*stepY)+(octaveShift*stepY); 	 // Calculate new yPos

				if (isDown == true){
					image(down4, notePositionX-18, notePosYnew-12, 9, 18);
				}else{
					image(up4, notePositionX-23, notePosYnew-8, 20, 16);
				}
				
			}

			if (currentMicro == 0.333){

				switch (currentMacro%12){
					case 0: noteShift = 0; break; case 1: noteShift = 1; isSemi = true; break; case 2: noteShift = 1; break;
					case 3: noteShift = 2; isSemi = true; break; case 4: noteShift = 2; break; case 5: noteShift = 2; break;
					case 6: noteShift = 3; isSemi = true; break; case 7: noteShift = 3; break; case 8: noteShift = 4; isSemi = true; break;
					case 9: noteShift = 4; break; case 10: noteShift = 5; isSemi = true; break; case 11: noteShift = 5; break;
				}

				notePosYnew = notePositionY+(noteShift*stepY)+(octaveShift*stepY); 	 // Calculate new yPos
				image(up3, notePositionX-18, notePosYnew-8, 10, 20);
			}			

			if (currentMicro == 0.666){

				switch (currentMacro%12){
					case 0: noteShift = 0; break; case 1: noteShift = 0; isSemi = true; break; case 2: noteShift = 1; break;
					case 3: noteShift = 1; isSemi = true; break; case 4: noteShift = 1; break; case 5: noteShift = 1; break;
					case 6: noteShift = 2; isSemi = true; break; case 7: noteShift = 3; break; case 8: noteShift = 3; isSemi = true; break;
					case 9: noteShift = 4; break; case 10: noteShift = 5; isSemi = true; break; case 11: noteShift = 4; break;
				}

				notePosYnew = notePositionY+(noteShift*stepY)+(octaveShift*stepY); 	 // Calculate new yPos
				image(down3, notePositionX-18, notePosYnew-8, 10, 20);		
			}

			stroke(0);
			drawNoteLines(currentPitch, notePosYnew, notePositionX, stepY);			 // draw lines
			drawNote(notePositionX, notePosYnew);									 // draw note	
		}
	pop();
}

function drawNote(_x, _y){
	noStroke();
	image(note, _x-6, _y-5, 12, 9);
}

/*function calculateNoteY(_midiPitch){
	if (_midiPitch%12 == 0){

	}
	var result = 0;
	return -(_midiPitch*stepY);
}*/



