let size = document.querySelector("#Size");
let CountBomb = document.querySelector("#matrixBomb")
let Points = document.querySelector(".points")

size1w = 8
size2h = 8
CountBomb = 10
StartGame(size1w, size2h, CountBomb)

function StartGame(size1w, size2h, CountBomb){
    const field = document.querySelector(".table");
    const cellcount = size1w * size2h;
    field.innerHTML = '<button></button>'.repeat(cellcount)
    const cells = [...field.children]; // получили детей поля

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
        const index = row * size1w + column
        const cell = cells[index];
        // проверка. если бомба то Х если нет то пустая строка
        cell.innerHTML = isBomb(row, column) ? 'X' : GetCountBomb(row,column); 
        cell.disabled = true;

    }



    function isBomb(row, column){
        const index = row * size1w + column;
        
        return bombs.includes(index);
    }
}

//https://www.youtube.com/watch?v=2z1ue0RINJE


