"use strict";
const productsURL = "http://localhost:8081/api/products";
const detailsCard = document.getElementById("detailsDisplayCard");
const detailsCardTitle = document.getElementById("cardTitle");
const detailsCardText = document.getElementById("cardText");
window.onload = init;

function init() {
  const urlParams = new URLSearchParams(location.search);

  let productId = -1;
  if (urlParams.has("productId") === true) {
    productId = urlParams.get("productId");

    fetch(productsURL + "/" + productId)
      .then((response) => response.json())
      .then((product) => {
        console.log(product);
        detailsCardTitle.innerHTML = product.productName;
        detailsCardText.innerHTML =
            'Unit Price: ' + product.unitPrice +
            '<br/> Units in Stock: ' + product.unitsInStock +
            '<br/> Supplier: ' + product.supplier;
      
        if (product.discontinued == 'true') {
        
          let message = document.createTextNode('<br/> This product has been discontinued.');
          detailsCardText.appendChild(message);
        }
      });
  }
}
