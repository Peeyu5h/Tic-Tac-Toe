const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");  


let currPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [1,4,7]
]

// fuction to initialize game
function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr bhi box ko empty kro
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize boxes with with css properties again
        box.classList = `box box${index+1}`; 

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn() {
    if(currPlayer === "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
         // All three boxes are not empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
               
                // Check if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "O";

                // Disable pointer Event
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                // now we know X/O is winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    // it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${currPlayer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    // lets check if there is tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    });

    // If board is Filled, game is Tie
    if (fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");

    }
}


function handClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        // check if somebody won
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);