const d = document;
const cel = d.getElementsByClassName('cel-content');
const celExp = d.getElementsByClassName('expanded-cel');
const optionShow = d.getElementsByClassName('option-1-select');
const btnColRow = d.getElementsByClassName('btn-show-col-row');
let keyModifySelect;
let sizeAux = [];

const matrix = {
    'DOM': d.getElementById('matrix-content'),
    'content': [],
    'component': '<div class="cel-content"></div>',
    'controller': [],
    'size': [],
    'celSelect': null,
    'matrixAux': [],
    'mode': null,
    'operation': null
};

const toRational = (s) => {
    if (typeof s === 'string' && s.includes('/')) {
        const [num, den] = s.split('/').map(Number);
        return { num, den };
    } else {
        const num = Number(s);
        const den = 1;
        return { num, den };
    }
};

const changeSize = (x) => {
    if (x == '2') {
        sizeAux = matrix.size;
        d.getElementsByClassName('popup-col-row')[0].style.display = 'flex';
        d.getElementsByClassName('tap-block')[0].style.display = 'block';
    } else if (x == '0') {
        d.getElementsByClassName('popup-col-row')[0].style.display = 'none';
        d.getElementsByClassName('tap-block')[0].style.display = 'none';
        sizeAux = matrix.size;
    } else if (x == '1') {
        d.getElementsByClassName('popup-col-row')[0].style.display = 'none';
        d.getElementsByClassName('tap-block')[0].style.display = 'none';
        matrix.size[0] = sizeAux[0];
        matrix.size[1] = sizeAux[1];
        makeMatrix();
    }
};

const makeMatrix = () => {
    matrix.content = [];
    for (let i = 0; i < matrix.size[0]; i++) {
        matrix.content[i] = [];
        for (let j = 0; j < matrix.size[1]; j++) {
            matrix.content[i][j] = "";
        }
    }
    showMatrix();
};

const lengthMatrix = (M) => {
    return matrix.size[0] * matrix.size[1];
};

const changeMatrix = (x) => {
    optionShow[x].style.backgroundColor = '#C1143A';
    optionShow[x].style.color = 'white';
    if (x == 0) {
        optionShow[1].style.backgroundColor = 'white';
        optionShow[1].style.color = '#C1143A';
        if (matrix.mode == 'system') {
            matrix.size[1]--;
        }
        matrix.mode = 'matrix';
    } else {
        optionShow[0].style.backgroundColor = 'white';
        optionShow[0].style.color = '#C1143A';
        if (matrix.mode == 'matrix') {
            matrix.size[1]++;
        }
        matrix.mode = 'system';
    }
    makeMatrix();
};

const component = (i) => {
    return '<div class="cel-content" onclick="selectCel(' + i + ')"></div>';
};

const varSystemComponent = (k) => {
    let letter = ['a', 'b', 'c', 'd', 'e'];
    let str = '';
    for (let i = 0; i < k; i++) {
        str += '<div>' + letter[i] + '</div>';
    }
    return str;
}

/*
<div class="drop-div">
          <p id="1">
            Paso 3
          </p>
        </div>
        <span cont-id="cont_1">
          <h2>Realizamos operaciones fila:</h2>
          <div class="matrix">
            <div class="celda-step">1</div>
            <div class="celda-step">2</div>
            <div class="celda-step">3</div>
            <div class="celda-step">4</div>
            <div class="celda-step">5</div>
            <div class="celda-step">6</div>
            <div class="celda-step">7</div>
            <div class="celda-step">8</div>
            <div class="celda-step">9</div>
          </div>
          <div class="steps-string">
            <ol type="1">
              <li>F1 - 3 F2 -> F1</li>
              <li>F3 - 3 F2 -> F3</li>
            </ol>
          </div>
        </span>
*/
const stepsComponent = (c, A, P, msg, r) => {
    let component = `<div class="drop-div"><p id="1">Paso ${c}</p></div><span><h2>${msg}</h2><div class="matrix">`;
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            component += `<div class="celda-step">${A[i][j]}</div>`;
        }
    }
    component += `</div><div class="steps-string"><ol type="1">`;
    for (let i = 0; i < P.length; i++) {
        component += `<li>${P[i]}</li>`;
    }
    component += `</ol></div><div class="range-aux"></div></span>`;

    return component;
}

