"use strict";

const secondDropdown = document.getElementById("secondDropdown");
const categoryDropdown = document.getElementById("categoryDropdown");
const categoriesURl = "http://localhost:8081/api/categories";
const productsURL = "http://localhost:8081/api/products";
console.log(categoriesURl);
window.onload = init;

function init() {
  searchDropdown.onchange = onSearchDropdownChanged;
}

function onSearchDropdownChanged() {
  if (searchDropdown.value == "searchByCategory") {
    fetch(categoriesURl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let category of data) {
          let theOption = new Option(category.Name);
          secondDropdown.appendChild(theOption);
        }
      });
  }

  if (searchDropdown.value == "viewAll") {
    fetch(productsURL)
      .then((response) => response.json())
      .then((data) => {
     
        data.forEach(element =>addtoCard(element));
        }
      );
  }
}

function addtoCard(product) {
  const displayProducts=document.getElementById("displayProducts")
  let cardItemDiv = document.createElement("div");
  cardItemDiv.className = "card";
  displayProducts.appendChild(cardItemDiv);
  // let cardImg = new Image();
  // cardImg.src = `images/${product.img}`;
  // cardImg.className = "card-img-top";

//  cardItemDiv.appendChild(cardImg);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardItemDiv.appendChild(cardBody);
  let cardTitle = document.createElement("h5");
  cardTitle.classname = "card-title";
  cardBody.appendChild(cardTitle);
  let cardTitleTextNode = document.createTextNode(product.productName);
  cardTitle.appendChild(cardTitleTextNode);
  let cardDescriptionParagraph = document.createElement("p");
  cardDescriptionParagraph.className = "card-text";
  cardBody.appendChild(cardDescriptionParagraph);
  let cardDescriptionParagraphText = document.createTextNode(
   `Unit Price: ${Number(product.unitPrice).toFixed(2)}
  Product Id: ${product.productId}`
  );
  cardDescriptionParagraph.appendChild(cardDescriptionParagraphText);
}
