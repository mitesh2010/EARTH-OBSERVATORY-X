// stars in the background

const totalStars = 260;



for (let i = 0; i < totalStars; i++) {

    const star = document.createElement("div");

    star.classList.add("star");



    // make random sizes and spots

    const size = Math.random() * 3;

    star.style.width = `${size}px`;

    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;

    star.style.top = `${Math.random() * 100}%`;



    // speed changes

    star.style.animationDuration = `${2 + Math.random() * 5}s`;

    document.body.appendChild(star);

}





// screen elements and mode

const earth = document.getElementById("earth");

const earthContainer = document.getElementById("earthContainer");

const heatOverlay = document.getElementById("heatOverlay");



let currentMode = "climate";





// data for the buttons

const panelConfig = {

    climate: { title: "Climate Systems", data: ["GLOBAL TEMPERATURE", "14°C", "ACTIVE STORMS", "12", "SATELLITES ONLINE", "148"] },

    satellite: { title: "Satellite Network", data: ["SATELLITES ONLINE", "148", "ORBITAL NETWORKS", "12", "GLOBAL COVERAGE", "97%"] },

    storm: { title: "Storm Systems", data: ["WIND SPEED", "240 km/h", "PRESSURE", "972 hPa", "ALERT STATUS", "SEVERE"] },

    analytics: { title: "Global Analytics", data: ["CO₂ LEVEL", "421 ppm", "SEA LEVEL RISE", "3.4 mm", "HEAT ALERT", "HIGH"] }

};





function updatePanel(title, l1, v1, l2, v2, l3, v3) {

    document.getElementById("panelTitle").innerHTML = title;

    document.getElementById("label1").innerHTML = l1;

    document.getElementById("value1").innerHTML = v1;

    document.getElementById("label2").innerHTML = l2;

    document.getElementById("value2").innerHTML = v2;

    document.getElementById("label3").innerHTML = l3;

    document.getElementById("value3").innerHTML = v3;

}





function switchMode(mode) {

    currentMode = mode;

    const config = panelConfig[mode];



    // show red screen if analytics

    heatOverlay.style.opacity = (mode === "analytics") ? "1" : "0";



    // change texts

    updatePanel(config.title, ...config.data);



    // do lightning

    if (mode === "storm") spawnLightning();

}





// functions for buttons

function showClimate() { switchMode("climate"); }

function showSatellites() { switchMode("satellite"); }

function showStorms() { switchMode("storm"); }

function showAnalytics() { switchMode("analytics"); }





// satellite circles

const satelliteData = [

    { radius: 300, speed: 0.8, size: 10, offset: 0 },

    { radius: 350, speed: 1.1, size: 14, offset: 70 },

    { radius: 410, speed: 0.6, size: 9, offset: 140 },

    { radius: 460, speed: 1.3, size: 13, offset: 210 },

    { radius: 520, speed: 0.9, size: 11, offset: 290 }

];





satelliteData.forEach(data => {

    const sat = document.createElement("div");

    sat.classList.add("satellite");

    sat.style.width = `${data.size}px`;

    sat.style.height = `${data.size}px`;



    earthContainer.appendChild(sat);

    animateSatellite(sat, data);

});





function animateSatellite(sat, data) {

    let angle = data.offset;



    setInterval(() => {

        angle += data.speed;



        // math for circle movement

        const rad = angle * Math.PI / 180;

        const x = Math.cos(rad) * data.radius;

        const y = Math.sin(rad) * data.radius;



        // center position

        sat.style.left = `${350 + x}px`;

        sat.style.top = `${350 + y}px`;



        drawConnections();

    }, 16);

}





function drawConnections() {

    const svg = document.getElementById("connections");

    svg.innerHTML = ""; // clear old lines



    const satellites = document.querySelectorAll(".satellite");



    satellites.forEach(sat => {

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        const x1 = parseFloat(sat.style.left);

        const y1 = parseFloat(sat.style.top);



        line.setAttribute("x1", x1);

        line.setAttribute("y1", y1);

        line.setAttribute("x2", 350); // go to middle

        line.setAttribute("y2", 350);

        line.setAttribute("stroke", "rgba(120,220,255,0.25)");

        line.setAttribute("stroke-width", "1");



        svg.appendChild(line);

    });

}





// spin when dragging mouse

let isDragging = false;

let currentRotation = 0;

let velocity = 0;

let lastX = 0;





earth.addEventListener("mousedown", (e) => {

    isDragging = true;

    lastX = e.clientX;

});





window.addEventListener("mouseup", () => {

    isDragging = false;

});





window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;



    const delta = e.clientX - lastX;

    velocity = delta * 0.15;

    currentRotation += delta * 0.5;



    earth.style.transform = `rotate(${currentRotation}deg)`;

    lastX = e.clientX;

});





// loop to make it slow down slowly

function momentumLoop() {

    if (!isDragging) {

        currentRotation += velocity;

        velocity *= 0.97; // slow down factor

        earth.style.transform = `rotate(${currentRotation}deg)`;

    }

    requestAnimationFrame(momentumLoop);

}

momentumLoop();





// mouse enter zoom

earth.addEventListener("mouseenter", () => { earth.style.scale = "1.05"; });

earth.addEventListener("mouseleave", () => { earth.style.scale = "1"; });





// green radar thing

const blipsContainer = document.getElementById("blips");

let radarAngle = 0;





setInterval(() => {

    radarAngle += 6;

    if (radarAngle >= 360) radarAngle = 0;



    // random chance to make a dot

    if (Math.random() > 0.55) {

        createRadarBlip(radarAngle);

    }

}, 120);





function createRadarBlip(angle) {

    const radius = 50 + Math.random() * 90;

    const centerX = 140;

    const centerY = 140;



    const rad = angle * Math.PI / 180;

    const x = centerX + Math.cos(rad) * radius;

    const y = centerY + Math.sin(rad) * radius;



    const blip = document.createElement("div");

    blip.classList.add("blip");

    blip.style.left = `${x}px`;

    blip.style.top = `${y}px`;



    blipsContainer.appendChild(blip);



    // delete after 1 second

    setTimeout(() => {

        blip.remove();

    }, 1200);

}





function spawnLightning() {

    const flash = document.getElementById("lightning");

    flash.style.opacity = "0.7";

    setTimeout(() => {

        flash.style.opacity = "0";

    }, 120);

}





// random changing numbers

setInterval(() => {

    document.getElementById("oceanData").innerHTML = `${Math.floor(50 + Math.random() * 40)}%`;

    document.getElementById("cloudData").innerHTML = `${Math.floor(40 + Math.random() * 50)}%`;

    document.getElementById("pressureData").innerHTML = `${Math.floor(980 + Math.random() * 40)} hPa`;

}, 3000);





// start everything

showClimate();
