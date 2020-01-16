// ----------------------------------------------
// functions triggered by OSC messages

function writeText(tx){
	textField.html(tx);
}

function writeInstruction(tx){
	instrField.html(tx);
}

function writePlayMode(_pmAnna, _pmMarie){
	playModeField.html('<span id="annaplaymode">'+_pmAnna+"  "+'</span>');
	playModeField.html('<span id="marieplaymode">'+_pmMarie+'</span>', true);
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
    var bboxArrow = arrow.getBBox();							//get bounding and center box of element
    
    var t = new Snap.Matrix()									// setup Matrix for transformations
	t.translate(_x, _y);
	t.rotate(_rotate, bboxArrow.cx, bboxArrow.cy);
	arrow.transform(t); 
}

function drawSymbol(symb){
	symbol.clear();
	var arrowLength = 60;
	var boxWidth = 120;
	var arrowX = (boxWidth/2)-(arrowLength/2);
	
	switch (symb){
		//symbol 1-3 ----------------------------------------------------------
		case ">>>":
			makeArrowSVG("red",arrowX, 30, 0, arrowLength);			// Arrow Anna: red
			makeArrowSVG("blue",arrowX,90, 0, arrowLength);			// Arrow Marie: blue
			makeArrowSVG("grey",arrowX,60, 0, arrowLength);			// Arrow Electronics: grey
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
		//symbol 4 ----------------------------------------------------------
		case "-><-L/":
			makeArrowSVG("red",0, 60, 0, arrowLength);				// Arrow Anna: red
			makeArrowSVG("blue",60, 60, 180, arrowLength);			// Arrow Marie: blue
			makeArrowSVG("grey",0, 60, -90, arrowLength);			// Arrow Electronics: grey
			break;
		case "L/-><-":
			makeArrowSVG("red",0, 60, -90, arrowLength);
			makeArrowSVG("blue",0, 60, 0, arrowLength);
			makeArrowSVG("grey",60, 60, 180, arrowLength);
			break;
		case "->L/<-":
			makeArrowSVG("red",0, 60, 0, arrowLength);
			makeArrowSVG("blue",0, 60, -90, arrowLength);
			makeArrowSVG("grey",60, 60, 180, arrowLength);
			break;
		//symbol 5 ----------------------------------------------------------
		case "->L/->":
			makeArrowSVG("red",arrowX, 45, 0, arrowLength);
			makeArrowSVG("blue",arrowX, 60, -90, arrowLength);
			makeArrowSVG("grey",arrowX, 75, 0, arrowLength);
			break;
		case "L/->->":
			makeArrowSVG("red",arrowX, 60, -90, arrowLength);
			makeArrowSVG("blue",arrowX, 45, 0, arrowLength);
			makeArrowSVG("grey",arrowX, 75, 0, arrowLength);
			break;
		case "->->L/":
			makeArrowSVG("red",arrowX, 75, 0, arrowLength);
			makeArrowSVG("blue",arrowX, 45, 0, arrowLength);
			makeArrowSVG("grey",arrowX, 60, -90, arrowLength);
			break;
		//symbol 6 ----------------------------------------------------------	
		case "->-><-":
			makeArrowSVG("red",0, 75, 0, arrowLength);
			makeArrowSVG("blue",0, 45, 0, arrowLength);
			makeArrowSVG("grey",60, 60, -180, arrowLength);
			break;
		case "<-->->":
			makeArrowSVG("red",60, 60, -180, arrowLength);
			makeArrowSVG("blue",0, 45, 0, arrowLength);
			makeArrowSVG("grey",0, 75, 0, arrowLength);
			break;
		case "-><-->":
			makeArrowSVG("red",0, 45, 0, arrowLength);
			makeArrowSVG("blue",60, 60, -180, arrowLength);
			makeArrowSVG("grey",0, 75, 0, arrowLength);
			break;	
		//symbol 7 ----------------------------------------------------------	
		case "<-L/->":
			makeArrowSVG("red",0, 60, 180, arrowLength);			// Arrow Anna: red
			makeArrowSVG("blue",0, 60, -90, arrowLength);			// Arrow Marie: blue
			makeArrowSVG("grey",60, 60, 0, arrowLength);				// Arrow Electronics: grey
			break;
		case "L/<-->":
			makeArrowSVG("red",0, 60, -90, arrowLength);
			makeArrowSVG("blue",0, 60, 180, arrowLength);
			makeArrowSVG("grey",60, 60, 0, arrowLength);
			break;
		case "<-->L/":
			makeArrowSVG("red",0, 60, 180, arrowLength);
			makeArrowSVG("blue",60, 60, 0, arrowLength);
			makeArrowSVG("grey",0, 60, -90, arrowLength);
			break;		
	}
}

