
let currentRound = 1;
let rolled = { p1:false, p2:false };
let totals = { p1:0, p2:0 };
let scores = { p1:0, p2:0 };

function rollDice(player){
  const noofDice = parseInt(document.getElementById('noofDice').value, 10) || 1;
  const nodice = document.getElementById(`nodice_${player}`);
  const noimage = document.getElementById(`noimage_${player}`);
  const totalEl = document.getElementById(`total_${player}`);
  const values = [];
  const images = [];
  for(let i=0;i<noofDice;i++){
    const value = Math.floor(Math.random()*6)+1;
    values.push(value);
    images.push(`<img src="images/${value}.png" alt="dice ${value}">`);
  }
  const total = values.reduce((a,b)=>a+b,0);
  totals[player] = total;
  nodice.textContent = `dice: ${values.join(', ')}`;
  noimage.innerHTML = images.join('');
  totalEl.textContent = String(total);
  rolled[player] = true;
  maybeScore();
}

function maybeScore(){
  if(rolled.p1 && rolled.p2){
    if(totals.p1 > totals.p2) scores.p1++;
    else if(totals.p2 > totals.p1) scores.p2++;
    document.getElementById('score_p1').textContent = String(scores.p1);
    document.getElementById('score_p2').textContent = String(scores.p2);
  }
}

function nextRound(){
  if(!(rolled.p1 && rolled.p2)) return;
  currentRound++;
  document.getElementById('roundNo').textContent = String(currentRound);
  rolled = { p1:false, p2:false };
  totals = { p1:0, p2:0 };
  ['p1','p2'].forEach(p=>{
    document.getElementById(`nodice_${p}`).textContent = '';
    document.getElementById(`noimage_${p}`).innerHTML = '';
    document.getElementById(`total_${p}`).textContent = '0';
  });
}

function resetMatch(){
  currentRound = 1; rolled = { p1:false, p2:false }; totals = { p1:0, p2:0 }; scores = { p1:0, p2:0 };
  document.getElementById('roundNo').textContent = '1';
  ['p1','p2'].forEach(p=>{
    document.getElementById(`nodice_${p}`).textContent = '';
    document.getElementById(`noimage_${p}`).innerHTML = '';
    document.getElementById(`total_${p}`).textContent = '0';
    document.getElementById(`score_${p}`).textContent = '0';
  });
}