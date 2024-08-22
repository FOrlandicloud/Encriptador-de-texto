const d = document;
const textArea = d.querySelector(".form_input");
const textAreaSalida = d.querySelector(".form_salida")
const imagenMuneco = d.querySelector(".imagen_resultado");
const tituloResultado = d.querySelector(".titulo_resultado");
const textoResultado = d.querySelector(".texto_resultado");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelector(".form__btn__secundary");
const botonCopiar = d.querySelector(".form__btn__secundary__hidden");
/*La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"*/

const llaves = [
    ["e","enter"],
    ["i","imes"],
    ["a","ai"],
    ["o","ober"],
    ["u","ufat"]
];

//funcion para encriptar el texto
function encriptarMensaje(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++) {
            if(letra === llaves[j][0]){
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado+= encriptada;
    }
    return mensajeEncriptado;
}

//funcion para desencriptar el texto
function desencriptarMensaje(mensaje){
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}
 //ocultar muñeco y demas objetos
textArea.addEventListener("input", (e)=>{
    console.log(e.target.value);
    imagenMuneco.style.display = "none"; 
    cargando.style.display = "block";
    tituloResultado.textContent = "Capturando tu mensaje";
    textoResultado.style.display = "";
})

//funcion del boton encriptar
botonEncriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    textAreaSalida.textContent = mensajeEncriptado;
    botonCopiar.style.display = "block";
    tituloResultado.textContent = "Este es tu mensaje encriptado:";
    textoResultado.style.display = "none";
    textAreaSalida.style.visibility = "visible";
})

//funcion del boton desencriptar
botonDesencriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    textAreaSalida.textContent = mensajeDesencriptado;
    botonCopiar.style.display = "block";
    tituloResultado.textContent = "Este es tu mensaje desencriptado:";
    textoResultado.style.display = "none";
    textAreaSalida.style.visibility = "visible";
})

botonCopiar.addEventListener("click", ()=>{
    let copiaTexto = textAreaSalida.textContent;
    navigator.clipboard.writeText(copiaTexto).then(()=>{
        imagenMuneco.style.display = "block";
        tituloResultado.textContent = "Copiado correctamente";
        botonCopiar.style.display = "none";
        textAreaSalida.textContent = "";
    })
})