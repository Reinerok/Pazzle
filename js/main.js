let btn = document.querySelector('#btn'),
    mainBlock = document.querySelector('.puzzle_block'),
    stringToCompare = '12345678',
    compareString = '',
    tooltipImage = document.querySelector('.tooltipImage'),
    tooltip = document.querySelector('.tooltip'),
    timerValue = document.querySelector('.timer'),
    complexity = 16,
    x,
    y;
    

function timer() {
    if (timerValue.textContent >= 1 && timerValue.classList.contains('start')) {
        setTimeout(() => {
            timerValue.textContent = timerValue.textContent - 1;
            timerValue.textContent == 0 ? shufle(complexity) : timer();
        },1000);    
    } else {
        timerValue.textContent = 60;
    }       
}
timerValue.addEventListener('click',() => {
    timerValue.classList.toggle('start');
    timer();
});

 function show() {
  tooltipImage.classList.toggle('hide');
  tooltipImage.classList.toggle('show');
}; 

tooltip.addEventListener('click',show)

// build block 
createBlocks(complexity);

// listener on click with event
addEventListener("click", (e) => move(e));

btn.addEventListener('click',() => {shufle(complexity)});

// Putting all the puzzle pieces NodeList objects
let pieceOfPuzzle = document.querySelectorAll('.puzzle_piece');

// Function for generating a random number with given boundaries
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));   
}

// Function to build a block with a puzzle.
function createBlocks(numbers) {
    for (var i = 1; i <= numbers; i++) {
        if (i === 1) {
            x = 0;
            y = 0;
        } else if (i > 1 && i !== 9 ) {
            x = 900 - i*100;
        } else if (i === 9) {
            x = 0;
            y = 200;
        }
        mainBlock.innerHTML += `<div class="puzzle_piece ${i}" id="block${i}" style="order: 0; background-position: ${x}px ${y}px;" ">
                                    <span class="up ${i}" id="up${i}">Up</span>
                                    <span class="right ${i}" id="right${i}">Right</span>
                                    <span class="down ${i}" id="down${i}">Down</span>
                                    <span class="left ${i}" id="left${i}">Left</span>
                                </div>`;
    }
}

// Function for randomly arranging numbers in an array, without repeating
function randArr(number) {
    // create an array with random numbers and the first element
    let randArrNumber = [];
    randArrNumber.push(randomInteger(1,number));
    // Function to check the uniqueness of elements and filling unique elements
    function fillArr() {
        let randNumber = randomInteger(1,number);
        // check if there is the same element in the array; if not, add it, otherwise, call the function again.
        if (randArrNumber.indexOf(randNumber) === -1) {
            randArrNumber.push(randNumber);
                // if we collected 8 unique elements, we return an array
                if (randArrNumber.length === number) {
                    return randArrNumber;
                }
        }
        fillArr();
    }
    fillArr();
    return randArrNumber;
}

// use an array with unique elements to mix puzzle pieces
function shufle(number) {
    let randArrNumber = randArr(number);
    pieceOfPuzzle.forEach((arr, i) => {
        arr.style.order = randArrNumber[i];
    });
}

// function to move puzzle pieces
function move(e) {
    // create a condition on click on the tag span
    if (e.target.localName === "span") {
        let item = e.target.classList[1] - 1,
            position = e.target.classList[0],   
            orderPositon = Number(pieceOfPuzzle[item].style.order);
        // if the element has an order and it is less than complexity
        if (pieceOfPuzzle[item].style.order != 0 && pieceOfPuzzle[item].style.order <= complexity ){

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
                pieceOfPuzzle[item].style.order > complexity ? pieceOfPuzzle[item].style.order = complexity : pieceOfPuzzle[item].style.order = pieceOfPuzzle[item].style.order;
               
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

