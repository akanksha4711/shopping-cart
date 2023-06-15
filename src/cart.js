let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
// ? Calling the calculate function every time the page reloads
// ? so that the number on top of cart icon is always up-to-date
calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return `
      <div class="cart-item">
        <img width="100" src="${search.img}">
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${search.name}</p>
              <p class="cart-item-price">$ ${search.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      `;
    }).join('');
  }
  else {
    shoppingCart.innerHTML = ``
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `
  }
}
generateCartItem();

let increment = (selectedItem) => {

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    });
  }
  else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));

  generateCartItem();
};

let decrement = (selectedItem) => {

  let search = basket.find((x) => x.id == selectedItem.id);

  if (search === undefined) return;

  search.item -= 1;
  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));

  generateCartItem();
};

let update = (id) => {
  let search = basket.find((x) => x.id == id);
  if (search === undefined)
    document.getElementById(id).innerHTML = 0;
  else
    document.getElementById(id).innerHTML = search.item;
  //console.log("basket updated");
  calculation();
};

let removeItem = (id) => {
  console.log(id);
}

