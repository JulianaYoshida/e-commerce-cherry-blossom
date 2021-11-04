// remove items from cart

let selectCartItembuttons = document.querySelectorAll(".btn-danger");

for (let i = 0; i < selectCartItembuttons.length; i++) {
  let button = selectCartItembuttons[i];
  button.addEventListener("click", removeCartItem);
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// update quantity

let quantityInputs = document.querySelectorAll(".cart-quantity-input");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChange);
}

function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// adding an item to cart

let addToCartButtons = document.querySelectorAll(".shop-item-button");
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event) {
  let buttonClicked = event.target;
  let shopItem = buttonClicked.parentElement.parentElement;
  let title = shopItem.querySelectorAll(".shop-item-title")[0].innerHTML;
  let price = shopItem.querySelectorAll(".card-price")[0].innerHTML;
  let imageSrc = shopItem.querySelectorAll(".shop-item-image")[0].src;
  addItemtoCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemtoCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelectorAll(".cart-items")[0];
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerHTML === title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let cartRowsContents = `
            <div class="cart-item cart-column">
                <img src=${imageSrc} class="card-img-top shop-item-image" alt="..." />
              <span class="cart-item-title shop-item-title"">${title}</span>
            </div>
              <span class="cart-price cart-column">${price}</span>
              <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" />
                <button class="btn btn-danger" type="button">Remove</button>
              </div>`;
  cartRow.innerHTML = cartRowsContents;
  cartItems.append(cartRow);
  cartRow
    .querySelectorAll(".btn-danger")[0]
    .addEventListener("click", removeCartItem);

  cartRow
    .querySelectorAll(".cart-quantity-input")[0]
    .addEventListener("change", quantityChange);
}

// update total

function updateCartTotal() {
  let cartItemContainer = document.querySelectorAll(".cart-items")[0];
  let cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.querySelectorAll(".cart-price")[0];
    let quantityElement = cartRow.querySelectorAll(".cart-quantity-input")[0];
    let price = parseFloat(priceElement.innerHTML.replace("$", " "));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelectorAll(".cart-total-price")[0].innerHTML = "$ " + total;
}

// finishing purchase

let finishShoppingButtonClicked = document
  .querySelector(".finish-shopping")
  .addEventListener("click", clearCart);

function clearCart(event) {
  let finishClicked = event.target;
  if (finishClicked) {
    // document.querySelector(".cart-items").remove();
    // console.log(document.querySelector(".cart-total-price"));
    // document.querySelector(".cart-total-price").innerHTML = `$ 0`;
    alert("Compra efetuada com sucesso")
    document.location.reload(true)
  }
}
