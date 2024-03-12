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