const showMatrix = () => {
    matrix.DOM.innerHTML = null;
    d.querySelector('.sys').innerHTML = '';
    if (matrix.mode == 'system') {
        d.querySelector('.sys').innerHTML = varSystemComponent(matrix.size[1]-1);
    }
    let p = 0;
    let i = 0;
    let areaAux = matrix.size[0] * matrix.size[1];
    matrix.DOM.style.gridTemplateRows = 'repeat(' + matrix.size[0] + ', 35px)';
    matrix.DOM.style.gridTemplateColumns = 'repeat(' + matrix.size[1] + ', 35px)';
    while (i < areaAux) {
        matrix.DOM.innerHTML += component(i);
        i++;
    }
    for (let i = 0; i < matrix.size[0]; i++) {
        for (let j = 0; j < matrix.size[1]; j++) {
            cel[p].innerHTML = matrix.content[i][j];
            if (j == matrix.size[1] - 1 && matrix.mode == 'system') {
                cel[p].style.position = 'relative';
                cel[p].style.left = '10px';
            }
            p++;
        }
    }

};

const keyPress = (key) => {
    console.log("KEY: " + key)
    let component = ['btnDown 600ms linear forwards', 'btnUp 600ms linear forwards'];
    var aux;
    if (key == 'row') {
        d.getElementById('select-h2-content').innerHTML = 'fila';
        btnColRow[0].style.animation = component[1];
        btnColRow[1].style.animation = component[0];
        keyModifySelect = 0;
    } else if (key == 'col') {
        d.getElementById('select-h2-content').innerHTML = 'columna';
        btnColRow[0].style.animation = component[0];
        btnColRow[1].style.animation = component[1];
        keyModifySelect = 1;
    } else if (key == 'left-change' && btnColRow[keyModifySelect].innerHTML > '1') {
        sizeAux[keyModifySelect] -= 1;
        btnColRow[keyModifySelect].innerHTML = sizeAux[keyModifySelect];
    } else if (key == 'right-change' && btnColRow[keyModifySelect].innerHTML < '5') {
        sizeAux[keyModifySelect] += 1;
        btnColRow[keyModifySelect].innerHTML = sizeAux[keyModifySelect];
    } else if (key == 'right') {
        if (matrix.celSelect == matrix.size[0] * matrix.size[1] - 1) {
            selectCel(0);
        } else {
            selectCel(matrix.celSelect + 1);
        }
    } else if (key == 'left') {
        if (matrix.celSelect == 0) {
            selectCel(matrix.size[0] * matrix.size[1] - 1);
        } else {
            selectCel(matrix.celSelect - 1);
        }
    } else if (key == 'up') {
        aux = matrix.celSelect;
        for (let i = 0; i < matrix.size[1]; i++) {
            if (aux == parseInt('-1')) {
                aux = matrix.size[0] * matrix.size[1] - 1;
            }
            aux = aux - 1;
        }
        selectCel(aux);
    } else if (key == 'down') {
        aux = matrix.celSelect;
        for (let i = 0; i < matrix.size[1]; i++) {
            if (aux == matrix.size[0] * matrix.size[1]) {
                aux = 0;
            }
            aux = aux + 1;
        }
        selectCel(aux);
    } else if (key == 'reset') {
        aux = 0;
        cel[matrix.celSelect].innerHTML = "";
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; j < matrix.size[1]; j++) {
                if (aux == matrix.celSelect) {
                    matrix.content[i][j] = "";
                }
                aux++;
            }
        }
    } else if (0 <= key && key <= 9) {
        aux = 0;
        cel[matrix.celSelect].innerHTML += key;
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; j < matrix.size[1]; j++) {
                if (aux == matrix.celSelect) {
                    matrix.content[i][j] += key;
                    console.log("Key: " + matrix.content[i][j]);
                }
                aux++;
            }
        }
    } else if (key == '/') {
        aux = false;
        for (let i = 0; i < cel[matrix.celSelect].innerHTML.length; i++) {
            if (cel[matrix.celSelect].innerHTML[i] == '/') {
                aux = true;
            }
        }
        if (!aux && cel[matrix.celSelect].innerHTML.length != 0) {
            cel[matrix.celSelect].innerHTML += '/';
        }
    } else if (key == 'done' && isFull() && matrix.operation != null && matrix.mode == 'matrix') {
        aux = [];
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; j < matrix.size[1]; j++) {
                aux[i][j] = toRational(matrix.content[i][j]);
            }
        }
        showSteps(aux);
    } else if (key == 'gaussJordan') {
        matrix.operation = 'gaussJordan'
        d.getElementById('reverse-btn').style.backgroundColor = 'White';
        d.getElementById('reverse-btn').style.color = '#C1143A';
        d.getElementById('gauss-jordan-btn').style.backgroundColor = '#C1143A';
        d.getElementById('gauss-jordan-btn').style.color = 'White';
    } else if (key == 'reverse') {
        matrix.operation = 'reverse'
        d.getElementById('reverse-btn').style.backgroundColor = '#C1143A';
        d.getElementById('reverse-btn').style.color = 'White';
        d.getElementById('gauss-jordan-btn').style.backgroundColor = 'White';
        d.getElementById('gauss-jordan-btn').style.color = '#C1143A';
    }
};
const resetOperation = () => {
    matrix.operation = null;
    d.getElementById('reverse-btn').style.backgroundColor = 'White';
    d.getElementById('reverse-btn').style.color = '#C1143A';
    d.getElementById('gauss-jordan-btn').style.backgroundColor = 'White';
    d.getElementById('gauss-jordan-btn').style.color = '#C1143A';
};
const selectCel = (x) => {
    let aux = matrix.celSelect;
    for (let i = 0; i < matrix.size[0]*matrix.size[1]; i++) {
        cel[i].style.border = '1px solid #C1143A';
        cel[i].style.color = 'black';
    }
    for (let i = 0; i < celExp.length; i++) {
        celExp[i].style.border = '1px solid #C1143A';
        celExp[i].style.color = 'black';
    }
    if (typeof(x) == 'number') {
        cel[x].style.border = '2px solid #C1143A';
        cel[x].style.color = '#C1143A';
    } else if (typeof(x) == 'string') {
        celExp[Number(x[1])].style.border = '2px solid #C1143A';
        celExp[Number(x[1])].style.color = '#C1143A';
        
    }
    matrix.celSelect = x;
};

