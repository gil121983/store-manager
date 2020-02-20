init();

function init() {

  document.onkeydown = function (evt) {
    evt = evt || window.event;  //code from https://jsfiddle.net/m9w8m/ 
    if (evt.keyCode == 27) {
      closeDialog()
    }
  };
  render();
}

function onEdit(product, e) {
  stopDivClick(e);
  openDialog('EDIT', product);
}

function onDelete(product, e) {
  stopDivClick(e);
  openDialog('DELETE', product);
}

function onView(product,e) {
  openDialog('VIEW', product)
}
function onOrder(product,e) {
  stopDivClick(e);
  openDialog('ORDER', product)
}

function render() {
  var listElement = document.querySelector('.product-list');
  listElement.innerHTML = '';
  for (let index = 0; index < products.length; index++) {
    var product = products[index];

    var productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = product.name +" "+ product.artist;
    productElement.onclick = onView.bind(event, product);
    
    if (product.sales >5000){
      // var productStockElement = document.createElement('button');
      // productStockElement.className = 'product-stock';
      // productStockElement.innerHTML = product.inStock + "g left in stock - click to order";
      // productStockElement.onclick = onOrder.bind(event, product);;
      // productElement.appendChild(productStockElement);
      
    }
      
    

    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = 'EDIT';
    editButton.onclick = onEdit.bind(event, product);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = ' X ';
    deleteButton.onclick = onDelete.bind(event, product);

    productElement.appendChild(editButton);
    productElement.appendChild(deleteButton);
    
    listElement.appendChild(productElement);
    
  }
}
