// FUCIONES FRACCIONES

// Función que entrega la representación en caracteres de una fracción
const formatoFraccion = (frac) => frac.num + (frac.den === 1 ? "" : "/" + frac.den);

// Algoritmo euclideano mejorado para encontrar máximo común divisor
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

// Función mínimo común múltiplo
const mcm = (a, b) => a * b / mcd(a, b); 

// Función para reducir una fracción
const reducir = (frac) => {
  if (frac.num === 0) return {num: 0, den: 1};
  if (frac.num !== 0 && frac.den < 0) {
    frac.num = -frac.num;
    frac.den = -frac.den;
  }
  let divisor = mcd(frac.num, frac.den);
  return {num: frac.num / divisor, den: frac.den / divisor};
}

// Suma de fracciones
const sumar = (frac1, frac2) => {
  denominador = mcm(frac1.den, frac2.den);
  let factor1 = denominador / frac1.den;
  let factor2 = denominador / frac2.den;

  let resultado = {num: (frac1.num * factor1) + (frac2.num * factor2), den: denominador};

  return reducir(resultado);
}

// Multiplicación de fracciones
const multiplicar = (frac1, frac2) => {
  let resultado = {num: frac1.num * frac2.num, den: frac1.den * frac2.den};
  return reducir(resultado);
}

// FUNCIONES DE MATRICES

// Función que entrega una copia de una matriz
const copiarMatriz = (matriz) => matriz.slice().map(fila => fila.slice());

// Función que suma una fila a otra, multiplicada por un factor
const sumarFilas = (matriz, origen, destino, factor) => {
  matriz[destino - 1].forEach((elemento, i) => {
    let sumando = multiplicar(matriz[origen - 1][i], factor);
    matriz[destino - 1][i] = sumar(elemento, sumando);
  });
}

// Función que intercabia las filas de una matriz
const intercambioFilas = (matriz, filaX, filaY) => {
  let aux = matriz[filaX - 1];
  matriz[filaX - 1] = matriz[filaY - 1];
  matriz[filaY - 1] = aux;
}

// Función que multiplica todos los elementos de una fila por un factor
const multiplicarFila = (matriz, fila, factor) => {
  matriz[fila - 1].forEach((elemento, i) => {
    let resultado = multiplicar(elemento, factor);
    matriz[fila - 1][i] = resultado == 0 ? 0 : resultado;
  });
}

// Función que encuentra un 1 en una columna de una matriz
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

// Función que encuentra el primer valor no nulo siguiente en una columna 
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

