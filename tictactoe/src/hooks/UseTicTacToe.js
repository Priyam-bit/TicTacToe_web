import { useState } from "react"

const useTicTacToe = () => {
    const [board,setBoard] = useState([[...Array(3)],[...Array(3)],[...Array(3)]]);
    const [player,setPlayer] = useState(null); //"X", "O" or null
    
    const getCurrentPlayer = () => {
        // returns the player who has to play the current move
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

    const actions = () => {
        //Returns set of all possible actions (i, j) available on the board.

        let possibleActions = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if(!board[i][j]) {
                    possibleActions = [...possibleActions, [i,j]];
                }
            }
        }
        return possibleActions;
    } 
    
    const result = (action) => {
        //plays the move(action) on board 
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

    const winner = () => {
        // returns the winner of the game, if there is one
        // diagonals
        if (board[0][0] === board[1][1]  && board[0][0] === board[2][2])
        {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0])
        {
            return board[0][2];
        }
        for(var i = 0; i < 3; i++) {
            // columns
            if(board[i][0] ===  board[i][1] && board[i][0] ===  board[i][2])
            {   
                return board[i][0];
            }
            // rows     
            if(board[0][i] === board[1][i] === "X" && board[0][i] === board[2][i]) 
            {
                return board[0][i];
            } 
        }
        return null;
    }

    const terminal = () => {
        // returns true if the game is over, false otherwise.

        let Winner = winner();
        // check for win
        if (Winner === "X" || Winner === "O") {
            return true;
        }

        // check for tie
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if(!board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    const utility = () => {
        // returns 1 if X has won the game, -1 if O has won, 0 otherwise
        let Winner = winner();
        if(Winner === "X") return 1;
        if(Winner === "O") return -1;
        return 0;
    }

    const isInitialState = () => {
        //returns true if no move has been played on board yet, false otherwise
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if(board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    const minimax = () => {
        // returns the optimal move (action) for the current player on the board

        if (terminal()) {
            //game over
            return null;
        }

        if (isInitialState()) {
            // return any move on the board
            return [Math.floor(Math.random()*3), Math.floor(Math.random()*3)]
        }

        let currentPlayer = getCurrentPlayer();
        let optimal_move = [];
        if(currentPlayer === "X") {
            optimal_move = Max_value();
        }
        else {
            optimal_move = Min_value();
        }
        return optimal_move[1];
    }

    const Max_value = () => {
        // Returns the action from set of possible actions, which maximises X's chance of winning
        let v = Number.NEGATIVE_INFINITY;  //utility value of X, ideally 1
        let optimal_move = [];

        //find the action from the set of X's possible actions
        // which leads to least probability of O's winning
        // => leads to maximum possible value of Oval (Oval is ideally -1 for O's win)
        //O's best move after X's move given by Min_value(result(action))[1]
        //and its utility value is given by Min_value(result(action))[0]
        let Actions = actions();

        for (let action in Actions) {

            // if winning state of X is encountered on playing this action
            // immediately return that action
            if(terminal(result(action))) {
                v = utility(result(action));
                optimal_move = action;
                return [v,action];
            }

            else {
                let Oval = Min_value(result(action))[0];
                if(Oval > v) {
                    v = Oval;
                    optimal_move = action;
                }
            }
        }
        return [v,optimal_move];
    }

    const Min_value = () => {
        // Returns the action from set of possible actions, which maximises O's chance of winning
        let v = Number.POSITIVE_INFINITY;  //utility value of 0, ideally -1
        let optimal_move = [];

        //find the action from the set of O's possible actions
        // which leads to least probability of X's winning
        // => leads to minimum possible value of Xval (Xval is ideally 1 for X's win)
        //X's best move after O's move given by Max_value(result(action))
        //and its utility value is given by Min_value(result(action))[0]
        let Actions = actions();
        
        for (let action in Actions) {

            // if winning state of O is encountered on playing this action
            // immediately return that action
            if(terminal(result(action))) {
                v = utility(result(action));
                optimal_move = action;
                return [v,action];
            }

            else {
                let Xval = Min_value(result(action))[0];
                if(Xval < v) {
                    v = Xval;
                    optimal_move = action;
                }
            }
        }
        return [v,optimal_move];
    }
    
    return {board,setBoard,result,player,setPlayer,winner}
}
export default useTicTacToe