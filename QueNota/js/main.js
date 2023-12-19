const component = (i) => {
    return `<div class="row col-8 mark-container">
    <p class="m-0"><b>Nota ${i}:</b></p>
    <div class="row column-gap-2">
        <input type="text" class="mark-value col-8 p-2 border border-dark border-2 border-opacity-50 rounded" placeholder="1.0 - 7.0">
        <input type="number" class="mark-percent col-3 p-2 placeholder-center border border-dark border-2 border-opacity-50 rounded" placeholder="%">
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

const addMark = () => {
    const newMarkHTML = component(document.getElementsByClassName('mark-container').length);
    const parser = new DOMParser();
    const newMarkElement = parser.parseFromString(newMarkHTML, 'text/html').body.firstChild;
    document.body.appendChild(newMarkElement);
}

const init = (k) => {
    for (let i = 0; i < k; i++) {
        document.getElementById('content').innerHTML += component(i+1)
    }
}

init(4)