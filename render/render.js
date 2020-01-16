// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------


  
const ipcRenderer = require('electron').ipcRenderer; 
let OSCmessages = [];
let systemIsActive = false;
let recordingMessages = false;

emptyFields();



// -------------------------------------------------------------------------------------------------
// Functions
// -------------------------------------------------------------------------------------------------

function functionCheckboxOn(){
    var checkBox = document.getElementById("checkboxOn");
    if (checkBox.checked == true){               // If the checkbox is checked, display the output text
      systemIsActive = true;
      ipcRenderer.send("requestConnectionData"); // ipcRender.send will pass the information to main process
    } else {
      systemIsActive = false;
      emptyFields();
    }
  }

  function functionCheckboxRecord(){
    var checkBox = document.getElementById("checkboxRecord");
    if (checkBox.checked == true){               // If the checkbox is checked, display the output text
      recordingMessages = true;
      console.log("on");
    } else {
      recordingMessages = false;
    }
  }

  function addMessageEntry(_data){
    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    var htmlText = "<input type='text' name='fname' value='"+_data+"'>";
    htmlText += "<input type='text' name='fname' value='"+_data+"'>";
    temp.innerHTML = htmlText;
    //temp.innerHTML = _data;
    document.getElementById("messagelist").appendChild(temp);
  }

  function emptyFields(){
    document.getElementById('serverid').textContent = "-";          
    document.getElementById('serverport').textContent = "-";    
    document.getElementById('oscport').textContent = "-";  
  }

// -------------------------------------------------------------------------------------------------
// Communication with Main Script
// -------------------------------------------------------------------------------------------------

//var arg ="secondparam"; //send the info to main process . we can pass any arguments as second param.
//ipcRenderer.send("requestConnectionData", arg); // ipcRender.send will pass the information to main process

ipcRenderer.on('connectionData', function(event,param) { // Confirmation event from main.js after initital event
    document.getElementById('serverid').textContent = param["ip"];          
    document.getElementById('serverport').textContent = param["serverport"];    
    document.getElementById('oscport').textContent = param["oscport"];                                
 });

ipcRenderer.on('clientConnect', function(event,param) { // When a new client connected
    document.getElementById('numberclients').textContent = param;  
});

ipcRenderer.on('oscReceive', function(event,param) { // When listening is on and OSC is received
    if (recordingMessages == true){
        // light candle
        var oscExists = false;
        for(var i = 0; i < OSCmessages.length; i++){  // check the list of OSC messages
            if (param == OSCmessages[i]){
              oscExists = true;
            }
        }
        if (oscExists == false){
            addMessageEntry(param);     // if not existent add to list
            OSCmessages.push(param);
        }
        console.log(OSCmessages);
    }
    // update table in GUI
});