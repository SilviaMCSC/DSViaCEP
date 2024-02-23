function State() {
    this.listSection = null;
}

const state = state;

export function init(){ //inicar o componente list-controller

    state.listSection = document.querySelector ("#list-selection");
}

export function addCard(address){

const card = creatCard(address);
state.listSection.appendChild(card);
}


function creatCard ( address){

  const div = document .createElement ("div");
  div.classList.add ("card-listem-item");

  const h3 = document.createElement("h3");
  h3.innerHTML = address.city;

  const line = document.createElement("p");
  line.classList("address-line");
  line.innerHTML = `${address.street}, ${address.number}`;

  const cep = document.createElement("p");
  cep.classList("address-cep");
  cep.innerHTML = address.cep;


  div.appendChild(h3);
  div.appendChild(line);
  div.appendChild(cep);
return div;
}



