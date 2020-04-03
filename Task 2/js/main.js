let requestURL = 'js/json/signin.json';
buildForm(requestURL);

function buildForm(requestURL) {
  fetch(requestURL)
    .then((response) => response.json())
    .then((jsonObj) => {

      let mainContainer = document.querySelector('#main-container');
      let form = document.createElement('form');

      form.setAttribute('role', 'form');
      form.setAttribute('name', 'signin');

      buildTitle(jsonObj, form);
      buildFields(jsonObj, form);
      buildRef(jsonObj,form);
      buildButtons(jsonObj, form);

      mainContainer.append(form);
  });
}

function buildWrapper(fields){

  //let formRow = document.createElement('div');
  let formGroup = document.createElement('div');

  formGroup.className = 'form-group';
  //formRow.className = 'form-row justify-content-center';

  if(fields.input.type == 'checkbox'){
    formGroup.className = 'form-check';
  }
  //formRow.append(formGroup)
  return formGroup;

}

function buildTitle(jsonObj, form) {

  let h1 = document.createElement('h4');

  h1.className = 'text-center mb-4';
  h1.textContent = jsonObj['name'];

  form.prepend(h1);
}

function buildLabel(fields, i){
  if(fields.hasOwnProperty('label')){
    let label = document.createElement('label');
    label.htmlFor = 'test' + i;
    label.textContent = fields.label;
    if(fields.input.type == 'checkbox'){
      label.className = 'form-check-label';
    }
    return label;
  }
}

function buildInput(fields, i){
  let input = document.createElement('input');
  input.type = fields.input.type;
  input.id = 'test' + i;
  if(fields.input.hasOwnProperty('required')){
    input.required = fields.input.required;
  }
  if(fields.input.type != 'color' || fields.input.type != 'checkbox'){
    input.className = 'form-control form-control-lg';
    input.placeholder = fields.input.placeholder;
  }
  else if(fields.input.type == 'checkbox'){
    input.className = 'form-check-input';
  }
  return input;
}

function buildFields(jsonObj, form){

  jsonObj.fields.forEach(function(fields, i){

    let wrapper = buildWrapper(fields);
    if(fields.input.type != 'checkbox'){
      wrapper.append(buildLabel(fields, i), buildInput(fields, i));
    }
    else{
      wrapper.append(buildInput(fields, i), buildLabel(fields, i));
    }
    form.append(wrapper);
  });
}

function buildButtons(jsonObj, form){
  if(jsonObj.buttons != undefined){

    let row = document.createElement('div');
    row.className = 'row justify-content-center mt-4';

    jsonObj.buttons.forEach(function(buttons,i){

      let col = document.createElement('div');
      let btn = document.createElement('input');

      col.className = 'col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2';
      btn.className = 'btn btn-primary w-100';

      btn.type = 'submit';
      btn.value = buttons.text;

      col.append(btn);
      row.append(col);

    });
    form.append(row)

  }
}

function buildRef(jsonObj, form){
  if(jsonObj.references != undefined ){

    let row = document.createElement('div');

    jsonObj.references.forEach(function(references, i){

      let p = document.createElement('p');
      let a = document.createElement('a');

      a.textContent = references.text;
      a.name = references.ref;
      a.href = '#';

      a.addEventListener('click', {
        handleEvent(){
          form.remove();
          requestURL = 'js/json/' + a.name + '.json';
          buildForm(requestURL);
        }
      });

      p.append(a);
      row.append(p);

    });
    form.append(row);

  }
}