function drawDynamics(dynAnna, dynMarie){
	dynamicsAnna.attr({ text: dynAnna});
	dynamicsMarie.attr({ text: dynMarie});
}

function printScaleType(_scale){
	var scaleText = "undefined";
	
	switch (_scale){
			case "H": scaleText = "Halbton Skala"; break;
			case "W": scaleText = "Ganzton Skala"; break;
			case "WH": scaleText = "Ganzton-Halbton Skala"; break;
			case "HW": scaleText = "Halbton-Ganzton Skala"; break;
			case "WHH": scaleText = "Ganz-Halb-Halbton Skala"; break;
			case "WHW": scaleText = "Ganz-Halb-Ganzton Skala"; break;	
			case "HHW": scaleText = "Halb-Halb-Ganzton Skala"; break;	
			case "Ready": scaleText = "Ready."; break;	
	}
	scaleTypeField.html(scaleText);
}

function drawPitchsets(_pitchsetAnna, _pitchsetMarie){
	// 2 Arrays: (1) Pitchset Anna (2) Pitchset Marie

	resetScoreSystem();				// Erase old pitchset
    drawStaff();					// Draw fresh staff
    drawScale(_pitchsetAnna, 0);	// draw pitchsets for Anna and Marie
    drawScale(_pitchsetMarie, 1);
}

function drawStaff(){
	
	var stavline1 = score.line(10, staveDistance*0, width-20, staveDistance*0);
	var stavline2 = score.line(10, staveDistance*1, width-20, staveDistance*1);
	var stavline3 = score.line(10, staveDistance*2, width-20, staveDistance*2);
	var stavline4 = score.line(10, staveDistance*3, width-20, staveDistance*3);
	var stavline5 = score.line(10, staveDistance*4, width-20, staveDistance*4);
	var stave = score.group(stavline1, stavline2, stavline3, stavline4, stavline5);

	stave.attr({stroke: "black", strokeWidth: 1});

	var t = new Snap.Matrix()			// setup Matrix for transformations
	t.translate(0, 150);
	stave.transform(t); 
}

