// -------------------------------------------------------------
// Anna & Marie
// Server for Score System
// to forward incoming OSC messages as websockets to webbrowsers
// V 0.9
// -------------------------------------------------------------
"use strict";

const exp = require("express")();

const { app, BrowserWindow } = require("electron");
const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const ip = require("ip");
const osc = require("node-osc");

const { ipcMain } = require("electron");

var rendererWin; // declare the renderer window as a global variable (to be able to communicate from everywhere)

const serverApp = express();
var serverPort = 3000;
var oscPort = 2346;

var clientCounter = 0;

// ---------------------------------------------------------------------------
// Set up OSC server to receive messages
// ---------------------------------------------------------------------------

var oscServer = new osc.Server(oscPort);

oscServer.on("message", function (msg, rinfo) {
  // Process incoming local OSC messages
  oscSend(msg[0], msg[1], msg[2], msg[3], msg[4]);
  rendererWin.webContents.send("oscReceive", msg[0], msg[1], msg[2], msg[3]);
  console.log(
    "OSC message came in! Message: " +
      msg[0] +
      ", Parameters: " +
      msg[1] +
      msg[2] +
      msg[3]
  );
});

function oscSend(mes, param1, param2, param3, param4) {
  // Forward websocket to tablet-receivers

  var messObject = {
    // store the data in an JSON Object
    message: mes,
    parameter1: param1,
    parameter2: param2,
    parameter3: param3,
    parameter4: param4,
  };
  var stringJSON = JSON.stringify(messObject);
  wss.clients.forEach(function each(client) {
    //client.send(message,param1,param2);
    client.send(stringJSON);
  });
  console.log("Forwarded an OSC message as Websocket");
}

// ---------------------------------------------------------------------------
// Set up Express Server for delivering HTML
// ---------------------------------------------------------------------------

const server = http.createServer(serverApp);
serverApp.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
  console.log("delivered HTML");
});

server.listen(serverPort, function () {
  // After server was started, send general information to console
  console.log("Server running:");
  console.log("IP: " + ip.address());
  console.log("Port (Out): " + serverPort);
  console.log("OSCPort (In): " + oscPort);
  console.log("");
});
serverApp.use(express.static(__dirname + "/public"));

// ---------------------------------------------------------------------------
// Set up a WS Server for Websocket Communication
// ---------------------------------------------------------------------------

const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws) {
  clientCounter++;
  ws.id = clientCounter;
  ws.send(ws.id);
  console.log("A new client connected! ID: " + ws.id);
  rendererWin.webContents.send("clientConnect", clientCounter);

  ws.on("close", function close() {
    console.log("disconnected");
    clientCounter--;
    rendererWin.webContents.send("clientConnect", clientCounter);
  });
});

function createWindow() {
  rendererWin = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: { nodeIntegration: true },
  }); // Erstelle das Browser-Fenster.
  rendererWin.loadFile("render/index.html"); // und lade die index.html der App.
}
app.on("ready", createWindow);

// ---------------------------------------------------------------------------
// Communication with GUI
// ---------------------------------------------------------------------------

ipcMain.on("requestConnectionData", function (event, arg) {
  var args = {
    ip: ip.address(),
    serverport: serverPort,
    oscport: oscPort,
  };
  rendererWin.webContents.send("connectionData", args);
  console.log("Config Data requested");
});
