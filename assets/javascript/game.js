var words = ["HELLO", "APOLOGIZE", "YELLOW", "HELP", "PHOTOGRAPH" ]
  hit = false,
  i = 0,
  buttons = [],
  charCodeA = 65,
  charCodeZ = 90,
  disableInput = false,
  buttonContainer = document.getElementById('buttons'),
  livesContainer = document.getElementById('lives'),
  wordContainer = document.getElementById('word'),
  nextButton = document.getElementById('next');

function gameOver() {
 
  for (i = 0; i < length; i++) {
    if (letterSpan[i].innerHTML == "_") {
      letterSpan[i].innerHTML = word[i];
      letterSpan[i].className = "missing";
    }
  }
  
  disableInput = true
  document.getElementsByTagName("html")[0].className = "gameOver";
}

function processInput(character) {
  
  for (i = 0; i < length; i++) {
    if (word[i] == character) {
      letterSpan[i].innerHTML = character;
      hit = true;
    }
   
    if(letterSpan[i].innerHTML == "_"){
      finished = false;
    }
  }
  
  
  if (hit === true) {
    //Set hit back to false
    hit = false;
  } else {
    
    lives--;
    livesContainer.style.width = lives * 40 + "px";
    
   
    if (lives == 0) {
      gameOver();
    }
  }
  
  
  if(finished === true){
    document.getElementsByTagName("html")[0].className = "finished";
    disableInput = true;
  }else{
    finished = true;
  }
}

function echoButtons() {
  i = 0;
  
  for (var letter = charCodeA; letter <= charCodeZ; letter++) {
    
    buttons[i] = document.createElement("button");
    buttons[i].innerHTML = String.fromCharCode(letter);

    
    buttons[i].addEventListener("click", function() {
      if(disableInput === false){  
        if (this.className.indexOf("disabled") == -1) {
          processInput(this.innerHTML);
          this.className = "disabled";
        }
      }
    });

    
    buttonContainer.appendChild(buttons[i]);
    i++;
  }
}

function newWord() {
  selected = Math.floor(Math.random() * words.length);
  word = words[selected].split('');
  length = word.length;
  letterSpan = [];
  lives = 10;
  letterString = "";
  finished = true,
  disableInput = false;
  
  livesContainer.style.width = lives*40 +"px"
  wordContainer.innerHTML = "";
  document.getElementsByTagName("html")[0].className = "";
  
  
  for(i = 0; i <= 25; i++){
    buttons[i].className = "";
  }

  
  for (i = 0; i < length; i++) {
    letterSpan[i] = document.createElement("span");
    letterSpan[i].innerHTML = "_";
    wordContainer.appendChild(letterSpan[i]);
  }
}

nextButton.addEventListener("click", newWord);
echoButtons();
newWord();
