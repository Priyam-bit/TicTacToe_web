import { useState } from "react"

const useTicTacToe = () => {
    const [board,setBoard] = useState([[...Array(3)],[...Array(3)],[...Array(3)]]);
    const [player,setPlayer] = useState(null); //"X", "O" or null
    
    const getCurrentPlayer = () => {
        let xCount = 0, oCount = 0;
        for(var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === "X") {
                    xCount++;
                }
                else if (board[i][j] === "O") {
                    oCount++;
                }
            }
        }
        if(xCount > oCount) {
            return "O";
        }
        return "X";
    }
    
    const result = (action) => {
        if(!player) {
            alert("Please select your mark");
            return;
        }
        if(getCurrentPlayer() !== player) {
            alert("Please wait for your turn");
            return;
        }
        console.log({action});
        let newBoard = [...board];
        if(newBoard[action[0]][action[1]]) {
            alert("Invalid action");
            return;
        }
        newBoard[action[0]][action[1]] = player;
        setBoard(newBoard);
    } 
    
    return {board,setBoard,result,player,setPlayer}
}
export default useTicTacToe