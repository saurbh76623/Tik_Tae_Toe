 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");


 let currentPlayer;
 let gamegrid;

 const winningpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8], 
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

 //let create a function to initialise the game

function initGame() {
    currentPlayer = "X";
    gamegrid = ["","","","","","","","",""];
    // UI pr empty bhi krna padega boxes ko
    boxes.forEach((box ,index) => {
        box.innerText= "";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing , initialise box with css properties again...
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }

 initGame();


 //   swap turn 
 function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";

    }
    else{
        currentPlayer = "X";
    }
    //UI update krdo
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 

 }


function checkGameOver() {
    let answer = "";

    winningpositions.forEach ((position) => {
        //all 3 boxes should be non- empty and exactly same in value
        if( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")
        && (gamegrid[position[0]] === gamegrid[position[1]] ) && (gamegrid[position[1]] === gamegrid[position[2]])) {

            // check if weather is x
            if(gamegrid[position[0]] === "X")
               answer = "X" ;
            else
                answer="O";
            

            // disable pointer events...
            boxes.forEach((box) =>{
              
                box.style.pointerEvents = "none";
        
            })



            //now we know x/o is winner

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        
    });

  

    // it means we have a one winner
    if(answer!==""){
        gameInfo.innerText = `Winner player - ${answer}`;
        newGameBtn.classList.add("active");
        // return;
    }

 

    // check weather there is a tie.

    let Fillcount = 0;
    gamegrid.forEach((box)=>{
        if(box !== "" ){
            Fillcount++;

        }
            
    });

    // board is filled , game is tie....

    if(Fillcount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

 function handleClick(index) {
    if(gamegrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gamegrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swap turn wla.....
        swapTurn();


        // check koi geet to nhi gya
         checkGameOver();
    }

 }


 boxes.forEach((box , index) =>{
    box.addEventListener("click" , () =>{
        handleClick(index);

    })

 });


 newGameBtn.addEventListener("click" , initGame);