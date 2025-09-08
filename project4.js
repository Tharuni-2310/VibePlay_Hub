const outcome = document.getElementById('outcome');
const p1ScoreEl = document.getElementById('playerScore');
const p2ScoreEl = document.getElementById('computerScore');
const p1PickEl = document.getElementById('p1_pick');
const p2PickEl = document.getElementById('p2_pick');

let p1Pick = null;
let p2Pick = null;
let p1Score = 0;
let p2Score = 0;

function select(player, choice){
  if(player==='p1'){ p1Pick = choice; p1PickEl.textContent = `Pick: ${choice}`; }
  else { p2Pick = choice; p2PickEl.textContent = `Pick: ${choice}`; }
  outcome.textContent = 'Ready to reveal…';
}

function clearPicks(){
  p1Pick = null; p2Pick = null;
  p1PickEl.textContent = 'Pick: —';
  p2PickEl.textContent = 'Pick: —';
  outcome.textContent = '';
}

function reveal(){
  if(!p1Pick || !p2Pick){ outcome.textContent = 'Both players must pick.'; return; }
  if(p1Pick === p2Pick){ outcome.textContent = `Draw: both chose ${p1Pick}.`; return; }
  const beats = { Rock:'Scissor', Paper:'Rock', Scissor:'Paper' };
  if(beats[p1Pick] === p2Pick){
    p1Score++; p1ScoreEl.textContent = p1Score; outcome.textContent = `P1 wins! ${p1Pick} beats ${p2Pick}.`;
  } else {
    p2Score++; p2ScoreEl.textContent = p2Score; outcome.textContent = `P2 wins! ${p2Pick} beats ${p1Pick}.`;
  }
}