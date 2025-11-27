// Product data
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

// Load existing cart
function getCart() {
  const saved = sessionStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}

// Save cart
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}`;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";

    btn.addEventListener("click", function () {
      addToCart(product.id);
    });

    li.appendChild(btn);
    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart → THIS produces the EXACT output Cypress expects
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);

  cart.push(product);  
  saveCart(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
