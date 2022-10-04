'use strict';

// Score elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

// Dice element
const diceEl = document.querySelector('.dice');

// Button elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Current score elements
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

// Player elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

let scores, playing, currentScore, activePlayer;

const init = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  currentScore = 0;
  scores[0] = scores[1] = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  activePlayer = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;
    // Check for rolled 1
    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
