//initial data
let frame = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '' 
};
let turn = '';
let warning = '';
let playing = false;

//events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
})
reset();

//functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && frame[item]=== ''){
        frame[item] = turn;
        renderFrame();
        changeTurn();
    }
}

function reset(){
    warning = '';

    let random = Math.floor(Math.random() * 2);
    if(random === 0){   //turn = (random === 0)?'x':'o';
        turn = 'x';
    }else{
        turn = 'o';
    }

    for(let i in frame){
        frame[i] = '';
    }
    playing = true;

    renderFrame();
    renderInfo();
}
function renderFrame(){
    for(let i in frame){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = frame[i];
    }
    checkGame();
}
function renderInfo(){
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}
function changeTurn(){
    if(turn === 'x'){
        turn = 'o';
    }else{
        turn = 'x';
    }
    renderInfo();
}
function checkGame(){
    if(checkwinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
    }else if(checkwinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;
    }else if(isFull()){
        warning = 'Deu empate';
        playing = false;
    }
}
function checkwinnerFor(turn){
    let possibility = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,d1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in possibility){
        let pArray = possibility[w].split(',');
        let hasWon = pArray.every((option)=>{
            if(frame[option]===turn){
                return true;
            }else{
                return false;
            }
        });
        if(hasWon){
            return true;
        }
    }
    return false;
}
function isFull(){
    for(let i in frame){
        if(frame[i] === ''){
            return false;
        }
    }
    return true;
}