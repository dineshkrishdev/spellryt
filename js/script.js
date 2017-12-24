var app = document.getElementById('heading');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter
    .typeString('right')
    .deleteChars(4)
    .typeString('yt')
    .pauseFor(2500)
    .start();

function getStarted() {

    
}