function drawScale(_pitchset, _direction){
	// lowest Midi note 48 = C3

	var pitchset = _pitchset.split(",");			// split String array to numbers array

	var currentPitch;
	var backwardsShift; 
	var notePositionX = 0;
	var notePositionY;
	var stepDir; 
	var pitchReordered = [];
	
	var k = 0;
	if(_direction != 0){							// If direction is backwards (_direction = 0) then reverse notes in array
		for (var i = pitchset.length-1; i >= 0; i--){
			console.log(pitchset[i]);
			pitchReordered[k] = pitchset[i];
			k ++;			
		}
		backwardsShift = width-70; 
		stepDir = -1;								// set the direction for notes steps to Down
	}else{
		backwardsShift = 0; 
		pitchReordered = pitchset;
		stepDir = 1;								// set the direction for notes steps to Up
	}
	
	for (var i = 0; i < pitchReordered.length; i++){				// Loop through pitchset array
		var cp = pitchReordered[i].split(".");						// get microtonality
		var currentMacro = cp[0];									// Halftones
		var currentMicro = cp[1];									// Microtones
		var currentMicro = (pitchReordered[i] % 1).toFixed(3)
		var accidentialMicro = 0;
		var currentShift = 0;

		var shiftFromLeftBorder = 25;
		var globalYshift = -7;

		switch (currentMicro){
			case "undefined": currentShift = 0; accidentialMicro = 0; break; 
			case "333": currentShift = 0; accidentialMicro = 1; break; 
			case "5": currentShift = 0; accidentialMicro = 2; break; 
			case "666": currentShift = 1; accidentialMicro = 3; break; 
		}
		
		currentPitch = currentMacro-48;							
		var stepY = staveDistance/2;
		notePositionY = -(currentPitch*stepY+globalYshift);						// calculate y-position of note
		notePositionX = i*noteSpacing*stepDir+backwardsShift+shiftFromLeftBorder;  	// step one step to the right
		
		// Accidential
		var octave = Math.floor(currentPitch/12);								// Calculate octave starting at MIDI 48 (C)
		var octaveShift = (octave*5);
		var noteShift = 0;
		var isSemi = false;
		var notePosYnew;

		if (currentMicro == 0){													// halftone
			switch (currentMacro%12){											// decide wether accidential is necessary
				case 0: noteShift = 0; break; case 1: noteShift = 1; isSemi = true; break; case 2: noteShift = 1; break;
				case 3: noteShift = 2; isSemi = true; break; case 4: noteShift = 2; break; case 5: noteShift = 2; break;
				case 6: noteShift = 3; isSemi = true; break; case 7: noteShift = 3; break; case 8: noteShift = 4; isSemi = true; break;
				case 9: noteShift = 4; break; case 10: noteShift = 5; isSemi = true; break; case 11: noteShift = 5; break;
			}

			notePosYnew = notePositionY+(noteShift*stepY)+(octaveShift*stepY); 	 // now calculate new yPos for note
			if (isSemi == true){												 // print ‘#‘ if necessary
				var currentUp2 = up2Blueprint.clone();
				score.append(currentUp2);
				translateSVG(currentUp2, notePositionX-12, notePosYnew-4, 2.1);
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
				var currentDown4 = down4Blueprint.clone();
				score.append(currentDown4);
				translateSVG(currentDown4, notePositionX-12, notePosYnew-8, 2);
			}else{
				var currentUp4 = up4Blueprint.clone();
				score.append(currentUp4);
				translateSVG(currentUp4, notePositionX-12, notePosYnew-2, 2);
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
			var currentUp3 = up3Blueprint.clone();
			score.append(currentUp3);
			translateSVG(currentUp3, notePositionX-12, notePosYnew-6, 1.3);
		}			

		if (currentMicro == 0.666){
			switch (currentMacro%12){
				case 0: noteShift = 0; break; case 1: noteShift = 0; isSemi = true; break; case 2: noteShift = 1; break;
				case 3: noteShift = 1; isSemi = true; break; case 4: noteShift = 1; break; case 5: noteShift = 1; break;
				case 6: noteShift = 2; isSemi = true; break; case 7: noteShift = 3; break; case 8: noteShift = 3; isSemi = true; break;
				case 9: noteShift = 4; break; case 10: noteShift = 5; isSemi = true; break; case 11: noteShift = 4; break;
			}

			notePosYnew = notePositionY+(noteShift*stepY)+(octaveShift*stepY); 	 // Calculate new yPos
			var currentDown3 = down3Blueprint.clone();
			score.append(currentDown3);
			translateSVG(currentDown3, notePositionX-12, notePosYnew-4, 1.3);		
		}

		drawNoteLines(currentPitch, notePosYnew, notePositionX, stepY);			 // draw lines if note is out of stave system
		drawNote(notePositionX, notePosYnew);									 // draw note	
	}
}

function drawNote(_x, _y){
	var currentNote = noteBlueprint.clone();
	score.append(currentNote);
	translateSVG(currentNote, _x, _y, 1.3);
}

function translateSVG(_object, _x, _y, _factor){
	var t = new Snap.Matrix()													// setup Matrix for transformations
	t.translate(_x, _y+240);
	t.scale(_factor);
	_object.transform(t);

}

