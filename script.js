// ===============================================
// 1. CONTAR PALABRAS
// ===============================================
function contarPalabras(texto) {
    let palabras = 0;
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === " " || texto[i] === "\n") {
            palabras++;
        }
    }
    if (texto.length > 0) palabras++;
    return palabras;
}

// ===============================================
// 2. SIGNOS DE PUNTUACION
// ===============================================
function contarSignos(texto) {
    let signos = 0;
    const lista = ['.', ',', ';', ':', '!', '?', '¿', '¡', '"'];
    for (let i = 0; i < texto.length; i++) {
        for (let j = 0; j < lista.length; j++) {
            if (texto[i] === lista[j]) signos++;
        }
    }
    return signos;
}

// ===============================================
// 3. CONTAR VOCALES
// ===============================================
function contarVocales(texto) {
    let vocales = 0;
    const lista = ['a','e','i','o','u','A','E','I','O','U'];
    for (let i = 0; i < texto.length; i++) {
        for (let j = 0; j < lista.length; j++) {
            if (texto[i] === lista[j]) vocales++;
        }
    }
    return vocales;
}

// ===============================================
// 4. CONTAR CONSONANTES
// ===============================================
function contarConsonantes(texto) {
    let cons = 0;
    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];
        let esLetraMay = (c >= 'A' && c <= 'Z');
        let esLetraMin = (c >= 'a' && c <= 'z');
        let esVocal = (c === 'a'||c==='A'||c==='e'||c==='E'||c==='i'||c==='I'||c==='o'||c==='O'||c==='u'||c==='U');
        if ((esLetraMay || esLetraMin) && !esVocal) cons++;
    }
    return cons;
}

// ===============================================
// 5. CONTAR DIGITOS
// ===============================================
function contarDigitos(texto) {
    let digitos = 0;
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] >= '0' && texto[i] <= '9') digitos++;
    }
    return digitos;
}

// ===============================================
// 6. PALABRAS MAYÚSCULA
// ===============================================
function palabrasMayuscula(texto) {
    let contador = 0;
    for (let i = 0; i < texto.length; i++) {
        if (i === 0 || texto[i-1] === ' ' || texto[i-1] === '\n') {
            if (texto[i] >= 'A' && texto[i] <= 'Z') contador++;
        }
    }
    return contador;
}

// ===============================================
// 7. PALABRAS MINÚSCULA
// ===============================================
function palabrasMinuscula(texto) {
    let contador = 0;
    for (let i = 0; i < texto.length; i++) {
        if (i === 0 || texto[i-1] === ' ' || texto[i-1] === '\n') {
            if (texto[i] >= 'a' && texto[i] <= 'z') contador++;
        }
    }
    return contador;
}

// ===============================================
// 8. CONTAR PÁRRAFOS
// ===============================================
function contarParrafos(texto) {
    if (texto.length === 0) return 0;
    let parrafos = 1;
    for (let i = 0; i < texto.length; i++) if (texto[i] === '\n') parrafos++;
    return parrafos;
}

// ===============================================
// 9. INVERTIR TEXTO
// ===============================================
function invertirTexto(texto) {
    let invertido = "";
    for (let i = texto.length - 1; i >= 0; i--) invertido += texto[i];
    return invertido;
}

// ===============================================
// 10. TOTAL CARACTERES
// ===============================================
function totalCaracteres(texto) {
    return texto.length;
}

// ===============================================
// 11. BUSCAR PALABRA
// ===============================================
function buscarPalabra(texto, buscar) {
    let palabra = "";
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === ' ' || texto[i] === '\n') {
            if (palabra === buscar) return true;
            palabra = "";
        } else {
            palabra += texto[i];
        }
    }
    if (palabra === buscar) return true;
    return false;
}

// ===============================================
// 12. CONTAR CARÁCTER
// ===============================================
function contarCaracter(texto, char) {
    let contador = 0;
    for (let i = 0; i < texto.length; i++) if (texto[i] === char) contador++;
    return contador;
}

// ===============================================
// 13. POSICIONES PARES
// ===============================================
function contarPares(texto) {
    let pares = 0;
    for (let i = 0; i < texto.length; i++) if (i % 2 === 0) pares++;
    return pares;
}

// ===============================================
// 14. POSICIONES IMPARES
// ===============================================
function contarImpares(texto) {
    let impares = 0;
    for (let i = 0; i < texto.length; i++) if (i % 2 === 1) impares++;
    return impares;
}

// ===============================================
// 15. AGREGAR TEXTO
// ===============================================
function agregarTexto(texto, fragmento) {
    let alInicio = fragmento + " " + texto;
    let alFinal = texto + " " + fragmento;
    return { inicio: alInicio, final: alFinal };
}

// =====================================================
// FUNCIONES QUE CONTROLAN LOS BOTONES DEL HTML
// =====================================================
function mostrarResultado(accion) {
    let texto = document.getElementById("texto").value;
    let resDiv = document.getElementById("res");
    let resultado = "";

    switch (accion) {
        case "palabras": resultado = "Total palabras: " + contarPalabras(texto); break;
        case "signos": resultado = "Signos de puntuación: " + contarSignos(texto); break;
        case "vocales": resultado = "Vocales: " + contarVocales(texto); break;
        case "consonantes": resultado = "Consonantes: " + contarConsonantes(texto); break;
        case "digitos": resultado = "Dígitos: " + contarDigitos(texto); break;
        case "mayusculas": resultado = "Palabras en MAYÚSCULA: " + palabrasMayuscula(texto); break;
        case "minusculas": resultado = "Palabras en minúscula: " + palabrasMinuscula(texto); break;
        case "parrafos": resultado = "Párrafos: " + contarParrafos(texto); break;
        case "invertir": resultado = invertirTexto(texto); break;
        case "caracteres": resultado = "Caracteres: " + totalCaracteres(texto); break;
        case "pares": resultado = "Posiciones pares: " + contarPares(texto); break;
        case "impares": resultado = "Posiciones impares: " + contarImpares(texto); break;
    }

    resDiv.innerHTML = resultado;
}

function buscarPalabraUsuario() {
    let texto = document.getElementById("texto").value;
    let buscar = prompt("Ingresa la palabra:");
    if (!buscar) return;

    let encontrado = buscarPalabra(texto, buscar);
    document.getElementById("res").innerHTML =
        encontrado ? `La palabra "${buscar}" está en el texto.` :
                     `La palabra "${buscar}" NO está en el texto.`;
}

function contarCaracterUsuario() {
    let texto = document.getElementById("texto").value;
    let char = prompt("Ingresa un carácter:");
    if (!char || char.length !== 1) {
        alert("Debes ingresar 1 solo carácter.");
        return;
    }

    let cantidad = contarCaracter(texto, char);
    document.getElementById("res").innerHTML =
        `El carácter "${char}" aparece ${cantidad} veces.`;
}

function agregarTextoUsuario() {
    let texto = document.getElementById("texto").value;
    let frag = prompt("Texto a agregar:");
    if (!frag) return;

    let res = agregarTexto(texto, frag);
    document.getElementById("res").innerHTML =
        `<b>Al inicio:</b> ${res.inicio}<br><br><b>Al final:</b> ${res.final}`;
}
