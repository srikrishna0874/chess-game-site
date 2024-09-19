
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





function getPosForKnight(row, col) {
    const res = [];
    let eightPos = [[row + 2, col + 1], [row - 2, col + 1], [row + 1, col + 2], [row - 1, col + 2], [row - 1, col - 2], [row + 1, col - 2], [row + 2, col - 1], [row - 2, col - 1]];
    //console.log(eightPos);
    for (let i = 0; i < eightPos.length; i++) {
        if (eightPos[i][0] >= 0 && eightPos[i][1] >= 0 && canBePlacedAtPos(eightPos[i][0], eightPos[i][1])) {
            res.push(eightPos[i]);
        }
    }
    return res;
}


function getPosForRook(row, col) {
    const res = [];
    let rr = row + 1;
    while (rr < 8) {
        if (canBePlacedAtPos(rr, col)) {
            res.push([rr, col]);
        }
        else {
            break;
        }
        rr++;
    }
    rr = row - 1;
    while (rr >= 0) {
        if (canBePlacedAtPos(rr, col)) {
            res.push([rr, col]);
        }
        else {
            break;
        }
        rr--;
    }
    let cc = col + 1;
    while (cc < 8) {
        if (canBePlacedAtPos(row, cc)) {
            res.push([row, cc]);
        }
        else {
            break;
        }
        cc++;
    }
    cc = col - 1;
    while (cc >= 0) {
        if (canBePlacedAtPos(row, cc)) {
            res.push([row, cc]);
        }
        else {
            break;
        }
        cc--;
    }
    return res;
}


function getPosForBishop(row, col) {
    const res = [];
    let rr = row + 1, cc = col + 1;
    while (rr < 8 && cc < 8) {
        if (canBePlacedAtPos(rr, cc)) {
            res.push([rr, cc]);

        }
        else {
            break;
        }
        rr++;
        cc++;
    }


    rr = row - 1, cc = col + 1;
    while (rr >= 0 && cc < 8) {
        if (canBePlacedAtPos(rr, cc)) {

            res.push([rr, cc]);
        }
        else {
            break;
        }
        rr--;
        cc++;
    }

    rr = row + 1, cc = col - 1;
    while (rr < 8 && cc >= 0) {
        if (canBePlacedAtPos(rr, cc)) {

            res.push([rr, cc]);
        }
        else {
            break;
        }
        rr++;
        cc--;
    }

    rr = row - 1, cc = col - 1;
    while (rr >= 0 && cc >= 0) {
        if (canBePlacedAtPos(rr, cc)) {
            res.push([rr, cc]);
        }
        else {
            break;
        }
        rr--;
        cc--;
    }
    return res;
}

function getPosForWhitePawn(row, col) {
    const res = [];
    const ind = row * 8 + col;
    if (canBePlacedAtPos(row - 1, col)) {
        res.push([row - 1, col]);
        if (ind >= 48 && ind <= 55 && canBePlacedAtPos(row - 2, col)) {
            res.push([row - 2, col]);
        }
    }
    return res;
}

function getPosForBlackPawn(row, col) {
    const res = [];
    const ind = row * 8 + col;
    if (canBePlacedAtPos(row + 1, col)) {
        res.push([row + 1, col]);
        if (ind >= 8 && ind <= 15 && canBePlacedAtPos(row + 2, col)) {
            res.push([row + 2, col]);
        }
    }
    return res;
}


function getPosForQueen(row, col) {
    var rook_pos = getPosForRook(row, col);

    var bishop_pos = getPosForBishop(row, col);

    const res = rook_pos.concat(bishop_pos);

    return res;
}

function getPosForKing(row, col) {
    const res = [];
    let eightDirs = [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1], [row, col + 1], [row + 1, col + 1], [row + 1, col], [row + 1, col - 1], [row, col - 1]];
    console.log(eightDirs);
    for (let i = 0; i < eightDirs.length; i++) {
        if (canBePlacedAtPos(eightDirs[i][0], eightDirs[i][1])) {
            res.push(eightDirs[i]);
        }
    }
    return res;
}

function getMovablePositionsForPiece(piece, row, col) {
    var indicesToShowDots = [];
    console.log('piece is at row=' + row + ' and col=' + col);
    if (piece == 'pawn_black') {
        indicesToShowDots = getPosForBlackPawn(row, col);
    }
    else if (piece == 'pawn_white') {
        indicesToShowDots = getPosForWhitePawn(row, col);
    }
    else if (piece == 'rook_black' || piece == 'rook_white') {
        indicesToShowDots = getPosForRook(row, col);

    }
    else if (piece == 'knight_black' || piece == 'knight_white') {
        indicesToShowDots = getPosForKnight(row, col);
    }
    else if (piece == 'bishop_black' || piece == 'bishop_white') {
        indicesToShowDots = getPosForBishop(row, col);
    }
    else if (piece == 'queen_black' || piece == 'queen_white') {
        indicesToShowDots = getPosForQueen(row, col);
    }
    else if (piece == 'king_black' || piece == 'king_white') {
        indicesToShowDots = getPosForKing(row, col);
    }

    return indicesToShowDots;
}





function showDotsForClickedCell(i) {
    //console.log(tdElements[i].classList.toString());
    if (tdElements[i].classList.contains('activeCell')) {

        const piece = getPieceFromImageUrl(i);

        //console.log(piece);
        const row = Math.floor(i / 8), col = i % 8;
        movablePositions = getMovablePositionsForPiece(piece, row, col);
        console.log('movable positions are:-');
        console.log(movablePositions);
        const movableIndicesFromPos = [];
        for (let i = 0; i < movablePositions.length; i++) {
            const row = movablePositions[i][0], col = movablePositions[i][1];
            const index = row * 8 + col;
            movableIndicesFromPos.push(index);
        }
        console.log(movableIndicesFromPos);
        for (let i = 0; i < tdElements.length; i++) {
            let dotEle = tdElements[i].querySelector('.dot-element');

            if (movableIndicesFromPos.includes(i)) {

                if (!dotEle) {
                    console.log('adding dot to ' + i);
                    tdElements[i].appendChild(getDotElement());
                }
            }
            else if (dotEle) {
                dotEle.remove();
            }

        }
        // for (let i = 0; i < tdElements.length; i++) {
        //     if (movableIndicesFromPos.includes(i)) {
        //         console.log('adding ' + i);
        //         tdElements[index].appendChild(getDotElement());
        //     }

        // }
    }
}

function removeDotsForAPiece(piece,row,col) {
    const getPiecePos=getMovablePositionsForPiece(piece,row,col);
    for(let i=0;i<getPiecePos.length;i++) {
        const ind=getPiecePos[i][0]*8+getPiecePos[i][1];
        const dotEle = tdElements[ind].querySelector('.dot-element');
        dotEle.remove();
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
        const piece = getPieceFromImageUrl(i);
        const row = Math.floor(i / 8), col = i % 8;
        removeDotsForAPiece(piece, row, col);

        previouslyActiveCellIndex = -1;
    }
    else {
        console.log('adding active bg');
        tdElements[i].classList.add('activeCell');
        previouslyActiveCellIndex = i;
    }
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