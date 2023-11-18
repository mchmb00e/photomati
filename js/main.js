const d = document
const cel = d.getElementsByClassName('cel-content')
const optionShow = d.getElementsByClassName('option-1-select')
const matrix = {
    'DOM': d.getElementById('matrix-content'),
    'content': [],
    'component': '<div class="cel-content"></div>',
    'controller': []
}

const lengthMatrix = (M) => {
    var k = 0;
    var len = matrix.content.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < matrix.content[0].length ; j++) {
            k++
        }
    }
    return k
}

const changeMatrix = (x) => {
    optionShow[x].style.backgroundColor = '#C1143A'
    optionShow[x].style.color = 'white'
    if (x == 0) {
        optionShow[1].style.backgroundColor = 'white'
        optionShow[1].style.color = '#C1143A'
    } else {
        optionShow[0].style.backgroundColor = 'white'
        optionShow[0].style.color = '#C1143A'
    }
}

const showMatrix = () => {
    let p = 0;
    matrix.DOM.style.gridTemplateRows = 'repeat(' + matrix.content.length + ', 35px)'
    matrix.DOM.style.gridTemplateColumns = 'repeat(' + matrix.content[0].length + ', 35px)'
    for (let i = 0; i < lengthMatrix(matrix.content); i++) {
        matrix.DOM.innerHTML += '<div class="cel-content" onclick="selectCel(' + i + ')"></div>'
    }
    for (let i = 0; i < matrix.content.length; i++) {
        for (let j = 0; j < matrix.content[0].length ; j++) {
            cel[p].innerHTML = matrix.content[i][j];
            p++;
        }
    }
}


//INIT

matrix.content = [[1,2,3],[4,5,6],[7,8,9]];

changeMatrix(0)
showMatrix()
