
var ProductNameinput = document.getElementById('ProductNameinput');
var ProductPriceinput = document.getElementById('ProductPriceinput');
var ProductCategoryinput = document.getElementById('ProductCategoryinput');
var ProductDescriptioninput = document.getElementById('ProductDescriptioninput');
var searchInput = document.getElementById('searchInput');
var tableBody = document.getElementById('tablebody');
var productsContainer = [];
var currentIndex;
var isUpdating = false;
if (localStorage.getItem('products') != null) {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayproducts(productsContainer);
}
function addproduct() {
    var product = {
        name: ProductNameinput.value,
        price: ProductPriceinput.value,
        Category: ProductCategoryinput.value,
        Description: ProductDescriptioninput.value,
    };
    if (isUpdating) {
        productsContainer[currentIndex] = product;
        isUpdating = false;
        document.getElementById('addBtn').innerText = "Add Product";
    } else {
        productsContainer.push(product);
    }
    localStorage.setItem('products', JSON.stringify(productsContainer));
    clearForm();
    displayproducts(productsContainer);
}

function clearForm() {
    ProductNameinput.value = "";
    ProductPriceinput.value = "";
    ProductCategoryinput.value = "";
    ProductDescriptioninput.value = "";
}

function displayproducts(productList) {
    var cartonna = ``;
    for (let i = 0; i < productList.length; i++) {
        cartonna += `<tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].Category}</td>
      <td>${productList[i].Description}</td>
      <td><button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-outline-info">update</button></td>
      <td><button onclick="deleteproducts(${i})" class="btn btn-sm btn-outline-danger">delete</button></td>
    </tr>`;
    }
    tableBody.innerHTML = cartonna;
}

function deleteproducts(deleteindex) {
    productsContainer.splice(deleteindex, 1);
    localStorage.setItem('products', JSON.stringify(productsContainer));
    displayproducts(productsContainer);
}

function searchproducts() {
    var term = searchInput.value;
    var cartonna = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartonna += `<tr>
        <td>${i + 1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].Category}</td>
        <td>${productsContainer[i].Description}</td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-outline-info">update</button></td>
        <td><button onclick="deleteproducts(${i})" class="btn btn-sm btn-outline-danger">delete</button></td>
      </tr>`;
        }
    }
    tableBody.innerHTML = cartonna;
}

function setFormForUpdate(index) {
    ProductNameinput.value = productsContainer[index].name;
    ProductPriceinput.value = productsContainer[index].price;
    ProductCategoryinput.value = productsContainer[index].Category;
    ProductDescriptioninput.value = productsContainer[index].Description;
    currentIndex = index;
    isUpdating = true;
    document.getElementById('addBtn').innerText = "Update Product";
}
