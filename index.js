const bottonView = document.getElementById('bottonView'),
      bottonDelete = document.getElementById('bottonDelete'),
      username = document.querySelector('.username'),
      mail = document.querySelector('.mail'),
      phone = document.querySelector('.phone'),
      city = document.querySelector('.city'),
      country = document.querySelector('.country'),
      yellow = document.querySelector('.yellow'),
      pink = document.querySelector('.pink'),
      blue = document.querySelector('.blue'),
      green = document.querySelector('.green'),
      violet = document.querySelector('.violet');

function petitionAjax () {
  bottonView.addEventListener('click', () => {
    requestPetition();
    insertValue(true);
  });
}
petitionAjax();

function deleteAllElements () {
  bottonDelete.addEventListener('click', () => {
    const allElements = document.querySelectorAll('.title');
    allElements.forEach(e => {
      e.remove();
    });
    insertValue(false);
  });
}
deleteAllElements()
  function requestPetition() {
    const request = new XMLHttpRequest();
  
    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.send();
  
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4) {
        const requestJson = convertJsonParse(request.responseText);
        requestJson.forEach(element => {
          const elementUsername = createElementDom('yellow-opacity ', element.username);
          username.appendChild(elementUsername);
          const elementEmail = createElementDom('pink-opacity', element.email);
          mail.appendChild(elementEmail);
          const elementPhone = createElementDom('blue-opacity', element.phone);
          phone.appendChild(elementPhone);
          const elementCity = createElementDom('green-opacity', element.address.city);
          city.appendChild(elementCity);
          const elementCountry = createElementDom('violet-opacity', element.address.street);
          country.appendChild(elementCountry);
        });
      }
    });
  }

function insertValue (value) {
  const array = JSON.parse(localStorage.getItem('dataObtained'));
  array.pop();
  array.push(value);
  saveTaskLocalStorage(array)
}

function createElementDom (classOpacity,text) {
  const elementDiv = document.createElement('div');
  elementDiv.className = `title ${classOpacity}`;
  elementDiv.innerHTML = `
  <p>${text}</p>
  `;
  return elementDiv;
}

function convertJsonParse (object) {
  const ObjectAjax = JSON.parse(object)
  return ObjectAjax;
}

function convertJsonStringify (convert) {
  return JSON.stringify(convert);
}

function saveTaskLocalStorage (element) {
  return localStorage.setItem('dataObtained', convertJsonStringify(element));
}

function saveLocalStorage () {
  if (!localStorage.getItem('dataObtained')) saveTaskLocalStorage([]);
}
saveLocalStorage()

function petitionDinamic () {
  const valuesLocalStorage = getValueLs();
  if(valuesLocalStorage[0] === true){
    requestPetition();
  }
}
petitionDinamic();

function getValueLs () {
  const convertir = convertJsonParse(localStorage.getItem('dataObtained'))
  return convertir;
}