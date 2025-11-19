// =======================================================
// script.js — implementaciones sin split/reverse/includes
// =======================================================

// helpers básicos
function esEspacio(c){
    return c === ' ' || c === '\n' || c === '\t' || c === '\r';
}

function esDigito(c){
    return c >= '0' && c <= '9';
}

// -------------------------------------------------------
// 1. CONTAR PALABRAS (construye arreglo usando push)
// -------------------------------------------------------
function contarPalabras(texto){
    const palabras = []; // usaremos push y length
    let palabra = "";    // acumulador de caracteres para la palabra actual

    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        if (esEspacio(c)){
            if (palabra.length > 0){
                palabras.push(palabra);
                palabra = "";
            }
            // si hay varios espacios seguidos, simplemente se ignoran
        } else {
            palabra = palabra + c;
        }
    }
    // última palabra
    if (palabra.length > 0) palabras.push(palabra);

    return palabras.length;
}

// -------------------------------------------------------
// 2. SIGNOS DE PUNTUACION (comparación manual con lista)
// -------------------------------------------------------
function contarSignos(texto){
    const lista = ['.', ',', ';', ':', '!', '?', '¿', '¡', '"'];
    let cont = 0;
    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        // comparar manualmente con la lista (sin includes)
        for (let j = 0; j < lista.length; j++){
            if (c === lista[j]) { cont++; break; }
        }
    }
    return cont;
}

// -------------------------------------------------------
// 3. CONTAR VOCALES (incluye acentos y ü, mayúsculas/minúsc)
// -------------------------------------------------------
function contarVocales(texto){
    // lista manual de vocales (con acentos y ü)
    const lista = ['a','e','i','o','u','á','é','í','ó','ú','ü',
                   'A','E','I','O','U','Á','É','Í','Ó','Ú','Ü'];
    let cont = 0;
    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        for (let j = 0; j < lista.length; j++){
            if (c === lista[j]) { cont++; break; }
        }
    }
    return cont;
}

// -------------------------------------------------------
// 4. CONTAR CONSONANTES (incluye ñ y Ñ)
// -------------------------------------------------------
function contarConsonantes(texto){
    // consideramos como consonante cualquier letra del alfabeto que no sea vocal (incluye Ñ/ñ)
    // comprobamos por rangos A-Z / a-z y chequeo especial para Ñ/ñ y excluir vocales/accented vowels
    const vocales = ['a','e','i','o','u','á','é','í','ó','ú','ü',
                     'A','E','I','O','U','Á','É','Í','Ó','Ú','Ü'];
    let cont = 0;
    for (let i = 0; i < texto.length; i++){
        const c = texto[i];

        // comprobar ñ/Ñ primero
        if (c === 'ñ' || c === 'Ñ'){
            cont++;
            continue;
        }

        // letra mayúscula A-Z
        if (c >= 'A' && c <= 'Z'){
            // si no es vocal -> consonante
            let esVocal = false;
            for (let j = 0; j < vocales.length; j++){
                if (c === vocales[j]) { esVocal = true; break; }
            }
            if (!esVocal) cont++;
            continue;
        }

        // letra minúscula a-z
        if (c >= 'a' && c <= 'z'){
            let esVocal = false;
            for (let j = 0; j < vocales.length; j++){
                if (c === vocales[j]) { esVocal = true; break; }
            }
            if (!esVocal) cont++;
            continue;
        }

        // otros caracteres (acentos como Á ya están en vocales, pero letras con tilde fuera de a-z/ A-Z no contadas aquí)
    }
    return cont;
}

// -------------------------------------------------------
// 5. CONTAR DÍGITOS
// -------------------------------------------------------
function contarDigitos(texto){
    let cont = 0;
    for (let i = 0; i < texto.length; i++){
        if (esDigito(texto[i])) cont++;
    }
    return cont;
}

// -------------------------------------------------------
// 6. PALABRAS QUE EMPIEZAN EN MAYÚSCULA
// -------------------------------------------------------
function palabrasMayuscula(texto){
    // parseamos palabras manualmente (reutilizamos lógica similar a contarPalabras)
    const palabras = [];
    let palabra = "";
    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        if (esEspacio(c)){
            if (palabra.length > 0){ palabras.push(palabra); palabra = ""; }
        } else {
            palabra = palabra + c;
        }
    }
    if (palabra.length > 0) palabras.push(palabra);

    // ahora contamos aquellas cuya primera letra sea mayúscula (A-Z, Ñ mayúsc)
    let contador = 0;
    for (let i = 0; i < palabras.length; i++){
        const w = palabras[i];
        const first = w[0];
        if (first >= 'A' && first <= 'Z') contador++;
        else if (first === 'Ñ') contador++; // ñ mayúscula especial
        // Nota: letras acentuadas mayúsculas (Á,É...) no están en rango A-Z; si el profe quiere contarlas,
        // habría que comparar con una lista de mayúsculas acentuadas. Podemos añadir si lo pides.
    }
    return contador;
}

// -------------------------------------------------------
// 7. PALABRAS QUE EMPIEZAN EN MINÚSCULA
// -------------------------------------------------------
function palabrasMinuscula(texto){
    const palabras = [];
    let palabra = "";
    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        if (esEspacio(c)){
            if (palabra.length > 0){ palabras.push(palabra); palabra = ""; }
        } else {
            palabra = palabra + c;
        }
    }
    if (palabra.length > 0) palabras.push(palabra);

    let contador = 0;
    for (let i = 0; i < palabras.length; i++){
        const w = palabras[i];
        const first = w[0];
        if (first >= 'a' && first <= 'z') contador++;
        else if (first === 'ñ') contador++;
        // las minúsculas acentuadas (á,é...) están fuera de a-z; añadimos si lo requieres.
    }
    return contador;
}

