/* STARS */

for(let i=0;i<260;i++){

const star =
document.createElement("div");

star.classList.add("star");

star.style.width =
Math.random()*3 + "px";

star.style.height =
star.style.width;

star.style.left =
Math.random()*100 + "%";

star.style.top =
Math.random()*100 + "%";

star.style.animationDuration =
2 + Math.random()*5 + "s";

document.body.appendChild(star);

}

/* EARTH */

const earth =
document.getElementById("earth");

const earthContainer =
document.getElementById(
"earthContainer"
);

/* MODES */

let currentMode =
"climate";

function showClimate(){

currentMode =
"climate";

document.getElementById(
"heatOverlay"
).style.opacity =
"0";

updatePanel(
"Climate Systems",
"GLOBAL TEMPERATURE",
"14°C",
"ACTIVE STORMS",
"12",
"SATELLITES ONLINE",
"148"
);

}

function showSatellites(){

currentMode =
"satellite";

document.getElementById(
"heatOverlay"
).style.opacity =
"0";

updatePanel(
"Satellite Network",
"SATELLITES ONLINE",
"148",
"ORBITAL NETWORKS",
"12",
"GLOBAL COVERAGE",
"97%"
);

}

function showStorms(){

currentMode =
"storm";

document.getElementById(
"heatOverlay"
).style.opacity =
"0";

updatePanel(
"Storm Systems",
"WIND SPEED",
"240 km/h",
"PRESSURE",
"972 hPa",
"ALERT STATUS",
"SEVERE"
);

spawnLightning();

}

function showAnalytics(){

currentMode =
"analytics";

document.getElementById(
"heatOverlay"
).style.opacity =
"1";

updatePanel(
"Global Analytics",
"CO₂ LEVEL",
"421 ppm",
"SEA LEVEL RISE",
"3.4 mm",
"HEAT ALERT",
"HIGH"
);

}

/* PANEL */

function updatePanel(
title,
label1,
value1,
label2,
value2,
label3,
value3
){

document.getElementById(
"panelTitle"
).innerHTML =
title;

document.getElementById(
"label1"
).innerHTML =
label1;

document.getElementById(
"value1"
).innerHTML =
value1;

document.getElementById(
"label2"
).innerHTML =
label2;

document.getElementById(
"value2"
).innerHTML =
value2;

document.getElementById(
"label3"
).innerHTML =
label3;

document.getElementById(
"value3"
).innerHTML =
value3;

}

/* SATELLITES */

const satelliteData = [

{
radius:300,
speed:0.8,
size:10,
offset:0
},

{
radius:350,
speed:1.1,
size:14,
offset:70
},

{
radius:410,
speed:0.6,
size:9,
offset:140
},

{
radius:460,
speed:1.3,
size:13,
offset:210
},

{
radius:520,
speed:0.9,
size:11,
offset:290
}

];

satelliteData.forEach((data)=>{

const satellite =
document.createElement("div");

satellite.classList.add(
"satellite"
);

satellite.style.width =
data.size + "px";

satellite.style.height =
data.size + "px";

earthContainer.appendChild(
satellite
);

animateSatellite(
satellite,
data
);

});

function animateSatellite(
satellite,
data
){

let angle =
data.offset;

setInterval(()=>{

angle += data.speed;

const x =
Math.cos(
angle * Math.PI/180
)
* data.radius;

const y =
Math.sin(
angle * Math.PI/180
)
* data.radius;

satellite.style.left =
350 + x + "px";

satellite.style.top =
350 + y + "px";

drawConnections();

},16);

}

/* CONNECTIONS */

function drawConnections(){

const svg =
document.getElementById(
"connections"
);

svg.innerHTML = "";

const satellites =
document.querySelectorAll(
".satellite"
);

satellites.forEach((sat)=>{

const line =
document.createElementNS(
"http://www.w3.org/2000/svg",
"line"
);

const x1 =
parseFloat(
sat.style.left
);

const y1 =
parseFloat(
sat.style.top
);

line.setAttribute(
"x1",
x1
);

line.setAttribute(
"y1",
y1
);

line.setAttribute(
"x2",
350
);

line.setAttribute(
"y2",
350
);

line.setAttribute(
"stroke",
"rgba(120,220,255,0.25)"
);

line.setAttribute(
"stroke-width",
"1"
);

svg.appendChild(
line
);

});

}

/* EARTH ROTATION */

let isDragging = false;

let currentRotation = 0;

let velocity = 0;

let lastX = 0;

earth.addEventListener(
"mousedown",
(e)=>{

isDragging = true;

lastX = e.clientX;

}
);

window.addEventListener(
"mouseup",
()=>{

isDragging = false;

}
);

window.addEventListener(
"mousemove",
(e)=>{

if(!isDragging) return;

const delta =
e.clientX - lastX;

velocity = delta * 0.15;

currentRotation += delta * 0.5;

earth.style.transform =
`rotate(${currentRotation}deg)`;

lastX = e.clientX;

}
);

function momentumLoop(){

if(!isDragging){

currentRotation += velocity;

velocity *= 0.97;

earth.style.transform =
`rotate(${currentRotation}deg)`;

}

requestAnimationFrame(
momentumLoop
);

}

momentumLoop();

/* ZOOM */

earth.addEventListener(
"mouseenter",
()=>{

earth.style.scale =
"1.05";

}
);

earth.addEventListener(
"mouseleave",
()=>{

earth.style.scale =
"1";

}
);

/* RADAR */

const blips =
document.getElementById(
"blips"
);

let radarAngle = 0;

setInterval(()=>{

radarAngle += 6;

if(radarAngle >= 360){

radarAngle = 0;

}

if(Math.random() > 0.55){

createRadarBlip(
radarAngle
);

}

},120);

function createRadarBlip(
angle
){

const radius =
50 + Math.random()*90;

const centerX = 140;

const centerY = 140;

const rad =
angle * Math.PI / 180;

const x =
centerX +
Math.cos(rad) * radius;

const y =
centerY +
Math.sin(rad) * radius;

const blip =
document.createElement("div");

blip.classList.add(
"blip"
);

blip.style.left =
x + "px";

blip.style.top =
y + "px";

blips.appendChild(
blip
);

setTimeout(()=>{

blip.remove();

},1200);

}

/* LIGHTNING */

function spawnLightning(){

const lightning =
document.getElementById(
"lightning"
);

lightning.style.opacity =
"0.7";

setTimeout(()=>{

lightning.style.opacity =
"0";

},120);

}

/* LIVE STATUS */

setInterval(()=>{

document.getElementById(
"oceanData"
).innerHTML =
Math.floor(
50 + Math.random()*40
) + "%";

document.getElementById(
"cloudData"
).innerHTML =
Math.floor(
40 + Math.random()*50
) + "%";

document.getElementById(
"pressureData"
).innerHTML =
Math.floor(
980 + Math.random()*40
) + " hPa";

},3000);

showClimate();