// Función que convierte una matriz a su versión escalonada reducida por filas
const gaussJordan = (matriz) => {
  // Obteniendo orden de la matriz
  let numeroFilas = matriz.length;
  let numeroColumnas = matriz[0].length;
  // Copiando matriz
  let copiaMatriz = copiarMatriz(matriz);
  // Arreglo de pasos para llegar al resultado
  let pasos = [];
  // Ingresamos en el primer paso la matriz original sin operaciones
  pasos.push({operaciones: [], resultado: copiarMatriz(matriz)});
  // Preparamos una variable que guardará el paso actual del algoritmo
  let pasoActual = {operaciones: [], resultado: []};
  
  
  // Comenzamos en el elemento 1,1
  let filaActual = 1;
  let columnaActual = 1;
  // Mientras estemos dentro de la matriz
  while (columnaActual <= numeroColumnas && filaActual <= numeroFilas) {
    // Intentamos encontrar un pivote dentro la columna (1)
    let filaPivote = encontrarFilaPivote(copiaMatriz, filaActual, columnaActual);

    // Si se encontró un pivote
    if (filaPivote) {
      // Si el pivote está en una fila diferente a la actual
      if (filaActual !== filaPivote) {
        // Intercambiamos la fila por la fila del pivote
        intercambioFilas(copiaMatriz, filaActual, filaPivote);
        // Ingresamos el mensaje de la operación al paso actual
        pasoActual.operaciones.push(`F${filaActual} <-> F${filaPivote}`);
        // Guardamos el resultado de la operación
        pasoActual.resultado = copiarMatriz(copiaMatriz);
        // Ingresamos el paso actual al arreglo de pasos
        pasos.push(pasoActual);
        // Limpiamos el paso actual
        pasoActual = {operaciones: [], resultado: []};
      }

      // Bandera que identifica si se generaron operaciones fila en el paso actual
      let banderaOperaciones = false;
      // Revisamos la columna fila por fila para hacer ceros con el pivote
      for (let fila = 1; fila <= numeroFilas; fila++) {
        // Si no es la fila pivote y el valor de la fila es distinto de cero 
        if (fila !== filaActual && copiaMatriz[fila - 1][columnaActual - 1].num !== 0) {
          // Encontramos el factor por el cual tendremos que multiplicar 
          // la fila pivote para generar ceros en la columna
          let factor = multiplicar(copiaMatriz[fila - 1][columnaActual - 1], {num: -1, den: 1});
          // Generamos un cero sumando la fila multiplicada por el factor
          sumarFilas(copiaMatriz, filaActual, fila, factor);
          // Formateamos el factor para el mensaje de la operación actual
          let stringFactor = Math.abs(factor.num) / factor.den === 1 ? "" : formatoFraccion({num: Math.abs(factor.num), den: factor.den}) + " ";
          // Agregamos la operación actual al paso actual
          pasoActual.operaciones.push(`F${fila} ${factor.num < 0 ? "-" : "+"} ${stringFactor}F${filaActual} -> F${fila}`);
          // Marcamos que se realizaron operaciones
          banderaOperaciones = true;
        }
      }

      // Una vez realizadas las operaciones
      if (banderaOperaciones) {
        // Guardamos la matriz resultante del paso actual
        pasoActual.resultado = copiarMatriz(copiaMatriz);
        // Guardamos el paso completo con sus operaciones
        pasos.push(pasoActual);
      }
      // Limpiamos el paso actual
      pasoActual = {operaciones: [], resultado: []};
      // Avanzamos una columna y una fila
      filaActual++;
      columnaActual++;
    } else { // En el caso de que no exista pivote
      // Obtenemos el valor correspondiente a la fila y columna actuales
      let valorActual = copiaMatriz[filaActual - 1][columnaActual - 1];

      // Si el valor es distinto de cero
      if (valorActual.num !== 0) {
        // Dejamos el inverso multiplicativo del valor como factor
        let factor = reducir({num: valorActual.den, den: valorActual.num});
        // Multiplicamos la fila por el factor para generar un uno
        multiplicarFila(copiaMatriz, filaActual, factor);
        // Agregamos la operación al paso actual
        pasoActual.operaciones.push(`${formatoFraccion(factor)} F${filaActual} -> F${filaActual}`);
        // Guardamos el resultado de las operaciones en el paso actual
        pasoActual.resultado = copiarMatriz(copiaMatriz);
        // Agregamos el paso actual al arreglo de pasos
        pasos.push(pasoActual);
      } else { // Si el valor es cero
        // Encontramos la fila siguiente con un valor distinto de cero
        let filaSiguienteValor = encontrarValorEnColumna(copiaMatriz, filaActual, columnaActual);
        // Si existe alguna fila que cumpla la condición
        if (filaSiguienteValor) {
          // Intercambiamos filas
          intercambioFilas(copiaMatriz, filaActual, filaSiguienteValor);
          // Guardamos la operación en el paso actual
          pasoActual.operaciones.push(`F${filaActual} <-> F${filaSiguienteValor}`);
          // Guardamos el resultado de la operación en el paso actual
          pasoActual.resultado = copiarMatriz(copiaMatriz);
          // Agregamos el paso actual al arreglo de pasos
          pasos.push(pasoActual);
        } else { // Si no existen ceros por generar
          // Avanzamos una columna
          columnaActual++;
        }
      }
      // Limpiamos el paso actual
      pasoActual = {operaciones: [], resultado: []};
    }
  }
  // Retornamos el arreglo de pasos
  return pasos;
}

