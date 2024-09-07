
const tdElements = document.getElementsByTagName('TD');
// console.log(tdElements.length);

let previouslyActiveCellIndex = -1;
let chessBoard = [];


for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].addEventListener('mouseenter', () => {
        //for showing dots

        if (tdElements[i].querySelector('img')) {
            tdElements[i].classList.add('showCursorPointer');

        }

    });

    tdElements[i].addEventListener('click', () => {

        if (tdElements[i].querySelector('img')) {
            manageBackGroundOnClick(i);
            showDotsForClickedCell(i);
        }
    });
}



function canBePlacedAtPos(row, col) {
    index = row * 8 + col + 8;
    if (row < 8 && col < 8) {
        if (tdElements[index].querySelector('img')) {
            return false;
        }

    }
    return true;
}



function getMovablePositionsForPiece(piece, row, col) {
    const indicesToShowDots = [];
    console.log('piece is at row=' + row + ' and col=' + col);
    if (piece == 'pawn_black') {
        if (canBePlacedAtPos(row + 1, col)) {
            indicesToShowDots.push([row + 1, col]);
            if (canBePlacedAtPos(row + 2, col)) {
                indicesToShowDots.push([row + 2, col]);
            }
        }



    }
    else if (piece == 'pawn_white') {
        if (canBePlacedAtPos(row - 1, col)) {
            indicesToShowDots.push([row - 1, col]);
            if (canBePlacedAtPos(row - 2, col)) {
                indicesToShowDots.push([row - 2, col]);
            }
        }
    }
    else if (piece == 'rook_black') {

    }
    else if (piece == 'rook_white') {

    }
    else if (piece == 'knight_black') {

    }
    else if (piece == 'knight_white') {

    }
    else if (piece == 'bishop_black') {

    }
    else if (piece == 'bishop_white') {

    }
    else if (piece == 'queen_black') {

    }
    else if (piece == 'queen_white') {

    }
    else if (piece == 'king_black') {

    }
    else if (piece == 'king_white') {

    }
    console.log(indicesToShowDots);
    return indicesToShowDots;
}

function showDotsForClickedCell(i) {
    //console.log(tdElements[i].classList.toString());
    if (tdElements[i].classList.contains('activeCell')) {
        const img = tdElements[i].querySelector('img');
        const imgSrc = img.getAttribute('src');
        //console.log(imgSrc);
        const piece_image = imgSrc.substring(14);
        const piece = piece_image.split('.')[0];

        //console.log(piece);
        const row = Math.floor(i / 8), col = i % 8;
        movablePositions = getMovablePositionsForPiece(piece, row, col);

    }
}



function manageBackGroundOnClick(i) {
    //remove active bg every where in the board if any
    if (previouslyActiveCellIndex != -1) {
        tdElements[previouslyActiveCellIndex].classList.remove('activeCell');
        if (isBlack(previouslyActiveCellIndex)) {
            tdElements[previouslyActiveCellIndex].classList.add('blackCell');
        }
        else {
            tdElements[previouslyActiveCellIndex].classList.add('whiteCell');
        }
    }

    //now change bg of clicked one
    if (tdElements[i].classList.contains('whiteCell')) {
        tdElements[i].classList.remove('whiteCell');
    }
    else if (tdElements[i].classList.contains('blackCell')) {
        tdElements[i].classList.remove('blackCell');
    }
    if (i == previouslyActiveCellIndex) {
        console.log('already active');
        tdElements[i].classList.remove('activeCell');
        if (isBlack(i)) {
            tdElements[i].classList.add('blackCell');
        }
        else {
            tdElements[i].classList.add('whiteCell');
        }
        previouslyActiveCellIndex = -1;
    }
    else {
        console.log('adding active bg');
        tdElements[i].classList.add('activeCell');
        previouslyActiveCellIndex = i;
    }
}

function isBlack(n) {
    const row = Math.floor(n / 8);
    const col = n % 8;
    if (row % 2 == 0 && col % 2 == 0) {
        return true;
    }
    if (row % 2 != 0 && col % 2 != 0) {
        return true;
    }
    return false;
}

function getImageElement(image_name) {
    const img = document.createElement('img');
    img.src = "assets/images/" + image_name + ".png";
    return img;
}



function initialBoard() {


    //add bgs
    for (let i = 0; i < tdElements.length; i++) {

        if (isBlack(i)) {
            tdElements[i].classList.add('blackCell');
        }

        else {
            tdElements[i].classList.add('whiteCell');
        }

    }
    //place white pawns
    for (let i = 48; i <= 55; i++) {
        tdElements[i].appendChild(getImageElement('pawn_white'));
    }

    //place black pawns
    for (let i = 8; i <= 15; i++) {
        tdElements[i].appendChild(getImageElement('pawn_black'));
    }

    //place white rem pieces
    tdElements[56].appendChild(getImageElement('rook_white'));
    tdElements[57].appendChild(getImageElement('knight_white'));
    tdElements[58].appendChild(getImageElement('bishop_white'));
    tdElements[59].appendChild(getImageElement('king_white'));
    tdElements[60].appendChild(getImageElement('queen_white'));
    tdElements[61].appendChild(getImageElement('bishop_white'));
    tdElements[62].appendChild(getImageElement('knight_white'));
    tdElements[63].appendChild(getImageElement('rook_white'));

    //place black rem pieces
    tdElements[0].appendChild(getImageElement('rook_black'));
    tdElements[1].appendChild(getImageElement('knight_black'));
    tdElements[2].appendChild(getImageElement('bishop_black'));
    tdElements[3].appendChild(getImageElement('king_black'));
    tdElements[4].appendChild(getImageElement('queen_black'));
    tdElements[5].appendChild(getImageElement('bishop_black'));
    tdElements[6].appendChild(getImageElement('knight_black'));
    tdElements[7].appendChild(getImageElement('rook_black'));

}


initialBoard();