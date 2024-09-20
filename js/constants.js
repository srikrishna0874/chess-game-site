


function getDotElement() {
    const dot = document.createElement('div');
    dot.classList.add('dot-element');
    return dot;
}


function canBePlacedAtPos(row, col) {
    index = row * 8 + col;
    if (row >= 8 || col >= 8 || row < 0 || col < 0) {
        return false;
    }
    //console.log('to check: ' + 'row= ' + row + ' and col= ' + col);
    //console.log('index= ' + index);
    if (row < 8 && col < 8) {
        if (tdElements[index].querySelector('img')) {
            return false;
        }

    }
    return true;
}



function getPieceFromImageUrl(index) {
    const img = tdElements[index].querySelector('img');
    const imgSrc = img.getAttribute('src');
    //console.log(imgSrc);
    const piece_image = imgSrc.substring(14);
    const piece = piece_image.split('.')[0];
    return piece;
}


function getImageUrlFromPiece(piece) {
    return "assets/images/"+piece+".png";
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


function removeAllDots() {
    for(let i=0;i<tdElements.length;i++) {
        const dotElement=tdElements[i].querySelector('.dot-element');
        if(dotElement) {
            dotElement.remove();
        }
    }
}