// Función que encuentra el rango de una matriz escalonada reducida por filas
const rango = (matrizERF) => {
  let resultado = 0;

  // Por cada elemento de la fila, si encontramos un valor distinto de cero,
  // se suma uno al resultado y continuamos con la fila siguiente
  matrizERF.forEach((fila) => {
    fila.every((elemento) => elemento.num ? resultado++ && false : true);
  });

  return resultado;
}

const generarSoluciones = (matrizAmpliadaERF, rango) => {
  let letras = ["a", "b", "c", "d", "e", "f"];
  let nColumnas = matrizAmpliadaERF[0].length;
  let soluciones = [];

  for (let i = 0; i < rango; i++) {
    let solucion = "";
    for (let j = 0; j < nColumnas; j++) {
      let elemento = matrizAmpliadaERF[i][j];
      if (j === nColumnas - 1) {
        solucion += " = " + formatoFraccion(elemento);
      } else {
        if (elemento.num !== 0) {
          if (solucion.length === 0) {
            if (elemento.num === -1 && elemento.den === 1) solucion += "-";
            else if (elemento.num !== 1 && elemento.den !== 1)
              solucion += formatoFraccion({num: Math.abs(elemento.num), den: elemento.den});
            solucion += letras[j];
          } else {
            if (elemento.num > 0) {
              solucion += ` + ${elemento.num === 1 ? "" : formatoFraccion(elemento)}` + letras[j];
            } else {
              solucion += ` - ${elemento.num === -1 ? "" : formatoFraccion({num: Math.abs(elemento.num), den: elemento.den})}`;
              solucion += letras[j];
            }
          }
        }
      }
    }
    soluciones.push(solucion);
  }
  return soluciones;
} 

const analizarAmpliada = (matrizAmpliadaERF) => {
  let A = matrizAmpliadaERF.slice().map(row => row.slice(0, -1));
  let nVariables = A[0].length;
  let pA = rango(A);
  let pAb = rango(matrizAmpliadaERF);
  let resultado = {tipo: "", soluciones: []};

  // Si el rango de la matriz es igual al de la ampliada
  if (pA === pAb) {
    // Si el rango de la matriz es igual al número de variables
    if (pA === nVariables) {
      // Caso solución unica
      resultado.tipo = "Solución única";
    } else if (pA < nVariables) {
      // Caso infinitas soluciones
      resultado.tipo = "Infinitas soluciones";
    }
    resultado.soluciones = generarSoluciones(matrizAmpliadaERF, pA);

  } else {
    resultado.tipo = "No tiene solución.";
  } 
  return resultado;
}

const comprobarIdentidad = (identidad) => {
  identidad.forEach((fila, i) => {
    fila.forEach((elemento, j) => {
      if (i === j) {
        if (elemento !== 1) return false;  
      } else {
        if (elemento !== 0) return false;
      }
    });
  });
  return true;
}

const invertir = (matriz) => {
  let numeroFilas = matriz.length;
  let numeroColumnas = matriz[0].length;

  if (numeroFilas !== numeroColumnas) {
    return {pasos: [], tipo: "No invertible", resultado: []}
  } else {
    let matrizAmpliada = matriz.slice().map((fila, i) => {
      let filaIdentidad = new Array(numeroColumnas).fill({num: 0, den: 1});
      filaIdentidad[i] = {num: 1, den: 1};
      return fila.concat(filaIdentidad);
    });

    let retorno = {pasos: [], tipo: "", inversa: []};
    
    let pasos = gaussJordan(matrizAmpliada);
    retorno.pasos = pasos;

    let identidad = pasos[pasos.length - 1].resultado.map((fila) => fila.slice(0, numeroFilas));
    if (comprobarIdentidad(identidad)) {
      retorno.inversa = pasos[pasos.length - 1].resultado.map((fila) => fila.slice(numeroFilas, numeroFilas * 2));
      retorno.tipo = "Invertible";
    } else {
      retorno.tipo = "No invertible";
    }
    return retorno;
  }
}