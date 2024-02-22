import Address from "../models/address.js";
import * as requestService from '../services/request-service.js';

//função contrutora do estado do módulo

function State() {

    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

//esta pasta é controller porque é ela quem trata as interações do usuário
const state = new State(); // instanciando um função contrutora do objeto


export function init() { //iniciando todos os valores do estado da função init

    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;


    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error= "cep"]');
    state.errorNumber = document.querySelector('[data-error= "number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);

}

async function handleBtnSaveClick(event) {
    event.preventDefault();
    const result = await requestService.getJson('https://viacep.com.br/ws/01001000/json/');
    console.log(result);
}


function handleInputNumberChange(event) { //Eventos que podem acontecer no formulário.

    if (event.target.value == "") {

        setFormError("number", "campo requerido");
    }
    else {
        setFormError("number", "");
    }

}

function handleBtnClearClick(event) {

    event.preventDefault();
    clearForm();
}

function clearForm() {

    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.inputCep.focus();
}


function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;

}
