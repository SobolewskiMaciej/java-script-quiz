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