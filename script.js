const number = document.getElementById("initial__number_modifier__number");
const initialCanvas = document.getElementById("initial__roulette");
const option = document.getElementById("initial__option");
const srcBtn = document.getElementById("initial__finish");

const resultCanvas = document.getElementById("rolling__roulette");
const screen = document.getElementById("rolling");
const rollBtn = document.getElementById("rolling__roll");
const closeBtn = document.getElementById("rolling__close");

let n = parseInt(number.value);

function setRandomAngle() {
    const rn = 36000 + 3600 * Math.random();
    document.documentElement.style.setProperty("--rotating-angle", `${rn}deg`);
}

srcBtn.onclick = () => {
    draw(resultCanvas, n);
    screen.style.visibility = "visible";
    document.querySelector("body").style.backgroundColor = "rgba(32, 43, 56, 0.8)";
}

rollBtn.onclick = () => {
    setRandomAngle();
    resultCanvas.classList.remove("roll");
    void resultCanvas.offsetWidth;
    resultCanvas.classList.add("roll");
}

closeBtn.onclick = () => {
    resultCanvas.classList.remove("roll");
    screen.style.visibility = "hidden";
    document.querySelector("body").style.backgroundColor = "rgb(32, 43, 56)";
}

function modifyOption(n) {
    while (option.firstChild) {
        option.removeChild(option.firstChild);
    }
    for (let i = 0; i < n; i++) {
        const input = document.createElement("input");
        input.setAttribute("value", i + 1);
        option.appendChild(input);
    }
}

function extractOptionValue() {
    const nodes = option.childNodes;
    let texts = [];
    nodes.forEach((e) => {
        texts.push(e.value);
    })
    return texts;
}

function draw(canvas, n) {
    const ctx = canvas.getContext('2d');
    const geom = {
        "initial": {
            x: 100,
            y: 100,
            radius: 100,
            statrAngle: 0,
            endAngle: Math.PI * 2,
            anticlockwise: false
        },
        "rolling": {
            x: 150,
            y: 150,
            radius: 150,
            statrAngle: 0,
            endAngle: Math.PI * 2,
            anticlockwise: false
        }
    };
    const colors = ['#93DAFF', '#00BFFF', '#1E90FF', '#96A5FF', '#6495ED', '#0064CD', '#5A5AFF', '#7B68EE', '#483D8B', '#6A5ACD']
    const texts = extractOptionValue();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoulette(ctx, n, geom[canvas.parentNode.id], colors, texts);
}

function drawRoulette(ctx, n, geom, colors, texts) {
    const eachAngle = Math.PI * 2 / n;
    const textAngle = eachAngle / 2;
    for (let i = 0; i <= n; i++) {
        ctx.beginPath();
        ctx.arc(geom.x, geom.y, geom.radius, i * eachAngle, i * eachAngle + eachAngle, geom.anticlockwise);
        ctx.lineTo(geom.x, geom.y);
        ctx.closePath();
        ctx.fillStyle = colors[i - 1];
        //ctx.fillText('Hello', geom.x + (50 * Math.cos(i * eachAngle + textAngle)), geom.y + (50 * Math.sin(i * eachAngle + textAngle)));
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(texts[i - 1], geom.x + (geom.radius * 6 / 10 * Math.cos(i * eachAngle + textAngle)), geom.y + (geom.radius * 6 / 10 * Math.sin(i * eachAngle + textAngle)));
        ctx.stroke();
    }
}

function plusNumber() {
    if (n >= 10) return;
    n = n + 1
    number.value = n;
    modifyOption(n);
    draw(initialCanvas, n);
}

function minusNumber() {
    if (n <= 2) return;
    n = n - 1
    number.value = n;
    modifyOption(n);
    draw(initialCanvas, n);
}

function changeNumber() {
    n = number.value;
    if (n >= 2 && n <= 10) {
        modifyOption(n);
        draw(initialCanvas, n);
    }
}

function init() {
    modifyOption(n);
    draw(initialCanvas, n);
}

init();