// -------------------------------------------------------
// 8. CONTAR PÁRRAFOS (líneas con contenido — no cuenta líneas vacías)
// -------------------------------------------------------
function contarParrafos(texto){
    if (texto.length === 0) return 0;

    let parrafos = 0;
    let lineaTieneContenido = false;

    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        if (c === '\n'){
            if (lineaTieneContenido) parrafos++;
            lineaTieneContenido = false;
        } else {
            // si encontramos cualquier carácter no espacio en la línea marcamos contenido
            if (!esEspacio(c)) lineaTieneContenido = true;
        }
    }
    // última línea (si no terminó con '\n')
    if (lineaTieneContenido) parrafos++;

    return parrafos;
}

// -------------------------------------------------------
// 9. INVERTIR TEXTO (sin reverse)
// -------------------------------------------------------
function invertirTexto(texto){
    let out = "";
    for (let i = texto.length - 1; i >= 0; i--){
        out = out + texto[i];
    }
    return out;
}

// -------------------------------------------------------
// 10. TOTAL DE CARACTERES
// -------------------------------------------------------
function totalCaracteres(texto){
    return texto.length;
}

// -------------------------------------------------------
// 11. BUSCAR PALABRA EN EL TEXTO (sin split ni includes)
// -------------------------------------------------------
function buscarPalabra(texto, buscar){
    if (!buscar || buscar.length === 0) return false;

    let palabra = "";
    for (let i = 0; i < texto.length; i++){
        const c = texto[i];
        if (esEspacio(c)){
            if (palabra.length > 0){
                // comparación exacta
                if (palabra === buscar) return true;
                palabra = "";
            }
        } else {
            palabra = palabra + c;
        }
    }
    if (palabra.length > 0 && palabra === buscar) return true;
    return false;
}

// -------------------------------------------------------
// 12. CONTAR OCURRENCIAS DE UN CARÁCTER
// -------------------------------------------------------
function contarCaracter(texto, char){
    if (!char || char.length !== 1) return 0;
    let cont = 0;
    for (let i = 0; i < texto.length; i++){
        if (texto[i] === char) cont++;
    }
    return cont;
}

// -------------------------------------------------------
// 13. CARACTERES EN POSICIONES PARES
// -------------------------------------------------------
function contarPares(texto){
    // índices pares: 0,2,4,... => si length = n, cantidad = ceil(n/2)
    // pero sin usar Math, calculamos manualmente:
    const n = texto.length;
    // si n es par: pares = n/2, si impar: pares = (n+1)/2
    let pares = 0;
    for (let i = 0; i < n; i++){
        if (i % 2 === 0) pares++;
    }
    return pares;
}

// -------------------------------------------------------
// 14. CARACTERES EN POSICIONES IMPARES
// -------------------------------------------------------
function contarImpares(texto){
    const n = texto.length;
    let imp = 0;
    for (let i = 0; i < n; i++){
        if (i % 2 === 1) imp++;
    }
    return imp;
}

// -------------------------------------------------------
// 15. AÑADIR TEXTO AL INICIO Y AL FINAL
// -------------------------------------------------------
function agregarTexto(texto, fragmento){
    // concatenación simple
    const alInicio = fragmento + (fragmento.length > 0 && texto.length > 0 ? ' ' : '') + texto;
    const alFinal = texto + (fragmento.length > 0 && texto.length > 0 ? ' ' : '') + fragmento;
    return { inicio: alInicio, final: alFinal };
}

// -------------------------------------------------------
// Funciones UI (ejemplo de uso con el index.html simple)
// -------------------------------------------------------
function mostrar(tipo){
    const texto = document.getElementById('texto').value || "";
    const out = document.getElementById('resultado');

    switch(tipo){
        case 'palabras': out.innerText = contarPalabras(texto); break;
        case 'signos': out.innerText = contarSignos(texto); break;
        case 'vocales': out.innerText = contarVocales(texto); break;
        case 'consonantes': out.innerText = contarConsonantes(texto); break;
        case 'digitos': out.innerText = contarDigitos(texto); break;
        case 'mayus': out.innerText = palabrasMayuscula(texto); break;
        case 'minus': out.innerText = palabrasMinuscula(texto); break;
        case 'parrafos': out.innerText = contarParrafos(texto); break;
        case 'invertir': out.innerText = invertirTexto(texto); break;
        case 'caracteres': out.innerText = totalCaracteres(texto); break;
        case 'pares': out.innerText = contarPares(texto); break;
        case 'impares': out.innerText = contarImpares(texto); break;
        default: out.innerText = '';
    }
}

function buscarPal(){
    const texto = document.getElementById('texto').value || "";
    const b = prompt('Palabra a buscar:');
    if (b === null) return;
    const encontrado = buscarPalabra(texto, b);
    document.getElementById('resultado').innerText = encontrado ? 'Sí existe' : 'No existe';
}

function contarChar(){
    const texto = document.getElementById('texto').value || "";
    const c = prompt('Carácter a contar (exacto):');
    if (c === null) return;
    if (c.length !== 1){ alert('Ingresa exactamente un carácter.'); return; }
    document.getElementById('resultado').innerText = 'Aparece ' + contarCaracter(texto, c) + ' veces';
}

function agregarTxt(){
    const texto = document.getElementById('texto').value || "";
    const frag = prompt('Texto para agregar:');
    if (frag === null) return;
    const res = agregarTexto(texto, frag);
    document.getElementById('resultado').innerHTML = '<b>Inicio:</b> ' + res.inicio + '<br><b>Final:</b> ' + res.final;
}
