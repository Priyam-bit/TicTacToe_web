import { useState } from "react"

const useTicTacToe = () => {
    const [board,setBoard] = useState([[...Array(3)],[...Array(3)],[...Array(3)]]);
    const [player,setPlayer] = useState(null);
    
    const result = (action) => {
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