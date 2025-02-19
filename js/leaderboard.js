// Function to save a new score to localStorage
function saveScore(newScore) {
    // Retrieve the existing leaderboard from localStorage or initialize as an empty array
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
    // Ensure that the newScore is a valid number
    if (typeof newScore !== 'number' || isNaN(newScore)) {
      console.error("Invalid score: ", newScore);
      return;  // Prevent saving invalid data
    }
  
    // Add the new score to the leaderboard
    if(newScore > 0 )
      leaderboard.push(newScore);
  
    // Sort the leaderboard in descending order (highest score first)
    leaderboard.sort((a, b) => b - a);
  
    // Limit the leaderboard to the top 5 scores
    if (leaderboard.length > 5) {
      leaderboard = leaderboard.slice(0, 5);
    }
  
    // Save the updated leaderboard back to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  
    // After saving, display the updated leaderboard
    displayLeaderboard();
  }
  
  // Function to display the leaderboard from localStorage
  function displayLeaderboard() {
    // Retrieve the leaderboard from localStorage (default to an empty array if none exists)
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
    // Get the leaderboard container where the scores will be displayed
    const leaderboardContainer = document.getElementById("leaderboard-numbers");
    
    // Clear any existing content in the leaderboard container
    leaderboardContainer.innerHTML = "";
  
    // Check if the leaderboard is empty
    if (leaderboard.length === 0) {
      leaderboardContainer.innerHTML = "<p>No scores yet!</p>";
    } else {
      // Loop through the leaderboard and display the scores
      leaderboard.forEach((score, index) => {
        const scoreElement = document.createElement("div");
        scoreElement.textContent = `#${index + 1} - ${score} points`;
        leaderboardContainer.appendChild(scoreElement);
      });
    }
  }
  
  // Function to reset the leaderboard
  function resetLeaderboard() {
    // Clear the leaderboard data in localStorage
    localStorage.removeItem('leaderboard');
    
    // Clear the displayed leaderboard
    const leaderboardContainer = document.getElementById("leaderboard-numbers");
    leaderboardContainer.innerHTML = "<p>No scores yet!</p>"; // Show a message when empty
    
    console.log("Leaderboard reset!");
  }
  
  function gameOver(score) {
    const splash = document.getElementById("splash");

    showFullArtPopup(splash.src, false);
    saveScore(score);
    resetMult();
    // alert("Game Over!");
    displayLeaderboard();
    clearResult();
    startNewGame();
  }
  