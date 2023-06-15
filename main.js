let shop = document.getElementById('shop');

// ? Data for each shop item
let shopItemsData = [{
  id: "dsfdsfwe",
  name: "Casual Shirt",
  price: 45,
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  img: "images/img-1.jpg"
},
{
  id: "kfjrwnjadsnj",
  name: "Office Shirt",
  price: 100,
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  img: "images/img-2.jpg"
},
{
  id: "nkfrjwefb",
  name: "T Shirt",
  price: 25,
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  img: "images/img-3.jpg"
},
{
  id: "lscma",
  name: "Mens Suit",
  price: 300,
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  img: "images/img-4.jpg"
},
{
  id: "ruhsmnwlp",
  name: "Blue Tie",
  price: 20,
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  img: "images/img-5.png"
}];

// ? Creating a shopping basket/cart
// ? It will contain objects of type
// ? {
// ?    id_of_item: id
// ?    qty_of_item : qty
// ? }
let basket = JSON.parse(localStorage.getItem("data")) || [];

// ? This function fills the shop element with items
// ? We map the stored data of each item to div.item
// ? Finally join them and write it in shop.innerHTML
// ? (div.shop was kept empty in index.html)
let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    let search = basket.find((a) => a.id == id) || [];
    return `
        <div id=product-id-${id} class="item">
          <img width="220" src="${img}" alt="">
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>$ ${price}</h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
        `;
  }).join(""));
};
generateShop();

// ? Implementing the + and - functionality for an item
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
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
}

let decrement = (selectedItem) => {

  let search = basket.find((x) => x.id == selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 1) {
    let index = basket.indexOf(search);
    basket.splice(index, 1);
  }
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
}

// ? Both increment and decrement function call update()
// ? it updates the quantity being displayed on screen,
// ? and calls calculation() which calculates total no.
// ? of items in the basket and updates navbar cart-icon
let update = (id) => {
  let search = basket.find((x) => x.id == id);
  if (search === undefined)
    document.getElementById(id).innerHTML = 0;
  else
    document.getElementById(id).innerHTML = search.item;
  console.log("basket updated");
  calculation();
}
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
// ? Calling the calculate function every time the page reloads
// ? so that the number on top of cart icon is always up-to-date
calculation();