let btn = document.querySelector('#btn'),
    mainBlock = document.querySelector('.puzzle_block'),
    stringToCompare = '12345678';

//Функция для генерация случайного числа с задаными границами
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));   
}

//функция для сборки блока с пазлом
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

//Собираем блок с пазлом
createBlocks(8);

//Собираем все кусочки пазла в псевдомасив
let pieceOfPuzzle = document.querySelectorAll('.puzzle_piece');

//Фнункция для случайного расставления чисел в массиве, без повторения
function randArr() {
    //создаем массив с случайными числами и пресваием первый элемент
    let randArrNumber = [];
    randArrNumber.push(randomInteger(1,8));
    //функция для проверки уникальности элементов и наполнения уникальными элементами
    function fillArr() {
        let randNumber = randomInteger(1,8);
        //проверяем если в массиве такой же элемент если нету то добавляем иначе вызываем функцию повторно
        if (randArrNumber.indexOf(randNumber) === -1) {
            randArrNumber.push(randNumber);
                //если собрали 8 уникальных элементов возвращаем массив
                if (randArrNumber.length === 8) {
                    return randArrNumber;
                }
        }
        fillArr();
    }
    fillArr();
    return randArrNumber;
}

//используем массив с уникальными элементами для смешивания кусочков пазла
function shufle() {
    let randArrNumber = randArr();
    pieceOfPuzzle.forEach((arr, i) => {
        arr.style.order = randArrNumber[i];
    });
}

 btn.addEventListener('click',shufle);

 //функция дя перемещения кусочков пазла
function move(e) {
    //создаем условие на клик по тэгу спан
    if (e.target.localName === "span") {
        let item = e.target.classList[1] - 1,
            compareString = '',
            position = e.target.classList[0],   
            number = pieceOfPuzzle[item].style.order;
        //если у элемента есть order и он меньше 8 .
        if (pieceOfPuzzle[item].style.order && pieceOfPuzzle[item].style.order <= 8){
                
                //ищем спан по позиции 
                switch (position) {
                    case position = 'left':
                        pieceOfPuzzle[item].style.order = Number(pieceOfPuzzle[item].style.order) - 1;
                    break;
                    case position = 'right':
                        pieceOfPuzzle[item].style.order = Number(pieceOfPuzzle[item].style.order) + 1;
                    break;
                    case position = 'up':
                        pieceOfPuzzle[item].style.order = Number(pieceOfPuzzle[item].style.order) -4;
                        if (pieceOfPuzzle[item].style.order < 1) {
                            pieceOfPuzzle[item].style.order = 1;
                        }
                    break;
                    case position = 'down':
                        pieceOfPuzzle[item].style.order = Number(pieceOfPuzzle[item].style.order) + 4;
                        if (pieceOfPuzzle[item].style.order > 8) {
                            pieceOfPuzzle[item].style.order = 8;
                        }
                    break;
                }
                // меняем местами блоки
                pieceOfPuzzle.forEach((key) => {
                    if (key.style.order === pieceOfPuzzle[item].style.order && key !== pieceOfPuzzle[item]){
                        key.style.order = number;  
                    }
                    //проверяем порядок блоков если мы собрали их по порядку то мы выиграли
                    compareString += key.style.order;
                    if (stringToCompare === compareString)
                        setTimeout(() => {alert('Победа!!!')},1500);  
                });    
            } 
        }
    }

//обработчик по клику с параметром which
addEventListener("click", (e) => move(e));