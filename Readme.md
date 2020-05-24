# Real-time score system for "Anna & Marie"
The score system is a software to distribute and display pitchsets and notation symbols over network. Informations are displayer for performers on a tablet. <br>
It was first used at Donaueschinger Musiktage 2019 in the Concert Installation ›Anna&Marie‹ by Marko Ciciliani. It originates from the artistic research project [GAPPP](http://gappp.net/) (Gamified Audiovisual Performance and Performance Practice).

I wrote a paper about the technological background and some artistic implications for the [TENOR 2020 conference](https://tenor2020.hfmt-hamburg.de/)

### Technology
A Node.js server is established. It listenes OSC messages (e.g. from SuperCollider) and forwards it as Websocket messages to clients.<br>
Clients connect to the server via browser and get templates served with express. At the musical performance pitchesets, graphical notation and musical directives where displayed to the performers <br><br>

<p align="center">
  <img width="40%" src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/setup.jpg"><br />
  __Figure.__ Basic technical setup of the scoring system.<br><br>
</p>



The basic design of the software comprises the following elements (see Figure):<br><br>
Sender (1): In case of Anna & Marie SuperCollider is used to send control messages. Alternatively any (musical) software that is capable of sending Open Sound Control (OSC) messages can be used.<br>
Host (2): The host was coded using the node.js framework. It translates incoming OSC messages to websocket (WS) messages and sends them to the connected clients. It utilizes the node-osc package to receive and process
OSC messages and the Sockets.io package to send websockets.<br>
Display (3): Any device that is capable of running a web browser can be used as a client. In the case of Anna&Marie, two iPads have been used.

### Host App
The Electron framework was used to develop the executable app and its GUI. It can be run either on the same computer that runs sound software, or on an independent machine.
A learn-function records all OSC messages and displays them in a list. This is believed to facilitate the process of configuration, if a renaming of the messages is sought.

<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/02%20Screenshots/interface-2.png" width="80%"  style="margin-left:10%;">

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
### Score Display
The display for the performers is shown in fullscreenmode on any web-browser. CSS styling creates a floating and centered GUI that is adaptive to different display sizes and resolutions. Vector graphics were programmed using the Snap.svg library [22] making the display independent of resolution and generative.

### Performance Situation
<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/DE-1.jpg" width="80%" style="margin-left:10%;">

<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/DE-2.jpg" width="80%"  style="margin-left:10%;">
 
