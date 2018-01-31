var wordList = new Array();
var current;
var randomIndex;
var repeatCount = 0;

var letters

app.controller('prepare', function($location, $http) {
    var selected = $location.search().letter;
    var type = $location.search().type;
    if(type == "letter") {
        wordList = [];
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
    } else if(type == "random") {
        wordList = [];
        for(var i = 97; i < 123; i++) {
            var ch = String.fromCharCode(i);
            $http.get("/spellryt/app/resources/"+ch+".json")
            .then(function(response) {
                var words = response.data.words;
                words.forEach(element => {
                    var obj = new Object(); 
                    obj.word = element;
                    obj.status = false;
                    wordList.push(obj);
                });
            });
        }
    } else if(type == "custom") {
        wordList = [];
        var words = customWords;
        words.forEach(element => {
            var obj = new Object(); 
            obj.word = element;
            obj.status = false;
            wordList.push(obj);
        });
    }
    console.log(wordList);
});

app.controller('prepareSettings', function($location, $http) {
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = function() {
          var $voicelist = $('#voices');
          if($voicelist.find('option').length == 0) {
            speechSynthesis.getVoices().forEach(function(voice, index) {
              var $option = $('<option>')
              .val(index)
              .html(voice.name + (voice.default ? ' (default)' :''));

              $voicelist.append($option);
            });
            $voicelist.material_select();
          }
        }
        $('#testVoice').click(function(){
          var text = $('#message').val();
          var msg = new SpeechSynthesisUtterance();
          var voices = window.speechSynthesis.getVoices();
          msg.voice = voices[$('#voices').val()];
          msg.rate = $('#rate').val() / 10;
          msg.pitch = $('#pitch').val();
          msg.text = text;

          msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
          };
          speechSynthesis.speak(msg);
        })
      } else {
            $('#modal1').openModal();
      }
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
    repeatCount = 0;
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