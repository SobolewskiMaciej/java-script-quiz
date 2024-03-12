// Variables
var startScreenSection = document.getElementById("start-screen");
var startButton = document.getElementById("start");
var timerOnDisplay = document.getElementById("time");
var questionsSection = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var questionChoices = document.getElementById("choices");
var endScreenSection = document.getElementById("end-screen");
var feedbackSection = document.getElementById("feedback");
var submitButton = document.getElementById("submit");
var initialsInputText = document.getElementById("initials");
var finalScoreTextSection = document.getElementById("final-score");
var timerCount = 75;
var timer;
var currentQuestionIndex = 0;

// Functions
function startQuiz() {
    startScreenSection.classList.add("hide");
    questionsSection.classList.remove("hide");
    displayQuestion();
  
    // Start the timer
    timer = setInterval(function() {
      timerCount--;
      timerOnDisplay.textContent = timerCount;
  
      if (timerCount <= 0) {
        endQuiz();
      }
    }, 1000); // Update timer every second
  }

  function displayQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    questionChoices.innerHTML = "";
  
    currentQuestion.choices.forEach(function(choice) {
      var choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", function() {
        if (choice === currentQuestion.answer) {
          feedbackSection.textContent = "Correct!";
          correctSound.play(); // Play correct sound
        } else {
          feedbackSection.textContent = "Wrong! The correct answer is: " + currentQuestion.answer;
          wrongSound.play();
  
          // Deduct 10 seconds for a wrong answer
          timerCount -= 10;
          if (timerCount < 0) {
            timerCount = 0; // Ensure timer doesn't go negative
          }
          timerOnDisplay.textContent = timerCount;
        }
  
        feedbackSection.classList.remove("hide");
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          displayQuestion();
        } else {
          endQuiz();
        }
      });
      questionChoices.appendChild(choiceButton);
    });
  }

  function endQuiz() {
    clearInterval(timer); // Stop the timer
    questionsSection.classList.add("hide");
    endScreenSection.classList.remove("hide");
    finalScoreTextSection.textContent = timerCount;
  }

  // Load sound files
var correctSound = new Audio("assets/sfx/correct.wav");
var wrongSound = new Audio("assets/sfx/incorrect.wav");

// Event listener for the start button
startButton.addEventListener("click", function() {
    startQuiz();
  });
  
  // Event listener for the submit button
  submitButton.addEventListener("click", function(event) {
    // Get the initials and score values from the input fields
    var initials = initialsInputText.value;
    var score = finalScoreTextSection.textContent;
  
    // Check if initials and score are not empty
    if (initials && score) {
      // Generate a unique key for each game data
      var gameKey = "gameData_" + Date.now();
  
      // Create an object with initials and score
      var data = {
        initials: initials,
        score: score,
      };
  
      initialsInputText.value = "";
  
      // Store the data object in local storage with the unique key
      localStorage.setItem(gameKey, JSON.stringify(data));
  
      // Redirect to highscores.html
      window.location.href = "highscores.html";
  
      // Retrieve the data from local storage to verify it was stored correctly
      var retrievedData = JSON.parse(localStorage.getItem(gameKey));
      console.log(retrievedData);
    } else {
      console.log("Please enter initials and score");
    }
  });
