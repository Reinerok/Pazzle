let btn = document.querySelector('#btn'),
    mainBlock = document.querySelector('.puzzle_block');


function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));   
}

function createBlocks(numbers) {
    
    for (let i = 1; i <= numbers; i++) {
        mainBlock.innerHTML += `
        <div class="puzzle_piece ${i}" id="block${i}">
            <span class="up" id="up${i}">Up</span>
            <span class="right" id="right${i}">Right</span>
            <span class="down" id="down${i}">Down</span>
            <span class="left ${i}  " id="left${i}">Left</span>
        </div>`;
    }
}
createBlocks(8);
let pieceOfPuzzle = document.querySelectorAll('.puzzle_piece');
function randArr() {
    let randArrNumber = [];
    randArrNumber.push(randomInteger(1,8));
    function fillArr() {
        let randNumber = randomInteger(1,8);
        if (randArrNumber.indexOf(randNumber) === -1) {
            randArrNumber.push(randNumber);
                if (randArrNumber.length === 8) {
                    return randArrNumber;
                }
        }
        fillArr();
    }
    fillArr();
    return randArrNumber;
}

function shufle() {
    let 
        randArrNumber = randArr();
    pieceOfPuzzle.forEach((arr, i) => {
        arr.style.order = randArrNumber[i];
    });
}

 btn.addEventListener('click',shufle);

 

let left = document.querySelectorAll('.left');
let right = document.querySelectorAll('.right');
let up = document.querySelectorAll('.up');
let down = document.querySelectorAll('.down');

function show () {
    down[1].addEventListener('click', () => {} );
};

addEventListener("click", function(e) {
    if (e.target.localName === "span"  && pieceOfPuzzle[0].style.order && pieceOfPuzzle[0].style.order < 8 ){
            pieceOfPuzzle[0].style.order = Number(pieceOfPuzzle[0].style.order) + 1;
            pieceOfPuzzle.forEach(function(key,i,arr) {
                /*console.log(key);
                console.log(pieceOfPuzzle[0]);*/
                
                if (key.style.order === pieceOfPuzzle[0].style.order && key !== pieceOfPuzzle[0])
                key.style.order = pieceOfPuzzle[0].style.order - 1;
                
            });
        };
    console.log(e);
    /*console.log(e.target.classList[1]);
    function name () {pieceOfPuzzle[e.target.classList[1] - 1].style.order += +1 }
    left[e.target.classList[1] - 1].addEventListener('click', name );*/
  });
/*

right.addEventListener('click', () => pieceOfPuzzle[0].style.order = Number(pieceOfPuzzle[0].style.order) + 1 );
up.addEventListener('click', () => pieceOfPuzzle[0].style.order = Number(pieceOfPuzzle[0].style.order) - 5 );
down.addEventListener('click', () => pieceOfPuzzle[0].style.order = Number(pieceOfPuzzle[0].style.order) + 5 );

console.log(pieceOfPuzzle);
console.log(down[0].parentElement);

pieceOfPuzzle[0].addEventListener('click',() => {console.log(pieceOfPuzzle[0])}); */

