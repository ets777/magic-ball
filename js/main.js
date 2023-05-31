import App from '../node_modules/etsbox-canvas-lib/src/App.js';

const config = {
    canvasId: 'app',
    width: 800,
    height: 800,
    backgroundColor: 'white'
}
const app = new App(config);
const context = app.context;
const circleCenterX = app.width / 2;
const circleCenterY = app.height / 2;
const circleRadius = app.width * .44;

context.textAlign = 'center';
context.font = '20px arial';

const textArray = [
    'Возможно',
    'Да',
    'Нет',
    'Спроси позже',
    'Даже не надейся',
    'Определённо да',
    '50 / 50',
    'Всё зависит от тебя',
    'А смысл?',
    'Точно да',
    'Точно нет',
];
let i = 0;

function drawBall() {
    app.clearBoard();

    let gradient;

    gradient = context.createRadialGradient(
        circleCenterX, 
        circleCenterY, 
        circleRadius, 
        circleCenterX, 
        circleCenterY / 4, 
        10);
    gradient.addColorStop(0, '#555555');
    gradient.addColorStop(.2, '#000000');
    gradient.addColorStop(.5, '#000000');
    gradient.addColorStop(1, '#ffffff');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(circleCenterX, circleCenterY, circleRadius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    gradient = context.createRadialGradient(
        circleCenterX, 
        circleCenterY, 
        circleRadius / 2 + 100, 
        circleCenterX, 
        circleCenterY - 100, 
        10);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(.5, '#000000');
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(circleCenterX, circleCenterY, circleRadius / 2, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.lineWidth = 15;
    context.strokeStyle = gradient;
    context.stroke();

    let angle = 60;
    let triangleRadius = circleRadius / 2 - 20;

    context.beginPath();
    context.moveTo(
        circleCenterX - triangleRadius * Math.sin(angle * Math.PI / 180), 
        circleCenterY - triangleRadius * Math.cos(angle * Math.PI / 180));
    angle += 120;
    context.lineTo(
        circleCenterX - triangleRadius * Math.sin(angle * Math.PI / 180), 
        circleCenterY - triangleRadius * Math.cos(angle * Math.PI / 180));
    angle += 120;
    context.lineTo(
        circleCenterX - triangleRadius * Math.sin(angle * Math.PI / 180), 
        circleCenterY - triangleRadius * Math.cos(angle * Math.PI / 180));
    context.closePath();
    context.fillStyle = '#0000aa';
    context.fill();

    drawText();

    function drawText() {
        fitFont(20, textArray[i]);
        context.fillStyle = '#aaaaff';
        context.fillText(textArray[i], app.width / 2, app.height / 2 + 10);
    }

    function fitFont(fontSize, text) {
        let width = Math.ceil(context.measureText(text).width);

        console.log(fontSize, width)

        if (width < 80) {
            while(width < 80) {
                width = Math.ceil(context.measureText(text).width)
                fontSize++;
                context.font = `${fontSize}px arial`;
            }
        } else {
            while(width > 150) {
                width = Math.ceil(context.measureText(text).width)
                fontSize--;
                context.font = `${fontSize}px arial`;
            }
        }
    }
}

document.addEventListener('click', e => {
    const cursorX = e.offsetX;
    const cursorY = e.offsetY;
    const dx = Math.abs(cursorX - circleCenterX);
    const dy = Math.abs(cursorY - circleCenterY);
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (distance <= circleRadius) {
        i = Math.floor(Math.random() * textArray.length);

        drawBall();
    }
});

drawBall();