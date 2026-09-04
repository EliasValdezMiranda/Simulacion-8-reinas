let counter = 0;

function block(cell) {
    const row = cell.parentNode.rowIndex;
    const col = cell.cellIndex;
    const board = document.getElementById("board");
    for(let i = 0; i < 8; i++) {
        if (i !== col) {
            board.rows[row].cells[i].onclick = null;
        }
        if (i !== row) {
            board.rows[i].cells[col].onclick = null;
        }
    }

    for(let i = -7; i <= 7; i++) {
        if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i !== 0) {
            board.rows[row+i].cells[col+i].onclick = null;
        }

        if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i !== 0) {
            board.rows[row+i].cells[col-i].onclick = null;
        }
    }
}

function cellClick(cell) {
    if (window.getComputedStyle(cell).backgroundImage == "none") {
        if (counter >= 8) {
            console.log("8 Queens!");
            return;
        }
        block(cell);
        cell.style = `background-image: url('./img/queen.png');
                    background-size: 50px;
                    background-repeat: no-repeat;
                    background-position: center`;
        counter++;
        document.getElementById("reinas_colocadas").innerHTML = `Reinas colocadas:  ${counter}`;
        if (counter === 8) {
            document.getElementById("ganador").innerHTML = `YOU'RE WINNER`;
        }
        console.log(counter);
    }
    else {
        cell.style = `background-image: "none";`;
        resetBlock(cell);
        cell.onclick = function(){ cellClick(this); };
        counter--;
        document.getElementById("reinas_colocadas").innerHTML = `Reinas colocadas:  ${counter}`;
        console.log(counter);
    }   
}

function change(r, c) {
  const tablero = document.getElementById("board");

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
        tablero.rows[i].cells[j].style.backgroundColor = "red";
      }
    }
  }
}
 

function reset() {
    var cell = document.getElementsByTagName("td");
    for (let i = 0; i < cell.length; i++) {
        cell[i].style.backgroundColor = '';
    }
}

function resetBlock(cell) {
    const row = cell.parentNode.rowIndex;
    const col = cell.cellIndex;
    const board = document.getElementById("board");

    for(let i = 0; i < 8; i++) {
        board.rows[row].cells[i].onclick = function(){ cellClick(this); };
        board.rows[i].cells[col].onclick = function(){ cellClick(this); };
    }

    for(let i = -7; i <= 7; i++) {
        if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i !== 0) {
            board.rows[row+i].cells[col+i].onclick = function(){ cellClick(this); };
        }

        if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i !== 0) {
            board.rows[row+i].cells[col-i].onclick = function(){ cellClick(this); };
        }
    }
}
