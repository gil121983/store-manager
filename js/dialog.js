const dict = {
    ADD: {
      title: 'Add Product',
      content: getAddProductForm
    },
    DELETE: {
      title: 'Delete Product',
      content: getDeleteProductForm
    },
    EDIT: {
      title: 'Edit Product',
      content: getEditProductForm
    },
    VIEW: {
      title: 'View Product',
      content: viewProduct,
    },

}
  
  function openDialog(type, product) {
   let dialogElement = document.querySelector('.dialog');
    dialogElement.setAttribute('style', 'display: block');
  
   let data = dict[type];
  
   let titleElement = dialogElement.querySelector('.title');
    titleElement.innerHTML = data.title;
  
   let contentElement = dialogElement.querySelector('.content');
    contentElement.innerHTML = '';
   let content = data.content(product);
    contentElement.appendChild(content);
  }
  
  function getAddProductForm() {
   let formElement = document.createElement('form');
  
   let idInputElement = document.createElement('input');
   
    // auto increment ID
    const lastproduct= products.length -1;
    let lastId = parseInt(products[lastproduct].id);
    idInputElement.value = lastId +1 ;   
    formElement.appendChild(idInputElement);
  
    let categoryInputElement = document.createElement('select');
    categoryInputElement.id = "catselect"
    categoryInputElement.placeholder = 'Select Genre';
    categoryInputElement.innerHTML = `<option default>-select genre-</option>  
    <option value="0">Chill Out</option> 
    <option value="1">Rock</option>
    <option value="2">Dance</option>`;
    formElement.appendChild(categoryInputElement);

    let nameInputElement = document.createElement('input');
    nameInputElement.placeholder = 'Enter release name';
    formElement.appendChild(nameInputElement);
  
    let artistInputElement = document.createElement('input');
    artistInputElement.placeholder = 'Enter artist name';
    formElement.appendChild(artistInputElement);
  
    let typeInputElement = document.createElement('input');
    typeInputElement.placeholder = 'Enter release type';
    formElement.appendChild(typeInputElement);

    let dateInputElement = document.createElement('input');
    dateInputElement.placeholder = 'Enter release date';
    formElement.appendChild(dateInputElement);

    let priceInputElement = document.createElement('input');
    priceInputElement.placeholder = 'Enter price';
    formElement.appendChild(priceInputElement);

    let submitButton = document.createElement('button');
    submitButton.innerHTML = 'submit'
    formElement.appendChild(submitButton);
  
    formElement.onsubmit = function (e) {
      e.preventDefault();
      let currentPrice = parseInt(priceInputElement.value)
      products.push({ 
        id: idInputElement.value, 
        name: nameInputElement.value, 
        price: currentPrice, 
        categoryId: categoryInputElement.value, 
        releaseDate:dateInputElement.value,
        artist: artistInputElement.value});
      closeDialog();
      render();
    }
  
    return formElement
  }
  
  function getEditProductForm(product) {
    let container = document.createElement('form');

    let categoryInputElement = document.createElement('select');
    categoryInputElement.id = "catselect"
    categoryInputElement.placeholder = 'Select category';
    categoryInputElement.innerHTML =     `<option value="0">Chill Out</option> 
    <option value="1">Rock</option>
    <option value="2">Dance</option>`;;
    container.appendChild(categoryInputElement);
    
    let nameInputElement = document.createElement('input');
    nameInputElement.value = product.name;
    container.append(nameInputElement);

    let artistInputElement = document.createElement('input');
    artistInputElement.value = product.artist;
    container.appendChild(artistInputElement);

    let dateInputElement = document.createElement('input');
    dateInputElement.value = product.releaseDate;
    container.appendChild(dateInputElement);

    let priceInputElement = document.createElement('input');
    priceInputElement.value = product.price;
    container.appendChild(priceInputElement);
  
    let saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save'
    container.appendChild(saveButton);
  
    container.onsubmit = function (e) {
      e.preventDefault();
      
      let currentPrice = parseInt(priceInputElement.value)
      let position = products.indexOf(product)
      products.splice(position, 1, {
        id: product.id,
        name: nameInputElement.value,
        price: currentPrice,
        categoryId: categoryInputElement.value, 
        releaseDate: dateInputElement.value,
        artist: artistInputElement.value
      })
  
      console.log("Changes has been saved");
      closeDialog();
      render();
    }
    return container;
  }
  
  
  function getDeleteProductForm(product) {
    let element = document.createElement('form');
    element.innerHTML = ` are you shure you want to delete ${product.name}?`;
  
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete'
    element.appendChild(deleteButton);
  
    element.onsubmit = function (e) {
      e.preventDefault();
      let position = products.indexOf(product)
      products.splice(position, 1)
      console.log(product.name + " has been deleted");
      closeDialog();
      render();
  
    }
    return element;
  }
  
  function closeDialog() {
    let dialogElement = document.querySelector('.dialog');
    dialogElement.setAttribute('style', 'display: none');
  }
  
  function viewProduct(product) {
    let container = document.createElement('form');
  
    let idElement = document.createElement('p');
    idElement.innerHTML= "id: " + product.id;
    container.append(idElement);
  
    let nameInputElement = document.createElement('p');
    nameInputElement.innerHTML= "name: " + product.name;
    container.append(nameInputElement);

    let artistElement = document.createElement('p');
    artistElement.innerHTML= "artist: " + product.artist;
    container.append(artistElement);
    
    let categoryInputElement = document.createElement('p');
    let productId = parseInt(product.categoryId);
    categoryInputElement.innerHTML= "category: " + categories[productId].name;
    container.append(categoryInputElement);
  
    let priceInputElement = document.createElement('p');
    priceInputElement.innerHTML= "price: " + product.price;
    container.append(priceInputElement);
  
    let dateElement = document.createElement('p');
    dateElement.innerHTML= "release date: " + product.releaseDate;
    container.append(dateElement);
  
  
    return container
  }
  
  function stopDivClick(e) {
    let event = e || arguments[0] || window.event;
    event.stopPropagation();
  }

  
  
  