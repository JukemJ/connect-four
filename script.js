let gameBoard = Array(7).fill(null).map(x => Array(7).fill(null))
let playerOneScore = localStorage.getItem('playerOne') ?? 0
let playerTwoScore = localStorage.getItem('playerTwo') ?? 0
let playerOneTurn = true
let gameOver = false

document.getElementById('clear').addEventListener('click',clearScores)
document.getElementById('restart').addEventListener('click',newGame)

document.getElementById('player-one-score').innerText = playerOneScore
document.getElementById('player-two-score').innerText = playerTwoScore

newGame()

function newGame(){
    playerOneTurn = true
    gameOver = false
    gameBoard = gameBoard.map(x => x.map(y => 0))
    createBoard()
}

function drop(){
    if (gameOver) return

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
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
          let arr = []
          arr.push(gameBoard[i][j])
          arr.push(gameBoard[i+1][j+1])
          arr.push(gameBoard[i+2][j+2])
          arr.push(gameBoard[i+3][j+3])
          if (arr.reduce((a,b) => a+b,0) == 4) playerOneWins()
          if (arr.reduce((a,b) => a+b,0) == -4) playerTwoWins()
        }
      }
      
      for(let i = 0; i < 4; i++){
        for(let j = 6; j > 4; j--){
          let arr = []
          arr.push(gameBoard[i][j])
          arr.push(gameBoard[i+1][j-1])
          arr.push(gameBoard[i+2][j-2])
          arr.push(gameBoard[i+3][j-3])
          if (arr.reduce((a,b) => a+b,0) == 4) playerOneWins()
          if (arr.reduce((a,b) => a+b,0) == -4) playerTwoWins()
        } 
      } 

    //change turns
    playerOneTurn = !playerOneTurn
}

function playerOneWins(){
    //alert('Player One Wins!')
    playerOneScore++
    localStorage.setItem('playerOne',playerOneScore + 1)
    document.getElementById('player-one-score').innerText = playerOneScore
    let cells = document.getElementsByClassName('cell')
    document.getElementById('player-one-wins').style.display = 'block'
    gameOver = true
}

function playerTwoWins(){
    //alert('Player Two Wins!')
    playerTwoScore++
    localStorage.setItem('playerTwo',playerTwoScore + 1)
    document.getElementById('player-two-score').innerText = playerTwoScore
    document.getElementById('player-two-wins').style.display = 'block'
    gameOver = true
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

  function clearScores(){
    if(!gameOver) alert('Game in progress!')
    else{
        playerOneScore = 0
        playerTwoScore = 0
        document.getElementById('player-one-score').innerText = playerOneScore
        document.getElementById('player-two-score').innerText = playerTwoScore
    }
  }