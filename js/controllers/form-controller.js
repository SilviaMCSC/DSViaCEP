import Address from "../models/address.js";
import * as AddressService from '../services/address-service.js';
import * as listController from './list-controller.js';

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
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);

}

function handleInputNumberKeyup(event) {

    state.address.number = event.target.value;
}

async function handleInputCepChange(event) {
    const cep = event.target.value;

    try {

        const address = await AddressService.findByCep(cep);

        state.inputStreet.value = address.street;
        state.inputCity.value - address.city;
        state.address = address;

        setFormError("cep", "");
        state.inputNumber.focus();
    }
    catch (e) {

        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "Informe um cep válido");
    }
}


function handleBtnSaveClick(event) {
    event.preventDefault();

    const errors = AddressService.getErrors(state.address);

    const keys = Object.keys(errors);

    if (keys.length > 0) {

        keys.forEach (key => {
            setFormError (key, errors [keys]);
        });
       
    }

    else {

        listController.addCard(state.address);
        clearForm();
    }
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


    state.address = newAddress();

    state.inputCep.focus();
}


function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;

}
