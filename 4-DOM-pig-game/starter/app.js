/*
import * as console from 'console';
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variable declaration
var scores, roundScore, activePlayer, gamePlaying;

// when the game start the gamePlaying value is TRUE

init();

// VARIABLE DEFINITION
// this variable keeps track of both players score
scores = [0,0];

roundScore = 0;
activePlayer = 0;


// Set the text content
// document.querySelector('#current-' + activePlayer).textContent = dice;



// ROLL DICE button Listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    // the gamePlaying var is alreay declared to TRUE so we do not need other conditions
    if (gamePlaying) {

        // 1. Random number
        
        // Math.floor transform a decimal to an integer
        // (Math.random() * 6) gives us numbers between 0 and 5, so we add 1 to generate a value between 1 and 6 
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        // we use the .src() method because the .dice class is an IMG html tag
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // ELSE IF the rolled number was a 1, next player turn
            nextPlayer();
        
        }

    } // closing IF (gamePlaying) {}
});

// HOLD button listener
document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // add  CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            
            document.querySelector('.player-' + activePlayer +  '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer +  '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;

        } else {
            // next player turn
            nextPlayer();
        }
    }
    

});

function nextPlayer() {
    // if activePlayer === 0 makes it equal to 1 otherwise equal to 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    // update the CURRENT score box
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// Start a new game
document.querySelector('.btn-new').addEventListener('click',function() {
    init();
});

// init() function
function init() {
    // reset player total score, activePlayer and roundScore
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    // hide the Dice image
    document.querySelector('.dice').style.display = 'none';

    // set total score and current score box to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/