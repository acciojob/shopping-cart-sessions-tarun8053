const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

function getCart() {
  const saved = sessionStorage.getItem("cart") ;
  return saved ? JSON.parse(saved) : [] ;
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart ? cart : []));
}

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ${product.price} `;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";

    btn.addEventListener("click", () => {
      addToCart(product.id);
    });

    li.appendChild(btn);
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
	saveCart(cart);
}

function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  saveCart([]);
  renderCart();
}

clearBtn.addEventListener("click", clearCart);

// Render products and cart on initial load
renderProducts();
renderCart();