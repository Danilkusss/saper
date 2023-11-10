let width = document.querySelector(".with");
let height = document.querySelector('.height')
let CountBomb = document.querySelector('.bombs')
let btn = document.querySelector('.begingame')
let Points = document.querySelector(".points")


btn.addEventListener('click', function (){
    size1w = width.value
    size2h = height.value
    CountBomb = CountBomb.value
    StartGame(size1w, size2h, CountBomb)
})

function StartGame(size1w, size2h, CountBomb){
    let cells = []
    //console.log('game start')
    const field = document.querySelector(".table");
    const cellcount = size1w * size2h;
    let closedCount = cellcount;
    field.innerHTML = '<button></button>'.repeat(cellcount)
    cells = [...field.children]; // получили детей поля;
    console.log(cells)

    const bombs = [...Array(cellcount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, CountBomb);

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON'){
            return;
        }

        const index = cells.indexOf(event.target);
        const column = index % size1w;
        const row = Math.floor(index / size1w); 
        open(row,column);
    });

    function isValid(row,column){
        return row >= 0 && row < size2h && column >= 0 && column < size1w;
    }

    // пролучение кол-во бомб и отрисовка для функции open
    function GetCountBomb(row,column){
        let count = 0;
        for (let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                if (isBomb(row + y, column + x)){
                    count++;
                }
            }
        }
        return count;
    }

    function open(row, column){
        if (!isValid(row,column)){
            return;
        }

        const index = row * size1w + column
        const cell = cells[index];

        if (cell.disabled === true){
            return;
        }

        cell.disabled = true;
        if (isBomb(row, column)){
            // проверка. если бомба то Х если нет то пустая строка
            cell.innerHTML = 'X'
            alert("проиграл получается")
            return;
        }
        closedCount--
        if (closedCount <= CountBomb){
            alert("победил получается")
            return;
        }
        const count = GetCountBomb(row,column);

        if (count !== 0){
            cell.innerHTML = count
            return;
        }
        for (let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                open(row + y, column + x);
            }
        }
    }


//это бомба?
    function isBomb(row, column){
        if (!isValid(row,column)){
            return false;
        }
        const index = row * size1w + column;
        
        return bombs.includes(index);
    }
}



