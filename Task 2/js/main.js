//let requestURL = 'js/json/signin.json';
let requestURL = 'js/json/signup.json';
//let requestURL = 'js/json/colorsheme.json';

let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

let main_row = document.querySelector('#main-form');

request.onload = function() {

  let cahce = request.response;

  buildTitle(cahce);
  buildFields(cahce);
  if(cahce.hasOwnProperty('references')){
    buildRef(cahce);
  }
  if(cahce.hasOwnProperty('buttons')){
    buildButtons(cahce);
  }
}

function buildFields(jsonObj) {

  let fields = jsonObj['fields'];

  for(let i in fields){

    let row = document.createElement('div');
    let form_group = document.createElement('div');
    let input = document.createElement('input');

    if(fields[i].hasOwnProperty('label')){
      let label = document.createElement('label');
      label.htmlFor = 'test' + i;
      label.textContent = fields[i]['label'];       
      form_group.append(label);
    }

    row.className = 'row justify-content-center';
    form_group.className = 'form-group col-12 col-md-8 col-lg-6 col-xl-4';
      
    input.className = 'form-control form-control-lg'; 
    input.id = 'test' + i;    
    input.type = fields[i].input['type'];
    input.placeholder = fields[i].input['placeholder'];
    input.required = fields[i].input['required'];

    if(fields[i].input.hasOwnProperty('colors')){

      let colors = fields[i].input['colors'];
      let datalist = document.createElement('datalist');

      datalist.id = 'colorlist' + i;
      input.setAttribute('list','colorlist' + i);
      input.className += ' color';

      for(let key of colors){
        let option = document.createElement('option');
        option.value = key;
        datalist.append(option);
      }
      input.append(datalist);
      //window.addEventListener("load", startup, false);
    }

    // if(fields[i].input.hasOwnProperty('checked')){
    //   input.className += ' check';
    //   input.checked = fields[i].input['checked'];
      
    //   if(input.checked == true){
    //     window.addEventListener("load", startup1, false);
    //   }
    // }
    form_group.append(input);
    row.append(form_group);
    main_row.append(row);
  }
}

function buildTitle(jsonObj){

  let container = document.querySelector('.container');
  let h1 = document.createElement('h4');

  h1.className = 'text-center mb-4';
  h1.textContent = jsonObj['name'];

  container.prepend(h1);
}

function buildButtons(jsonObj){

  let buttons = jsonObj['buttons'];

  let row = document.createElement('div');
  let col = document.createElement('div');
  let input = document.createElement('input');

  row.className = 'row justify-content-center mt-4';
  col.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2';

  input.className = 'btn btn-primary w-100';
  input.type = 'submit';
  input.name = 'login';
  input.value = buttons[0]['text'];

  col.append(input);
  row.append(col);
  main_row.append(row);
}

function buildRef(jsonObj){

  let references = jsonObj['references'];
  let row = document.createElement('div');

  for(let i in references){

    let col = document.createElement('div');
    let p = document.createElement('p');
    let a = document.createElement('a');

    row.className = 'row justify-content-center mx-0';
    col.className = 'col-6 col-md-4 col-lg-3 col-xl-2 ref' + i;

    a.href = references[i]['ref'] + '.html';
    a.textContent = references[i]['text'];
    p.className = 'mb-0 mt-2'
    
    if(references[i].hasOwnProperty('text without ref')){
      p.className = 'text-center mb-0 mt-2';
      p.textContent = references[i]['text without ref'] + ' ';
      col.className = 'col-12';
    }


    p.append(a);
    col.append(p);
    row.append(col);
    main_row.append(row);
  }
}

// function startup(){
//   let color = document.querySelector('.color');
//   color.addEventListener("input", updateFirst, false);
// }

// function startup1(){
//   let color = document.querySelector('.check');
//   color.addEventListener("input", backtocolor, false);
// }

// function updateFirst(event){
//   let body = document.querySelector('body');
//   body.style.color = event.target.value;
// }

// function backtocolor(event){
//   let body = document.querySelector('body');
//   body.style.color = "#000000";
// }


// fetch('js/json.json')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     let a = document.createElement('div');
//     a.className = 'container text-center';
//     a.textContent = data['name'];
//     header.appendChild(a);
//   });







