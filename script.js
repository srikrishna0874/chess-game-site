
const tdElements = document.getElementsByTagName('TD');
// console.log(tdElements.length);


for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].addEventListener('mouseenter', () => {
        //for showing dots
        if (tdElements[i].querySelector('img')) {
            tdElements[i].classList.add('showCursorPointer');
            tdElements[i].addEventListener('click', () => {
                if(tdElements[i].classList.contains('activeCell')) {
                    console.log('already active');
                    tdElements[i].classList.remove('activeCell');
                }
                else {
                    console.log('adding active bg');
                    tdElements[i].classList.add('activeCell');
                }
            });
        }
        //for placing pieces
        else {

        }
    });
}



function getImageElement(image_name) {
    const img = document.createElement('img');
    img.src = "assets/images/" + image_name + ".png";
    return img;
}



function initialBoard() {
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