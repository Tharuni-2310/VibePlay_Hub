const minnum = 1;
const maxnum = 100;
let answer = Math.floor(Math.random()*(maxnum-minnum+1)) + minnum;
let attempts = 0;

const input = document.getElementById('guess');
const submit = document.getElementById('submit');
const feedback = document.getElementById('feedback');
const attemptsEl = document.getElementById('attempts');
const restart = document.getElementById('restart');

function reset(){
  answer = Math.floor(Math.random()*(maxnum-minnum+1)) + minnum;
  attempts = 0;
  input.value = '';
  feedback.textContent = '';
  attemptsEl.textContent = 'Attempts: 0';
  restart.classList.add('hidden');
}

submit.addEventListener('click', ()=>{
  const guess = Number(input.value);
  if(!Number.isFinite(guess)) { feedback.textContent = 'Enter a valid number.'; return; }
  if(guess<minnum || guess>maxnum) { feedback.textContent = 'Out of range.'; return; }
  attempts++;
  attemptsEl.textContent = `Attempts: ${attempts}`;
  if(guess<answer) feedback.textContent = 'Too low. Try again!';
  else if(guess>answer) feedback.textContent = 'Too high. Try again!';
  else { feedback.textContent = `Correct! The answer was ${answer}.`; restart.classList.remove('hidden'); }
});

restart.addEventListener('click', reset);

reset();