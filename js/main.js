let pieceOfPuzzle = document.querySelectorAll('.puzzle_piece'),
    randArrNumber = [],
    btn = document.querySelector('#btn');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function randArr() {
    randArrNumber = [];
    randArrNumber.push(randomInteger(1,8));
    function fillArr() {
        let test = randomInteger(1,8);
        if (randArrNumber.indexOf(test) === -1) {
            randArrNumber.push(test);
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
    randArr();
    pieceOfPuzzle.forEach((arr, i) => {
        arr.style.order = randArrNumber[i];
    });
}


btn.addEventListener('click',shufle);