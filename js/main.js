let btn = document.querySelector('#btn'),
    mainBlock = document.querySelector('.puzzle_block'),
    stringToCompare = '12345678';
    

// build block 
createBlocks(16);

// listener on click with event
addEventListener("click", (e) => move(e));

btn.addEventListener('click',shufle);

// Putting all the puzzle pieces NodeList objects
let pieceOfPuzzle = document.querySelectorAll('.puzzle_piece');

// Function for generating a random number with given boundaries
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));   
}

// Function to build a block with a puzzle.
function createBlocks(numbers) {
    for (let i = 1; i <= numbers; i++) {
        mainBlock.innerHTML += `<div class="puzzle_piece ${i}" id="block${i}">
                                    <span class="up ${i}" id="up${i}">Up</span>
                                    <span class="right ${i}" id="right${i}">Right</span>
                                    <span class="down ${i}" id="down${i}">Down</span>
                                    <span class="left ${i}" id="left${i}">Left</span>
                                </div>`;
    }
}

// Function for randomly arranging numbers in an array, without repeating
function randArr() {
    // create an array with random numbers and the first element
    let randArrNumber = [];
    randArrNumber.push(randomInteger(1,16));
    // Function to check the uniqueness of elements and filling unique elements
    function fillArr() {
        let randNumber = randomInteger(1,16);
        // check if there is the same element in the array; if not, add it, otherwise, call the function again.
        if (randArrNumber.indexOf(randNumber) === -1) {
            randArrNumber.push(randNumber);
                // if we collected 8 unique elements, we return an array
                if (randArrNumber.length === 16) {
                    return randArrNumber;
                }
        }
        fillArr();
    }
    fillArr();
    return randArrNumber;
}

// use an array with unique elements to mix puzzle pieces
function shufle() {
    let randArrNumber = randArr();
    pieceOfPuzzle.forEach((arr, i) => {
        arr.style.order = randArrNumber[i];
    });
}

// function to move puzzle pieces
function move(e) {
    // create a condition on click on the tag span
    if (e.target.localName === "span") {
        let item = e.target.classList[1] - 1,
            compareString = '',
            position = e.target.classList[0],   
            orderPositon = Number(pieceOfPuzzle[item].style.order);
        // if the element has an order and it is less than 16
        if (pieceOfPuzzle[item].style.order && pieceOfPuzzle[item].style.order <= 16 ){

                // looking for span by position
                switch (position) {
                    case position = 'left':
                        pieceOfPuzzle[item].style.order = orderPositon - 1;
                    break;
                    case position = 'right':
                        pieceOfPuzzle[item].style.order = orderPositon + 1;
                    break;
                    case position = 'up':
                        pieceOfPuzzle[item].style.order = orderPositon - 8;
                    break;
                    case position = 'down':
                        pieceOfPuzzle[item].style.order = orderPositon + 8;
                    break;
                }

                pieceOfPuzzle[item].style.order < 1 ? pieceOfPuzzle[item].style.order = 1 : pieceOfPuzzle[item].style.order = pieceOfPuzzle[item].style.order;
                pieceOfPuzzle[item].style.order > 16 ? pieceOfPuzzle[item].style.order = 16 : pieceOfPuzzle[item].style.order = pieceOfPuzzle[item].style.order;
               
                // swapping blocks
                pieceOfPuzzle.forEach((key) => {
                    if (key.style.order === pieceOfPuzzle[item].style.order && key !== pieceOfPuzzle[item]){
                        key.style.order = orderPositon;  
                    }
                    // check the order of the blocks if we collected them in order we won
                    compareString += key.style.order;
                    if (stringToCompare === compareString)
                        setTimeout(() => {
                            alert('You Win!!!');
                        },1500);  
                });    
            } 
        }
    }

