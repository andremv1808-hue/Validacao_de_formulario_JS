const form = document.getElementById('form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const numero = document.getElementById('numero');
const texto = document.getElementById('texto');
const cv = document.querySelectorAll('input[name = "cv"]');
const curso = document.getElementById('curso');
const checkbox = document.getElementById('checkbox')
const textarea2 = document.getElementById('textarea2');
const select = document.getElementById('select')

function mostrarErro(input, mensagem){
    const spanError = document.getElementById(`erro-${input.id}`);
    spanError.textContent = mensagem;
    spanError.classList.add('input-invalido')
}
function limparErro(input){
    const spanError = document.getElementById(`erro-${input.id}`);
    spanError.textContent = 'OK';
    spanError.classList.add('input-valido')
}

function validarNome(){
    if (nome.value.length < 3){
        mostrarErro(nome, "No minimo 3 caracteres");
        return false;
    }
    limparErro(nome);
    return true;
}
function validarEmail(){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
        mostrarErro(email, 'Digite um e-mail válido.');
        return false;
  }
  limparErro(email);
  return true;
}
function validarNumero(){
    const regexNum = /^\d+$/;
    if (!regexNum.test(numero.value.trim())){
        mostrarErro(numero, "So deve conter numero");
        return false;
    }
    limparErro(numero);
    return true;
    

}
function validarTexto(){
    if (texto.value.trim().length < 1){
        mostrarErro(texto, "Deve conter pelo menos um caractere");
        return false;
    }else{
        limparErro(texto);
        return true;
    }
}
function validarRadio(){
    const algumMarcado = Array.from(cv).some(radio => radio.checked);

    if (!algumMarcado){
        mostrarErro(cv[0], "Selecione alguma opcao");
        return false;
    }
    limparErro(cv[0]);
    return true
}
function validarCurso(){
    if (curso.value.length < 3){
        mostrarErro(curso, "Especifique o curso");
        return false;
    }
    limparErro(curso)
    return true;

}
function habilitarCampos(){
    const habilitar = checkbox.checked;
    textarea2.disabled = !habilitar;
    select.disabled = !habilitar;

    if (!habilitar){
        textarea2.value = '';
        select.value = '';
    }
}
function validarCamposDisabled(){
    if (!checkbox.checked){
        return true;
    }
    if (checkbox && textarea2.value.trim().length < 3){
        mostrarErro(textarea2, "Voce deve escrever o por que aqui");
        return false;
    }
    limparErro(textarea2);

    if (checkbox && select.value === ""){
        mostrarErro(select, "Voce deve selecionar uma opcao");
        return false;
    }
    limparErro(select);
    return true;
}

nome.addEventListener('blur', validarNome);
email.addEventListener('blur', validarEmail);
numero.addEventListener('blur', validarNumero);
texto.addEventListener('blur', validarTexto);
cv.forEach(radio =>{
    radio.addEventListener('change', validarRadio)
});
curso.addEventListener('blur', validarCurso);
checkbox.addEventListener('change', habilitarCampos);
textarea2.addEventListener('blur', validarCamposDisabled);
select.addEventListener('blur', validarCamposDisabled);

form.addEventListener('submit', function(event){
    event.preventDefault();

    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const numeroValido = validarNumero();
    const textoValido = validarTexto();
    const radioValidado = validarRadio();
    const cursoValidado = validarCurso();
    const camposDisableValidado = validarCamposDisabled();

    const fomularioValidado = nomeValido && emailValido && numeroValido && textoValido && radioValidado && cursoValidado && camposDisableValidado;

    if (fomularioValidado){
        window.location.href = 'obrigado.html'
    }else{
        alert("Nao enviado tem erro ai");
    }
});