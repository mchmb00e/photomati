// Matrices de prueba

let mat1 = [
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0],
];

let mat2 = [
  [1, 0, 4, 5],
  [0, 2, 6, 8],
  [8, 9, 4, 9],
];

let mat3 = [
  [3, 0, 3, 3, 3],
  [-3, 1, -2, -4, -1],
  [-5, 4, 9, 1, 13],
  [7, 6, 13, 1, 19]
];

// Funciones fracciones

const enteroAFraccion = (entero) => {
  return {num: entero, den: 1};
}

const matrizEnterosAFraccion = (matriz) => {
  return matriz = matriz.map((fila) => fila.map((elemento) => enteroAFraccion(elemento)));
}

const formatoFraccion = (frac) => frac.num + (frac.den === 1 ? "" : "/" + frac.den);

const mcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);

  if (x < y) {
    let aux = x;
    x = y;
    y = aux;
  }

  while (true) {
    if (y == 0) return x;
    x %= y;
    if (x == 0) return y;
    y %= x;
  }
}

const mcm = (a, b) => a * b / mcd(a, b); 

const reducir = (frac) => {
  if (frac.num === 0) return {num: 0, den: 1};
  if (frac.num !== 0 && frac.den < 0) {
    frac.num = -frac.num;
    frac.den = -frac.den;
  }
  let divisor = mcd(frac.num, frac.den);
  return {num: frac.num / divisor, den: frac.den / divisor};
}

const sumar = (frac1, frac2) => {
  denominador = mcm(frac1.den, frac2.den);
  let factor1 = denominador / frac1.den;
  let factor2 = denominador / frac2.den;

  let resultado = {num: (frac1.num * factor1) + (frac2.num * factor2), den: denominador};

  return reducir(resultado);
}

const multiplicar = (frac1, frac2) => {
  let resultado = {num: frac1.num * frac2.num, den: frac1.den * frac2.den};
  return reducir(resultado);
}

// Funciones matrices

const mostrar = (matriz) => {
  matriz.forEach((fila) => console.log(fila));
  console.log("");
}

const mostrarConFracciones = (matriz) => {
  matriz.forEach((fila) => {
    let linea = "[ ";
    fila.forEach((elemento) => linea += (formatoFraccion(elemento) + " "));
    linea += "]";
    console.log(linea);
  });
  console.log("");
}

const sumarFilas = (matriz, origen, destino, factor) => {
  matriz[destino - 1].forEach((elemento, i) => {
    let sumando = multiplicar(matriz[origen - 1][i], factor);
    matriz[destino - 1][i] = sumar(elemento, sumando);
  });
}

const intercambioFilas = (matriz, filaX, filaY) => {
  let aux = matriz[filaX - 1];
  matriz[filaX - 1] = matriz[filaY - 1];
  matriz[filaY - 1] = aux;
}

const multiplicarFila = (matriz, fila, factor) => {
  matriz[fila - 1].forEach((elemento, i) => {
    let resultado = multiplicar(elemento, factor);
    matriz[fila - 1][i] = resultado == 0 ? 0 : resultado;
  });
}

const encontrarFilaPivote = (matriz, filaDesde, columna) => {
  let numeroFila;
  for (let fila = filaDesde; fila <= matriz.length; fila++)
  {
    if (matriz[fila - 1][columna - 1].num === 1 && matriz[fila - 1][columna - 1].den === 1) {
      numeroFila = fila;
    }
  }
  return numeroFila;
}

const encontrarValorEnColumna = (matriz, filaDesde, columna) => {
  let numeroFila;
  for (let fila = filaDesde; fila <= matriz.length; fila++)
  {
    if (matriz[fila - 1][columna - 1].num !== 0) {
      numeroFila = fila;
    }
  }
  return numeroFila;
}

const gaussJordan = (matriz) => {
  let numeroFilas = matriz.length;
  let numeroColumnas = matriz[0].length;
  let filaActual = 1;
  let columnaActual = 1;

  let pasos = [];
  let pasoActual = {operaciones: [], resultado: [[]]};

  while (columnaActual <= numeroColumnas && filaActual <= numeroFilas) {
    let filaPivote = encontrarFilaPivote(matriz, filaActual, columnaActual);

    if (filaPivote) {
      if (filaActual !== filaPivote) {
        pasoActual.operaciones.push(`F${filaActual} <-> F${filaPivote}`);
        intercambioFilas(matriz, filaActual, filaPivote);
        pasoActual.resultado = matriz;
        pasos.push(pasoActual);
        pasoActual = {operaciones: [], resultado: [[]]};
      }


      let bandera = false;
      for (let fila = 1; fila <= numeroFilas; fila++) {
        let factor = multiplicar(matriz[fila - 1][columnaActual - 1], {num: -1, den: 1});
        if (factor.num !== 0 && fila !== filaActual) {
          bandera = true;
          let stringFactor = Math.abs(factor.num) / factor.den === 1 ? "" : formatoFraccion({num: Math.abs(factor.num), den: factor.den}) + " ";
          
          pasoActual.operaciones.push(`F${fila} ${factor.num < 0 ? "-" : "+"} ${stringFactor}F${filaActual} -> F${fila}`);
          sumarFilas(matriz, filaActual, fila, factor);
        }
      }

      if (bandera) {
        pasoActual.resultado = matriz;
        pasos.push(pasoActual);
      }

      pasoActual = {operaciones: [], resultado: [[]]};
      columnaActual++;
      filaActual++;
    } else {
      let valorActual = matriz[filaActual - 1][columnaActual - 1];

      if (valorActual.num !== 0) {
        let factor = reducir({num: valorActual.den, den: valorActual.num});
        pasoActual.operaciones.push(`${formatoFraccion(factor)} F${filaActual} -> F${filaActual}`);
        multiplicarFila(matriz, filaActual, factor);

        pasoActual.resultado = matriz;
        pasos.push(pasoActual);
      } else {
        let filaSiguienteValor = encontrarValorEnColumna(matriz, filaActual, columnaActual);

        if (filaSiguienteValor) {
          pasoActual.operaciones.push(`F${filaActual} <-> F${filaSiguienteValor}`);
          intercambioFilas(matriz, filaActual, filaSiguienteValor);
          pasoActual.resultado = matriz;
          pasos.push(pasoActual);
        } else {
          columnaActual++;
        }
      }
      pasoActual = {operaciones: [], resultado: [[]]};
    }
  }
  return pasos;
}

console.log(gaussJordan(matrizEnterosAFraccion(mat3)));