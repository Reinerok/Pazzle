let start = document.querySelector('.start'),
    restart = document.querySelector('.restart'),
    mainBlock = document.querySelector('.puzzle_block'),
    tooltipImage = document.querySelector('.tooltipImage'),
    tooltip = document.querySelector('.tooltip'),
    title = document.querySelector('.title'),
    difficulty = document.querySelector('.difficulty'),
    timerValue = document.querySelector('.timer'),
    moveBlock = document.querySelector ('.move'),
    stringToCompare,
    puzzle_piece,
    complexity,
    pieceOfPuzzle,
    x,
    y,
    widthBlock,
    heightBlock,
    imgBlock,
    randNumber,
    step,
    randArrNumber,
    puzzleImg,
    compareString = '',
    move = 0;

// Функция для скрытия блоков
function hideAll(...rest) {
    rest.forEach((element) => {
        element.classList.toggle('hide');
    }); 
};

difficulty.addEventListener('click',(e) => {
    switch (true) {
        case e.target.className === 'easy':
        complexity = 8;
        break;
        case e.target.className === 'normal':
        complexity = 16;
        break;
        case e.target.className === 'hard':
        complexity = 32;
        break;      
    }
    // remove block 
    // удаляем блоки если они есть
    puzzle_piece !== 'undefined' ? removePiece() : '';
    // build block
    // собираем блоки 
    createBlocks(complexity);
    start.classList.remove('hide');
});

// функция удаления блоков
function removePiece() {
    puzzle_piece = document.querySelectorAll('.puzzle_piece');
    puzzle_piece.forEach((element) => {
        element.remove();
    });
}

// функция для старта таймера
function timer() {
    if (timerValue.textContent >= 1 && timerValue.classList.contains('starting') && !timerValue.classList.contains('hide')) {
        setTimeout(() => {
            timerValue.textContent = timerValue.textContent - 1;
            // TODO переделать рекурсию под while
            timerValue.textContent == 0 ? shufle(complexity) : timer();
        },1000);    
    } else {
        timerValue.textContent = 60;
    }       
  }



// функция для старта таймера переделка
/*function timer() {
    console.log(123);
    
    while(timerValue.textContent >= 1 && timerValue.classList.contains('starting') && !timerValue.classList.contains('hide')) {
        console.log(timerValue.textContent);
        setTimeout(() => {
            console.log('Test');
            timerValue.textContent = timerValue.textContent - 1;
            // TODO переделать рекурсию под while
            timerValue.textContent === 0 ? shufle(complexity) : '';
        },1000);    
    } 
  
    //timerValue.textContent = 60;
  
}*/

timerValue.addEventListener('click',() => {
    timerValue.classList.toggle('starting');
    timer();
});

tooltip.addEventListener('click',() => {
    hideAll(tooltipImage);
})

// listener on click with event
// добавляем обработчик события на клик для движения блоков
addEventListener("click", (e) => shift(e));

// обработчики для старта и рестарта
start.addEventListener('click',() => {
    shufle(complexity);
    hideAll(difficulty, restart, tooltip, timerValue, title, start,moveBlock);
});

restart.addEventListener('click',() => {
    move = 0;
    moveBlock.textContent = move;
    puzzle_piece !== 'undefined' ? removePiece() : '';
    tooltipImage.classList.contains('hide') ? '' : hideAll(tooltipImage);
    timerValue.classList.toggle('starting');
    hideAll(difficulty, restart, tooltip, timerValue, title,moveBlock);
    
});

// Function for generating a random number with given boundaries
// Функция для генерации рандомного числа
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));   
}

// Function to build a block with a puzzle.
// Функци для создания блока с пазлом.
function createBlocks(numbers) {

    stringToCompare = '';
    puzzleImg = randomInteger(1, 5);
    tooltipImage.style.backgroundImage = `url("../img/${puzzleImg}.png")`;

    for (var i = 1; i <= numbers; i++) {

        stringToCompare +=i;

        if (complexity === 8) {
            widthBlock = 200;
            heightBlock = 200;
        } else if (complexity === 16) {
            widthBlock = 100;
            heightBlock = 200;          
        } else if (complexity === 32) {
            widthBlock = 100;
            heightBlock = 100;             
        } 
        
        if (i === 1) {
            x = 0;
            y = 0;
        } else if (i > 1 && i !== 9 && complexity >= 16) {
            x = 900 - i*100;
        } else if (i === 9 && complexity === 16 || i === 5 && complexity === 8) {
            x = 0;
            y = 200;
        } else if (i > 1 && i !== 5 && complexity === 8) {
            x = 1000 - i*200;
        } else if (i > 1 && i !== 5 && complexity === 8) {
            x = 1000 - i*200;
        } else if (i === 5 && complexity === 8) {
            x = 0;
            y = 200;
        } 
        
        if (i === 9 && complexity === 32) {
            x = 0;
            y = 300;
        } else if (i === 17 && complexity === 32) {
            x = 0;
            y = 200;
        } else if (i === 25 && complexity === 32) {
            x = 0;
            y = 100;
        }
         
        mainBlock.innerHTML += `<div class="puzzle_piece ${i}" id="block${i}" style="order: 0; background: url(../img/${puzzleImg}.png) ${x}px ${y}px; width: ${widthBlock}px; height: ${heightBlock}px;" ">
                                    <span class="direction up ${i}" id="up${i}">Up</span>
                                    <span class="direction right ${i}" id="right${i}">Right</span>
                                    <span class="direction down ${i}" id="down${i}">Down</span>
                                    <span class="direction left ${i}" id="left${i}">Left</span>
                                </div>`;
    }

}

