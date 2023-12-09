const d = document;
const cel = d.getElementsByClassName('cel-content');
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
}


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
        makeExpanded();
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

const makeExpanded = () => {
    matrix.expanded = [];
    for (let i = 0; i < matrix.size[0]; i++) {
        matrix.expanded[i] = "";
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
        matrix.mode = 'matrix';
    } else {
        optionShow[0].style.backgroundColor = 'white';
        optionShow[0].style.color = '#C1143A';
        matrix.mode = 'system';
    }
    showMatrix();
};

const component = (i) => {
    return '<div class="cel-content" onclick="selectCel(' + i + ')"></div>';
};

const systemComponent = (i) => {
    let str = "";
    for (let k = 0; k < i; k++) {
        str = str + '<div class="expanded-cel" style="width: 33px; height: 33px;" onclick="selectExpandedCel(' + k + ')"></div>';
    }
    return str;
};

const showMatrix = () => {
    matrix.DOM.innerHTML = null;
    d.getElementById('expanded').style.borderLeft = "none";
    d.getElementById('expanded').style.display = "none";
    if (matrix.mode == 'system') {
        d.getElementById('expanded').style.display = "grid";
        d.getElementById('expanded').style.borderLeft = "1px solid #C1143A";
        d.getElementById('expanded').style.gridTemplateRows = "repeat(" + matrix.size[0] + ", 35px)";
        d.getElementById('expanded').innerHTML = systemComponent(matrix.size[0]); 
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
            p++;
        }
        if (matrix.mode == 'system') {
            d.getElementsByClassName('expanded-cel')[i].innerHTML = matrix.expanded[i];
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
    } else if (key == 'right-change' && btnColRow[keyModifySelect].innerHTML < '4') {
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
    } else if (key == 'done') {
        showSteps();
    }
};

const selectCel = (x) => {
    let aux = matrix.celSelect;
    cel[aux].style.border = '1px solid #C1143A';
    cel[aux].style.color = 'black';
    cel[x].style.border = '2px solid #C1143A';
    cel[x].style.color = '#C1143A';
    matrix.celSelect = x;
};

const isFull = () => {
    for (let i = 0; i < matrix.size[0]; i++) {
        for (let j = 0; j < matrix.size[1]; j++) {
            if (matrix.content[i][j] == "") {
                return false;
            }
        }
    }
    return true;
};

const showSteps = (stp) => {
    // Tu implementación aquí
};

// INIT

/*
    return true
}

const formatoFraccionHTML = (frac) => {
    return frac.den === 1 ? frac.num : `<sup>${frac.num}</sup>&frasl;<sub>${frac.den}</sub>`;
}
const dropdownSteps = (i) => {
    return `<section class="drop">
    <div>
        <p id="1">
            Paso ${i}
        </p>
    </div>
    <span cont-id="cont_1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex maxime quasi dignissimos cumque libero alias consequuntur
    </span>
</section>
`
}
const showSteps = (A) => {
    let stepsContent = d.getElementById('steps');
    pasos = gaussJordan(A);
    console.log(pasos);
    for (let i = 0; i < pasos.length; i++) {
        stepsContent.innerHTML += dropdownSteps(i+1);
    }
}

let example = [
    ['1','2','-1'],
    ['0','-1','1'],
    ['7','0','3']
]
for (let i = 0; i < example.length; i++) {
    for (let j = 0; j < example[0].length; j++) {
        example[i][j] = toRational(example[i][j])
    }
}
*/

matrix.content = [["", "", ""], ["", "", ""], ["", "", ""]];
matrix.expanded = ["", "", ""];
matrix.celSelect = 0;
sizeAux = [3, 3];
matrix.size = [3, 3];
matrix.mode = 'matrix';
changeMatrix(0);
keyPress('row');
matrix.celSelect = 7;
makeMatrix();
keyPress('up');
console.log(gaussJordan(example));
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

console.log(example)
let pasos = gaussJordan(example);
console.log(pasos[pasos.length - 1].resultado);
console.log(analizarAmpliada(pasos[pasos.length - 1].resultado));

console.log(invertir(example));
