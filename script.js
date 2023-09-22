var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var game;
var currColumns;

var rows = 6;
var columns = 7;
let winner = document.getElementById("winner");
let title = document.querySelector(".title");
let board = document.querySelector(".game");
let playAgainBtn = document.getElementById("playAgainBtn");
let turntxt = document.getElementById("turn");
window.onload = function () {
        setGame();
};
function setGame() {
        game = [];
        currColumns = [
                5,
                5,
                5,
                5,
                5,
                5,
                5
        ];

        for (let r = 0; r < rows; r++) {
                let row = [];
                for (let c = 0; c < columns; c++) {
                        row.push(" ");
                        let tile = document.createElement("div");
                        tile.id = r.toString() + "-" + c.toString();
                        tile.classList.add("tile");
                        document.querySelector(".game").append(tile);

                        tile.addEventListener("click", setPiece);
                }
                game.push(row);
        }
        // this made us <div class='game'><div class='tile' id='r-c'></div></div>
}
var moveCount = 0;
var maxMoves = rows * columns;

function setPiece() {
        if (gameOver) {
                return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        r = currColumns[c];
        if (r < 0) {
                return;
        }

        game[r][c] = currPlayer;
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        if (currPlayer == playerRed) {
                tile.classList.add("red-piece");
                currPlayer = playerYellow;
                turntxt.innerText = "🟨 turn";
        } else {
                tile.classList.add("yellow-piece");
                currPlayer = playerRed;
                turntxt.innerText = "🟥 turn";
        } r -= 1;
        currColumns[c] = r;
        moveCount++;
        if (moveCount === maxMoves) {
                declareTie();
                return;
        }

        checkWinner();
}

function declareTie() {
        heading.textContent = "It's a Tie!";
        heading.classList.add("tie-title");
        button.textContent = "Play Again";
        title.innerHTML = "";
        title.appendChild(heading);
        title.appendChild(button);
        gameOver = true;
}
function checkWinner() { // horizently
        for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns - 3; c++) {
                        if (game[r][c] != " ") {
                                if (game[r][c] == game[r][c + 1] && game[r][c + 1] == game[r][c + 2] && game[r][c + 2] == game[r][c + 3]) {
                                        setWinner(r, c);
                                        return;
                                }
                        }
                }
                // vertically
                for (let c = 0; c < columns; c++) {
                        for (let r = 0; r < rows - 3; r++) {
                                if (game[r][c] != " ") {
                                        if (game[r][c] == game[r + 1][c] && game[r + 1][c] == game[r + 2][c] && game[r + 2][c] == game[r + 3][c]) {
                                                setWinner(r, c);
                                                return;
                                        }
                                }
                        }
                }
        }

        // anti diagonally
        for (let r = 0; r < rows - 3; r++) {
                for (let c = 0; c < columns - 3; c++) {
                        if (game[r][c] != " ") {
                                if (game[r][c] == game[r + 1][c + 1] && game[r + 1][c + 1] == game[r + 2][c + 2] && game[r + 2][c + 2] == game[r + 3][c + 3]) {
                                        setWinner(r, c);
                                        return;
                                }
                        }
                }
        }
        // diagonally
        for (let r = 3; r < rows; r++) {
                for (let c = 0; c < columns - 3; c++) {
                        if (game[r][c] != " ") {
                                if (game[r][c] == game[r - 1][c + 1] && game[r - 1][c + 1] == game[r - 2][c + 2] && game[r - 2][c + 2] == game[r - 3][c + 3]) {
                                        setWinner(r, c);
                                        return;
                                }
                        }
                }
        }
}

var heading = document.createElement("h1");
var button = document.createElement("p");

function setWinner(r, c) {
        if (game[r][c] == playerRed) {
                heading.textContent = "RED WINS";
                heading.classList.add("red-title");
                button.textContent = "PLAY AGAIN";
                title.innerHTML = "";
                title.appendChild(heading);
                title.appendChild(button);
        } else {
                heading.textContent = "YELLOW WINS";
                heading.classList.add("yellow-title");
                button.textContent = "PLAY AGAIN";
                title.innerHTML = "";
                title.appendChild(heading);
                title.appendChild(button);
        } gameOver = true;
}
button.addEventListener("click", () => {
        location.reload();
});
let rulesBtn = document.querySelector(".rulesBtn");
let rules = document.querySelector(".rules");
let closeIcon = document.querySelector(".icon");
rulesBtn.addEventListener("click", () => {
        rules.style.display = "block";
});
closeIcon.addEventListener("click", () => {
        rules.style.display = "none";
});