// Function for randomly arranging numbers in an array, without repeating/
// Функция для рандомного вставления чисел в массив без повторения
function randArr(number) {
    // create an array with random numbers and the first element
    // создаем массив с рандомным числом
    randArrNumber = [];
    randArrNumber.push(randomInteger(1,number));
    // Function to check the uniqueness of elements and filling unique elements
    function fillArr() {
        randNumber = randomInteger(1,number);
        // check if there is the same element in the array; if not, add it, otherwise, call the function again.
        if (randArrNumber.indexOf(randNumber) === -1) {
            randArrNumber.push(randNumber);
                // if we collected 8 unique elements, we return an array
                if (randArrNumber.length === number) {
                    return randArrNumber;
                }
        }
        // TODO переделать рекурсию под while
        fillArr();
    }
    fillArr();
    return randArrNumber;
}
// Function for randomly arranging numbers in an array, without repeating/
// Функция для рандомного вставления чисел в массив без повторениян Переделка 
/* 
function randArr(number) {
  // create an array with random numbers and the first element
  // создаем массив с рандомным числом
  randArrNumber = [];
  randArrNumber.push(randomInteger(1,number));
  // Function to check the uniqueness of elements and filling unique elements
  
      // check if there is the same element in the array; if not, add it, otherwise, call the function again.

      while (randArrNumber.length !== number) {
        randNumber = randomInteger(1,number);
        if (randArrNumber.indexOf(randNumber) === -1) {
          randArrNumber.push(randNumber);
        }
      }
  return randArrNumber;
}
*/


// use an array with unique elements to mix puzzle pieces
function shufle(number) {
    // Putting all the puzzle pieces NodeList objects
    pieceOfPuzzle = document.querySelectorAll('.puzzle_piece');
    randArrNumber = randArr(number);
    pieceOfPuzzle.forEach((element, i) => {
        element.style.order = randArrNumber[i];
    });
}

// function to shift puzzle pieces
// функция для движения блоков
function shift(e) {
    // create a condition on click 
    // создаем условие по клику при содержании класса direction
    if (e.target.classList.contains('direction') ) {
        // TODO сделать вывод количество шагов.
        move += 1;
        moveBlock.textContent = move;
        let item = e.target.classList[2] - 1,
            position = e.target.classList[1],   
            orderPositon = Number(pieceOfPuzzle[item].style.order);
        // if the element has an order and it is less than complexity
        // если у элемент есть order и он меньше чем сложность то двигаем элемент
        if (pieceOfPuzzle[item].style.order != 0 && pieceOfPuzzle[item].style.order <= complexity ){
                //устанавливаем шаг для сдвига кусочка вверх или вниз
                complexity === 4 ? step = 4 : step = 8;
                // looking for span by position
                // ищем спан по позиции
                switch (position) {
                    case position = 'left':
                        pieceOfPuzzle[item].style.order = orderPositon - 1;
                    break;
                    case position = 'right':
                        pieceOfPuzzle[item].style.order = orderPositon + 1;
                    break;
                    case position = 'up':
                        pieceOfPuzzle[item].style.order = orderPositon - step;
                    break;
                    case position = 'down':
                        pieceOfPuzzle[item].style.order = orderPositon + step;
                    break;
                }

                pieceOfPuzzle[item].style.order < 1 ? pieceOfPuzzle[item].style.order = 1 : pieceOfPuzzle[item].style.order = pieceOfPuzzle[item].style.order;
                pieceOfPuzzle[item].style.order > complexity ? pieceOfPuzzle[item].style.order = complexity : pieceOfPuzzle[item].style.order = pieceOfPuzzle[item].style.order;
               
                // swapping blocks
                // меняем местами два блока
                pieceOfPuzzle.forEach((element) => {
                    if (element.style.order === pieceOfPuzzle[item].style.order && element !== pieceOfPuzzle[item]){
                        element.style.order = orderPositon;  
                    }
                    // check the order of the blocks if we collected them in order we won
                    // проверка выиграл ли ты
                    compareString += element.style.order;
                    if (stringToCompare === compareString && move >= complexity) {
                        setTimeout(() => {
                            alert('You Win!!!');
                        },1500);
                    }
                    compareString.length === stringToCompare.length ? compareString = '' : compareString = compareString;  
                });    
        } 
    }
}