# Real-time Scoresystem for "Anna & Marie"
Software to display pitchsets and notation symbols on a tablet. <br>
First used at Donaueschinger Musiktage 2019 in the Concert Installation ›Anna&Marie‹ by Marko Ciciliani. It originates from
the artistic research project [GAPPP](http://gappp.net/) (Gamified Audiovisual Performance and Performance Practice).

### Technology
A Node.js server is established. It listenes OSC messages (e.g. from SuperCollider) and forwards it as Websocket messages to clients.<br>
Clients connect to the server and get templates served with express. At the musical performance pitchesets, graphical notation and musical directives where displayed to the performers <br><br>

<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/setup.jpg" width="60%"  style="margin-left:20%">
__Figure.__ Basic technical setup of the scoring system.

### Host App
<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/02%20Screenshots/interface-2.png" width="80%"  style="margin-left:10%;">

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

### Performance Situation
<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/DE-1.jpg" width="80%" style="margin-left:10%;">

<img src="https://github.com/asa-nerd/Anna-und-Marie/blob/master/documentation/01%20Live/DE-2.jpg" width="80%"  style="margin-left:10%;">
 
