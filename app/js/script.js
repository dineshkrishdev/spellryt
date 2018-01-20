var wordList = new Array();
var current;
var randomIndex;
var repeatCount = 0;

app.controller('prepare', function($location, $http) {
    
    var selected = $location.search().data;

    $http.get("/spellryt/app/resources/"+selected+".json")
        .then(function(response) {
            var words = response.data.words;
            words.forEach(element => {
                var obj = new Object();
                obj.word = element;
                obj.status = false;
                wordList.push(obj);
            });
    });
    console.log(wordList);
});

function getRandomWord() {

    wordList = wordList.filter(isDone);
    randomIndex = (Math.floor(Math.random() * wordList.length));
    current = wordList[randomIndex];

    console.log("Current Word is : "+current.word);

    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2];
    msg.rate = 10 / 10;
    msg.pitch = 1;
    msg.text = current.word;
    msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    speechSynthesis.speak(msg);
}

function repeat() {
    console.log("current word is : "+current.word);

    if(repeatCount >= 3) {
        Materialize.toast('You have reached maximum limit!', 2000);
        return;
    }

    repeatCount++;
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2];
    msg.rate = 10 / 10;
    msg.pitch = 1;
    msg.text = current.word;
    msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    speechSynthesis.speak(msg);
}

function makeDone() {
    wordList[randomIndex].status = true;
}

function isDone(obj) {
    return obj.status == false;
}