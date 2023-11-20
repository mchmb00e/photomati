const d = document
const cel = d.getElementsByClassName('cel-content')
const optionShow = d.getElementsByClassName('option-1-select')
const matrix = {
    'DOM': d.getElementById('matrix-content'),
    'content': [],
    'component': '<div class="cel-content"></div>',
    'controller': [],
    'size': [],
    'celSelect': null,
}
const btnColRow = d.getElementsByClassName('btn-show-col-row')
let keyModifySelect
let sizeAux = []

const changeSize = (x) => {
    if (x == '2') {
        sizeAux = matrix.size
        d.getElementsByClassName('popup-col-row')[0].style.display = 'flex'
        d.getElementsByClassName('tap-block')[0].style.display = 'block'
    } else if (x == '0') {
        d.getElementsByClassName('popup-col-row')[0].style.display = 'none'
        d.getElementsByClassName('tap-block')[0].style.display = 'none'
        sizeAux = matrix.size
    } else if (x == '1') {
        d.getElementsByClassName('popup-col-row')[0].style.display = 'none'
        d.getElementsByClassName('tap-block')[0].style.display = 'none'
        matrix.size[0] = sizeAux[0]
        matrix.size[1] = sizeAux[1]
        makeMatrix()
    }
}
const makeMatrix = () => {
    console.log(matrix.size)
    console.log(sizeAux)
    matrix.content = []
    for(let i = 0; i < matrix.size[0]; i++) {
        matrix.content[i] = []
        for (let j = 0; j < matrix.size[1]; j++) {
            matrix.content[i][j] == "";
        }
    }
    showMatrix()
}
const lengthMatrix = (M) => {
    var k = 0;
    var len = matrix.size[0];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < matrix.size[1] ; j++) {
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
const component = (i) => {
    return '<div class="cel-content" onclick="selectCel(' + i + ')"></div>'
}
const showMatrix = () => {
    matrix.DOM.innerHTML = "";
    let p = 0;
    let i = 0;
    let areaAux = matrix.size[0] * matrix.size[1]
    matrix.DOM.style.gridTemplateRows = 'repeat(' + matrix.size[0] + ', 35px)'
    matrix.DOM.style.gridTemplateColumns = 'repeat(' + matrix.size[1] + ', 35px)'
    while (i < areaAux) {
        matrix.DOM.innerHTML += component(i)
        i++
    }
    for (let i = 0; i < matrix.size[0]; i++) {
        for (let j = 0; j < matrix.size[1]; j++) {
            cel[p].innerHTML = matrix.content[i][j];
            p++;
        }
    }
    for (let i = 0; i < areaAux; i++) {
        cel[i].innerHTML = "";
    }
}

const keyPress = (key) => {
    let component = ['btnDown 600ms linear forwards', 'btnUp 600ms linear forwards']
    var aux
    if (key == 'row') {
        d.getElementById('select-h2-content').innerHTML = 'fila'
        btnColRow[0].style.animation = component[1]
        btnColRow[1].style.animation = component[0]
        keyModifySelect = 0
    } else if (key == 'col') {
        d.getElementById('select-h2-content').innerHTML = 'columna'
        btnColRow[0].style.animation = component[0]
        btnColRow[1].style.animation = component[1]
        keyModifySelect = 1
    } else if (key == 'left-change' && btnColRow[keyModifySelect].innerHTML > '1') {
        sizeAux[keyModifySelect] -= 1
        btnColRow[keyModifySelect].innerHTML = sizeAux[keyModifySelect]
    } else if (key == 'right-change') {
        sizeAux[keyModifySelect] += 1
        btnColRow[keyModifySelect].innerHTML = sizeAux[keyModifySelect]
    } else if (key == 'right') {
        if (matrix.celSelect == matrix.size[0]*matrix.size[1]-1) {
            selectCel(0)
        } else {
            selectCel(matrix.celSelect + 1)
        }
    } else if (key == 'left') {
        if (matrix.celSelect == 0) {
            selectCel(matrix.size[0]*matrix.size[1]-1)
        } else {
            selectCel(matrix.celSelect - 1)
        }
    } else if (key == 'up') {
        aux = matrix.celSelect
        for (let i = 0; i < matrix.size[1]; i++) {
            if (aux == parseInt('-1')) {
                aux = matrix.size[0]*matrix.size[1]-1
            }
            aux = aux - 1
        }
        selectCel(aux)
    } else if (key == 'down') {
        aux = matrix.celSelect
        for (let i = 0; i < matrix.size[1]; i++) {
            if (aux == matrix.size[0]*matrix.size[1]) {
                aux = 0
            }
            aux = aux + 1
        }
        console.log("size: " + matrix.size[0]*matrix.size[1])
        selectCel(aux)
    } else if (key == 'reset') {
        aux = 0;
        cel[matrix.celSelect].innerHTML = ""
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; i < matrix.size[1]; i++) {
                if (aux == celSelect) {
                    matrix.content[i][j] = ""
                }
            }
        }
    } else if (0 <= key && key <= 9) {
        aux = 0
        cel[matrix.celSelect].innerHTML += key
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; i < matrix.size[1]; i++) {
                if (aux == celSelect) {
                    matrix.content[i][j] += toString(key)
                }
            }
        }
    }
}

const selectCel = (x) => {
    console.log(x)
    let aux  = matrix.celSelect
    cel[aux].style.border = '1px solid #C1143A'
    cel[aux].style.color = 'black'
    cel[x].style.border = '2px solid #C1143A'
    cel[x].style.color = '#C1143A'
    matrix.celSelect = x
}
//INIT

matrix.content = [[null,null,null],[null,null,null],[null,null,null]];

matrix.celSelect = 0;
sizeAux = [3, 3]
matrix.size = [3, 3]
changeMatrix(0)
showMatrix()
keyPress('row')
selectCel(4)
