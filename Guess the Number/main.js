console.log(document.querySelector('.message').textContent);

//document.querySelector('.message').textContent = 'Correct!';

//document.querySelector('.number').textContent = 13;
//document.querySelector('.score').textContent = 20;

//document.querySelector('.guess').value = 10;

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function(e) {
    const guess = Number(document.querySelector('.guess').value);

    // when no input
    if (!guess) {
        displayMessage('Enter a number...');
        
        // when guess is correct player wins
    } else if (guess === number) {
        displayMessage('Correct!');

        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '30rem';

        document.querySelector('.number').textContent = number;

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

        // when guess is wrong
    } else if (guess !== number) {
        if (score > 1) {
            if (guess > number) {
                displayMessage('Too high!');
            } else {
                displayMessage('Too low!');
            }
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    }
});

document.querySelector('.again').addEventListener('click', function(e) {
    number = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#222';
});