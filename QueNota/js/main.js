let getMarkCheck;

const component = (i) => {
    return `<div class="row col-8 mark-container">
    <p class="m-0"><b>Nota ${i}:</b></p>
    <div class="row column-gap-2">
        <input type="text" class="mark-value col-8 p-2 border border-dark border-2 border-opacity-50 rounded" placeholder="1.0 - 7.0">
        <input type="number" class="mark-percent text-center col-3 p-2 placeholder-center border border-dark border-2 border-opacity-50 rounded" placeholder="%">
    </div>
</div>`
}

const deleteMark = () => {
    if (document.getElementsByClassName('mark-container').length > 1) {
        let aux = Array.from(document.getElementsByClassName('mark-container'));
        if (aux.length > 0) {
            aux.pop().remove();
        }
    }
}

const addMark = () => { document.getElementById('content').innerHTML += component(document.getElementsByClassName('mark-container').length + 1) }

const init = (k) => {
    for (let i = 0; i < k; i++) {
        addMark()
    }
}

function createArrayFromMark(str) {
    const regex = /\d+(\.\d*)?/g;
    const numbers = str.match(regex);
    if (!numbers) {
      return [];
    }
    return numbers.map(parseFloat);
  }

const getMark = () => {
    if (getMarkCheck) {
        let percentDOM = document.getElementsByClassName('mark-percent')
        let markDOM = document.getElementsByClassName('mark-value');
        let mark = []
        let contain = 0;
        for (let i = 0; i < markDOM.length; i++) {
            if (markDOM[i].value.includes('/')) {
                mark[i] = {'value': createArrayFromMark(markDOM[i].value), 'percent': parseInt(percentDOM[i].value)}
            } else {
                mark[i] = {'value': parseFloat(markDOM[i].value), 'percent': parseInt(percentDOM[i].value)}
            }
        }
        
    }
}

const getMarkBtn = (a) => {
    let x = document.getElementById('btn-get-mark')
    if (a) {
        x.classList.add("btn-primary")
        x.classList.remove("btn-secondary")
        getMarkCheck = true
    } else {
        x.classList.remove("btn-primary")
        x.classList.add("btn-secondary")
        getMarkCheck = false
    }
}

function verifyMark(str) {
    // Utilizamos una expresión regular para verificar el formato
    const regex = /^(\d+(\.\d*)?\/)+\d+(\.\d*)?$|^\d+(\.\d*)?$/;
  
    // Comprobamos si el string cumple con el formato
    return regex.test(str);
  }
  

const verify = () => {
    let sumPercent = 0
    let percentDOM = document.getElementsByClassName('mark-percent')
    let markDOM = document.getElementsByClassName('mark-value');
    let checkMarkDOM = true

    for (let i = 0; i < percentDOM.length; i++) {
        if (parseInt(percentDOM[i].value) == NaN) {
            sumPercent += 0
        } else {
            sumPercent += parseInt(percentDOM[i].value)
        }
    }

    for (let i = 0; i < markDOM.length; i++) {
        if (!verifyMark(markDOM[i].value)) {
            checkMarkDOM = false
        }
    }

    if (checkMarkDOM && sumPercent > 0) {
        getMarkBtn(true)
    } else {
        getMarkBtn(false)
    }

}

init(4)
let interval = setInterval(verify, 200)