const isFull = () => {
    for (let i = 0; i < matrix.size[0]; i++) {
        for (let j = 0; j < matrix.size[1]; j++) {
            if (matrix.content[i][j] == "") {
                console.log('Faltan datos.')
                return false;
            }
        }
    }
    return true;
};
const rationalToString = (num, den) => {
    let auxNum = num.toString()
    let auxDen = den.toString()
    if (num == 0) {
        return '0'
    }
    if (num == den) {
        return '1'
    }
    if (den == 1) {
        return auxNum
    }
    return `${auxNum}<hr style="margin: 0px; padding: 0px; border: 1px solid #C1143A; width: 100%;">${auxDen}`
}
const showSteps = (A) => {
    if (A == 0) {
        d.getElementById('main').style.filter = 'blur(0px)'
        d.querySelector('.tap-block').style.display = 'none'
        d.getElementById('showResult').style.display = 'none'
    } else {
        d.getElementById('main').style.filter = 'blur(2px)'
        d.querySelector('.tap-block').style.display = 'block'
        let steps = gaussJordan(A)
        let aux = []
        console.log(steps)
        let content = d.querySelector('.drop')
        let dom = d.getElementById('showResult')
        dom.style.display = 'grid';
        content.innerHTML = '';
        matrix.mode = 'matrix'
        matrix.operation = 'gaussJordan'
        console.log(steps.length)
        if (matrix.mode == 'matrix' && matrix.operation == 'gaussJordan') {
            for (let i = 0; i < steps.length; i++) {
                aux = [[],[],[]]
                for (let x = 0; x < steps[i].resultado.length; x++) {
                    for (let y = 0; y < steps[i].resultado[0].length; y++) {
                        aux[x][y] = rationalToString(steps[i].resultado[x][y].num, steps[i].resultado[x][y].den)
                    }
                }
                if (i == steps.length - 1) {
                    content.innerHTML += stepsComponent('final', aux, steps[i].operaciones, 'Por lo tanto, la matriz escalonada es:')
                    d.getElementsByClassName('range-aux')[i].innerHTML = `Así, el rango de la matríz es: ${rango(steps[i].resultado)}.`
                } else if (i == 0) {
                    content.innerHTML += stepsComponent('inicial', aux, steps[i].operaciones, 'Mediante Gauss-Jordan reduciremos la siguiente matríz: ')
                } else {
                    content.innerHTML += stepsComponent(i+1, aux, steps[i].operaciones, 'Realizamos las operaciones fila correspondientes: ')
                }
            }
            for (let i = 0; i < d.getElementsByClassName('matrix').length; i++) {
                d.getElementsByClassName('matrix')[i].style.gridTemplateRows = `repeat(${matrix.size[0]}, 30px)`
                d.getElementsByClassName('matrix')[i].style.gridTemplateColumns = `repeat(${matrix.size[1]}, 30px)`
            }
        }
    }
};

matrix.content = [["", "", ""], ["", "", ""], ["", "", ""]];
matrix.expanded = ["", "", ""];
sizeAux = [3, 3];
matrix.size = [3, 3];
matrix.mode = 'matrix';
changeMatrix(0);
keyPress('row');
matrix.celSelect = 3;
makeMatrix();
keyPress('up');