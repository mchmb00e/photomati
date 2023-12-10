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
    'expanded': [],
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
        d.getElementById('content-keyboard').innerHTML = keyboard.matrix
    } else {
        optionShow[0].style.backgroundColor = 'white';
        optionShow[0].style.color = '#C1143A';
        if (matrix.mode == 'matrix') {
            matrix.size[1]++;
        }
        matrix.mode = 'system';
        d.getElementById('content-keyboard').innerHTML = keyboard.system
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
        let component = `<div class="drop-div"><p id="1">Paso ${c}</p></div><span class="dropdown-content"><h2>${msg}</h2><div style="position: relative; right: 10px;" class="matrix">`;
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[0].length; j++) {
                if (matrix.operation == 'reverse' && j >= matrix.size[1]) {
                    component += `<div style="position: relative; left: 10px;" class="celda-step">${A[i][j]}</div>`;
                } else {
                    component += `<div class="celda-step">${A[i][j]}</div>`;
                }
            }
        }
        component += `</div><div class="steps-string" style="order: 2;">`;
        for (let i = 0; i < P.length; i++) {
            component += `<h6 style="font-size: 12px; margin: 0px;">${P[i]}</h6>`;
        }
        component += `</div><div class="range-aux"></div></span>`;
        
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
    } else if (isFull() && (key == 'gaussJordan' || key == 'reverse')) {
        aux = [[],[],[]];
        matrix.operation = key;
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; j < matrix.size[1]; j++) {
                aux[i][j] = toRational(matrix.content[i][j]);
            }
        }
        showSteps(aux);
    } else if (key == '-' && cel[matrix.celSelect].innerHTML.length == 0) {
        aux = 0;
        cel[matrix.celSelect].innerHTML += key;
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; j < matrix.size[1]; j++) {
                if (aux == matrix.celSelect) {
                    matrix.content[i][j] += key;
                }
                aux++;
            }
        }
    } else if (key == 'delete') {
        aux = 0;
        cel[matrix.celSelect].innerHTML = cel[matrix.celSelect].innerHTML.slice(0, cel[matrix.celSelect].innerHTML.length - 1)
        for (let i = 0; i < matrix.size[0]; i++) {
            for (let j = 0; j < matrix.size[1]; j++) {
                if (aux == matrix.celSelect) {
                    matrix.content[i][j] = cel[matrix.celSelect].innerHTML;
                }
                aux++;
            }
        }
    } else if (key == 'system-answer') {

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
            if (matrix.content[i][j] == "" || matrix.content[i][j] == '-') {
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
        let steps
        let aux = []
        let content = d.querySelector('.drop')
        let dom = d.getElementById('showResult')
        dom.style.display = 'grid';
        content.innerHTML = '';
        if (matrix.mode == 'matrix' && matrix.operation == 'gaussJordan') {
            steps = gaussJordan(A)
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
            activarDropdown();

        } else if (matrix.mode == 'matrix' && matrix.operation == 'reverse') {
            let infoInvertir = invertir(A)
            steps = infoInvertir.pasos
            aux = [[],[],[]]
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
                d.getElementsByClassName('matrix')[i].style.gridTemplateColumns = `repeat(${matrix.size[1]*2}, 30px)`
                d.getElementsByClassName('matrix')[i].style.order = `3`
            }
            for (let i = 0; i < d.getElementsByClassName('dropdown-content').length; i++) {
                d.getElementsByClassName('dropdown-content')[i].style.display = 'flex'
                d.getElementsByClassName('dropdown-content')[i].style.flexDirection = 'column'
                d.getElementsByClassName('dropdown-content')[i].style.alignItems = 'center'
                d.getElementsByClassName('dropdown-content')[i].style.gap = '0px'

            }
            activarDropdown();
        }
    }
}


let example = [
    ['2','3','4'],
    ['4','1','5'],
    ['9','4','1']
]
for (let i = 0; i < example.length; i++) {
    for (let j = 0; j < example[0].length; j++) {
        example[i][j] = toRational(example[i][j])
    }
}


matrix.content = [["", "", ""], ["", "", ""], ["", "", ""]];
matrix.expanded = ["", "", ""];
matrix.celSelect = 0;
sizeAux = [3, 3]
matrix.size = [3, 3]
matrix.mode = 'matrix'
changeMatrix(0)
keyPress('row')
matrix.celSelect = 7
makeMatrix()
keyPress('up')
matrix.operation = 'reverse'
showSteps(example)


/*
d.addEventListener("DOMContentLoaded", () => {
    let pasos = gaussJordan(example);
    let divPasos = d.getElementById("steps");
    divPasos.innerHTML += "<h3>Matriz original</h3>";
    divPasos.style.fontWeight = "bold";
    divPasos.style.overflowY = "scroll";
    pasos.forEach((paso) => {
        let pOperaciones = d.createElement("p");
        let divMatriz = d.createElement("div");
        divMatriz.style.width = "25%";
        divMatriz.style.borderLeft = "2px solid black";
        divMatriz.style.borderRight = "2px solid black";
        divMatriz.style.borderRadius = "5%";
        divMatriz.style.marginBottom = "50px";
        divMatriz.style.padding = "10px";
        paso.operaciones.forEach((operacion) => pOperaciones.innerHTML += `${operacion}<br>`);
        paso.resultado.forEach((fila) => {
            let divFila = d.createElement("div");
            divFila.style.display = "flex";
            divFila.style.justifyContent = "space-between";
            divFila.style.margin = "10px 0px 10px 0px";
            divFila.innerHTML += fila.reduce((resultado, elemento) => {
                return resultado + `<div>${formatoFraccionHTML(elemento)}</div>`;
            }, "");
            divMatriz.appendChild(divFila);
        });
        divPasos.appendChild(pOperaciones);
        divPasos.appendChild(divMatriz);
    });

});
*/