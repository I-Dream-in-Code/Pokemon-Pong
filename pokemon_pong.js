var badge_counter = 0;
var badge_array = ["", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];


function gameOver() {
    if (counter > highScore) {
        badge_counter += 1
        if (badge_counter == 7) {
            badge_counter = 7;
        }
        alert("YOU'VE EARNED A NEW GYM BADGE!");
        document.getElementById("badge").src = badge_array[badge_counter];
        highScore = counter;
        document.getElementById("highScore").innerHTML = highScore
        Dx = Dx * -1;
        Cx = Cx + canvas.width / 2;
    } else {
        if (counter < highScore) {
            alert("PIKACHU FAINTED! \n Level up your pokemon to try again!")
            badge_counter = badge_counter - 1;
            if (badge_counter <= 0) {
                badge_counter = 0;
            }
            document.getElementById("badge").src = badge_array[badge_counter];
        }
        Dx = Dx * -1;
        Cx = Cx + canvas.width / 2;
    }
    counter = 0;
    document.getElementById("hitCounter").innerHTML = counter;
}

var counter = 0
var highScore = 0;
var canvas;
var ctx;
var Cx = 400;
var Cy = 250;
var paddleY;
var gameOverCounter = 0;


window.onload = function() {
    canvas = document.getElementById("myCanvas");
    paddleY = 70;
    ctx = canvas.getContext("2d");
    document.addEventListener("mousemove", mouseMove, false);
    localStorage.setItem("highscore", 0);
    localStorage.setItem("gameOver", 0);
    setInterval(show, 10);
    myAudio = new Audio('song.mp3');
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();
}


var barY = 190;
var x = 30;
var Dx = 2;
var Dy = 2;

counter = 0;

function setupBackground() {
    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, 0, 600, 600);
    }
    image.src = "pallet_town.png";
}

function clearCanvas() {
    canvas.width = canvas.width
    setupBackground();
    if (Cx + 20 >= canvas.width)
        Dx = Dx * -1;


    if (Cx <= 0) {
        gameOver();

    }

    if (Cy + 20 >= canvas.height)
        Dy = Dy * -1;

    if (Cy - 20 >= canvas.height)
        Dy = Dy * -1;


    if (Cy - 20 <= 0)
        Dy = Dy * -1;
    if (Cx > 90 && Cx < 100 && (Cy > paddleY && Cy < paddleY + 100)) {
        counter++
        document.getElementById("hitCounter").innerHTML = counter;
        Dx = Dx * -1;
    }
}

function show() {

    clearCanvas();
    drawPokeBall();
    drawPikachu();


}

function mouseMove(e) {
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 70 && relativeY < canvas.height) {
        paddleY = relativeY - 70;
    }
}

function drawPokeBall() {
    var x = Cx + Dx;
    var y = Cy + Dy;
    Cx = x;
    Cy = y;
    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, x, y, 50, 50);
    }
    image.src = "Pokeball.png";
}

function drawPikachu() {
    var c = document.getElementById("MyCanvas");
    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, x, paddleY, 100, 100);
    }
    image.src = "pikachu_run_right.png";
}
