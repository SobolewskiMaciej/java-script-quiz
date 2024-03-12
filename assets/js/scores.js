document.addEventListener("DOMContentLoaded", function() {
    var highscoresList = document.getElementById("highscores");
  
    // Retrieve the data from local storage
    var keys = Object.keys(localStorage);
    var gameData = [];
  
    // Iterate over the keys in local storage and filter out game data
    keys.forEach(function(key) {
      if (key.startsWith("gameData_")) {
        var data = JSON.parse(localStorage.getItem(key));
  
        // Check if the data contains a score before adding to gameData array
        if (data.score) {
          gameData.push(data);
        }
      }
    });
  
    // Sort the game data by score in descending order
    gameData.sort(function(a, b) {
      var scoreA = parseInt(a.score.match(/\d+/)[0]); // Extract numeric score from string
      var scoreB = parseInt(b.score.match(/\d+/)[0]); // Extract numeric score from string
      return scoreB - scoreA; // Compare numeric scores for sorting
    });
  
    // Populate the highscores list with the sorted game data
    gameData.forEach(function(data) {
      var listItem = document.createElement("li");
      // Display the score value only
      listItem.textContent = "Quiz completed! Your final score is: " + data.score;
      highscoresList.appendChild(listItem);
    });
  
    // Event listener to clear highscores
    var clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function() {
      localStorage.clear(); // Clear all data in local storage
      highscoresList.innerHTML = ""; // Clear the list displayed on the screen
    });
  });