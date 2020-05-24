
### Real-time score system for ___Anna & Marie___
This is the repository of the real-time score-system I developed for the composition and installation ___Anna & Marie___ by Marko Ciciliani. It was first performed at Donaueschinger Musiktage 2019. 

The score system is a software to distribute and display pitchsets and notation symbols over network. Informations are displayer for performers on a tablet. <br>
The work originates from the artistic research project [GAPPP](http://gappp.net/) (Gamified Audiovisual Performance and Performance Practice), carried out at the Institue of Electronic Music and Acoustics at the University of Music and Performing Arts in Graz.

I published a paper about the technological background and some artistic implications for the [TENOR 2020 conference](https://tenor2020.hfmt-hamburg.de/)




### Technology

The following section text provides an overview of the functionality of the score system. For further details please consult the provided code itself.
Based on previous experiences, due to the increasing role of JavaScript in network systems, and for greater flexibility, it was decided to develop the scoring system to run in web-browsers. The design of the system includes the following three modules.

<p align="center">
  <img width="40%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/setup.jpg"><br />
  <i>Figure</i> Basic technical setup of the scoring system.
</p>


**Sender (1):** Ciciliani uses SuperCollider to send control messages to the system. Alternatively, any (musical) software that is capable of sending Open Sound Control (OSC) messages (see Wright&Freed, 1997) can be used to communicate with the score system.

**Host (2):** The host is built on the node.js framework and translates incoming OSC messages to messages that can be transmitted via the WebSocket (WS) protocol. It then distributes these messages to clients connected via (wireless) network. The software uses the node-osc15 package to receive and process OSC messages and the Sockets.io16 package to send WebSockets.

**Display (3):** Any device that is capable of running a web browser can be used as a client. In the case of the performances of Anna & Marie, these were two iPads.


### Desktop Host Application
The host is designed as an app that is available for Linux, iOS, and Windows operating systems. The Electron framework was used to develop the executable app and its GUI. It can be run either on the same computer (localhost) that runs the sound software or on an independent machine. The host application establishes an HTTP-server using the express17 package for node.js, allowing browsers to connect to the host and to receive the score templates. The goal was to makes it as convenient as possible to connect clients via network. 

<p align="center">
  <img width="40%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/02%20Screenshots/interface-2.png"><br />
  <i>Figure</i> GUI of the host app.
</p>

The GUI of the host application allows the configuration of the port number, shows the IP address used as the URL in the browsers of the client tablets, and offers settings to rename incoming OSC messages while translating them to WebSockets. A benefit is that it allows using the host not only to convert from OSC to WebSockets but also to translate incoming commands according to the demands of a project. A learn-function traces all incoming OSC messages and displays them in a list. This is believed to facilitate the process of configuration if a renaming of given the messages encodings becomes necessary. 



### Display for the performers
The display for the performers is shown in fullscreenmode on any web-browser. CSS styling creates a floating and centered GUI that is adaptive to different display sizes and resolutions. Vector graphics were programmed using the Snap.svg library  making the display independent of resolution and generative.

```javascript
socket.onmessage = function(msg){
	var messJSON = JSON.parse(msg.data);
	switch(messJSON.message){
		case "/text":
		//. 
		case "/instruction":
		//.
		case "/playMod":
		//.
		case "/symbol":
		//.
	}
};
```
Incoming WS messages are treated according to their message type. Their data is handed over to functions rendering the score elements for the performers. 

<p align="center">
  <img width="70%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/02%20Screenshots/Figure-10.png"><br />
  <i>Figure</i> GUI the tablet app for the performers.
</p>

The score displays the following sections for playing instructions (see Figure 10):

1. **Arrow symbols.** These arrows function as instructions for how the musicians relate to each other in a chamber-musical sense. 
2. **Dynamic symbols.** 
3. **Text field for playing instructions.** 
4. **Pitch sets** for each of the two performers. The pitch sets consist of fragments of 6 different scales based on a microtonal scale. 
5. **The transcription** of the narration heard by the audience on the headphones.

Each of the performers are addressed by a separate color.


### Performance Situation in Donaueschingen (2019)

<p align="center">
  <img width="35%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/DE-1.jpg">
  <img width="35%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/IMG_9422.jpg">
  <img width="35%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/IMG_9438.jpg">
  <img width="35%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/DE-2.jpg"><br />
  <i>Figure</i> (1) Projection of the virtual performance space, with the symbolic real-time score in the front.<br />
  (2+3) Performance situation in the library at Donaueschinger Musiktage 2019. <br /> <br />
  (4) Technological setup.<br />
</p>

