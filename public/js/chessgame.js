const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark");

            if (square) {
                const pieceElement = document.createElement("span");
                pieceElement.classList.add("piece", getPieceColorClass(square));
                pieceElement.innerText = getPieceUnicode(square);
                squareElement.appendChild(pieceElement);
            }

            boardElement.appendChild(squareElement);
        });
    });
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
        'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
    };
    return unicodePieces[piece.type] || '';
};

const getPieceColorClass = (piece) => {
    if (piece.type === 'p') {
        return piece.color === 'w' ? 'white-pawn' : 'black-pawn';
    } else {
        return piece.color === 'w' ? 'white' : 'black';
    }
};

socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
});

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

renderBoard();



