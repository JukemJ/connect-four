let gameBoard = Array(7).fill(null).map(x => Array(7).fill(null))
let playerOneScore = 0
let playerTwoScore = 0
let playerOneTurn = true
document.getElementById('restart').addEventListener('click',newGame)
newGame()

function newGame(){
    gameBoard = gameBoard.map(x => x.map(y => 0))
    createBoard()
}

function drop(){
    //console.log(this.getAttribute('column'))
    //console.log(gameBoard)
    //player one gets marked with '1'
    //player two gets marked with '-1'
    //win check: if line == 4 or -4
    let y = 6
    let x = this.getAttribute('column')
    while(gameBoard[y][x]) y--
    gameBoard[y][x] = playerOneTurn ? 1 : -1
    const ele = document.getElementsByClassName(x)
    for(let i = 6; i >= 0; i--){
        if(!ele[i].style.backgroundColor){
            ele[i].style.backgroundColor = playerOneTurn ? 'red' : 'blue'
            ele[i].style.border = '2px solid black'
            ele[i].style.borderTop = '5px solid black'
            break
        }
    }
    //this.removeEventListener('click',drop)
    winCheck()
}

function winCheck(){
    //check rows
    for(let row of gameBoard){
        for(let i=0; i < 4; i++){
            let sum = row.slice(i,i+4).reduce((a,b) => a + +b,0)
            if(sum == 4) playerOneWins()              
            if(sum == -4) playerTwoWins()
        }
    }
    
    //check columns
    for(let i=0; i < 7; i++){
        for(let j=0; j < 4; j++){
            let sum = 0
            for(let k=j; k < j+4; k++){
                sum += gameBoard[k][i]
            }
            if(sum == 4) playerOneWins()              
            if(sum == -4) playerTwoWins()
        }
    }
    //check diagonals

    //change turns
    playerOneTurn = !playerOneTurn
}

function playerOneWins(){
    alert('Player One Wins!')
    playerOneScore++
    localStorage.setItem('playerOne',playerOneScore)
    document.getElementById('player-one-score').innerText = playerOneScore
    document.getElementsByClassName('cell').forEach(x => x.removeEventListener('click',drop))
}

function playerTwoWins(){
    alert('Player Two Wins!')
    playerTwoScore++
    localStorage.setItem('playerTwo',playerTwoScore)
    document.getElementById('player-two-score').innerText = playerTwoScore
    document.getElementsByClassName('cell').forEach(x => x.removeEventListener('click',drop))
}


function createBoard(){ 
    const board = document.getElementById('game-board')
    board.innerText = ''
    for(let i = 0; i < 7; i++){ 
      let row = document.createElement("div"); 
      row.classList.add('row','justify-content-evenly')
      for(let j = 0; j < 7; j++){
        let cell = document.createElement("div");
        cell.addEventListener('mouseover',showArrow)
        cell.addEventListener('mouseout',hideArrow)
        cell.addEventListener('click',drop)
        cell.classList.add('col-1','cell','m-1',j)
        cell.setAttribute('column',j)
        row.appendChild(cell)
      } 
      board.appendChild(row)
    }
  }
 
  function showArrow(){
    let arrow = document.getElementById(this.getAttribute('column'))
    arrow.style.borderTopColor = playerOneTurn ? 'red' : 'blue'
  }
  function hideArrow(){
    let arrow = document.getElementById(this.getAttribute('column'))
    arrow.style.borderTopColor = 'rgb(157, 146, 255)'
  }

