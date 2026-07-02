let products = loadProducts();

const state = {
  filter: "all",
  cart: []
};

const productGrid = document.querySelector("#productGrid");
const cartPanel = document.querySelector("#cartPanel");
const scrim = document.querySelector("#scrim");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");

function renderProducts() {
  products = loadProducts();
  const visibleProducts = state.filter === "all"
    ? products
    : products.filter((product) => product.category === state.filter);

  if (!visibleProducts.length) {
    productGrid.innerHTML = '<p class="empty products-empty">No products match this filter yet.</p>';
    return;
  }

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-body">
        <div class="product-badges">
          ${product.offer ? `<span class="badge sale">${product.offer}</span>` : ""}
          ${product.status ? `<span class="badge">${product.status}</span>` : ""}
        </div>
        <div class="product-meta">
          <h3 class="product-title">${product.name}</h3>
          <span class="price">
            ${product.originalPrice ? `<del>${money(product.originalPrice)}</del>` : ""}
            ${money(product.price)}
          </span>
        </div>
        <p>${product.description}</p>
        <button class="button primary" type="button" data-add="${product.id}">Add to Bag</button>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  cartCount.textContent = state.cart.length;
  const total = state.cart.reduce((sum, productId) => {
    const product = products.find((item) => item.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  cartTotal.textContent = money(total);

  if (!state.cart.length) {
    cartItems.innerHTML = '<p class="empty">Your bag is empty.</p>';
    return;
  }

  cartItems.innerHTML = state.cart.map((productId, index) => {
    const product = products.find((item) => item.id === productId);
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="">
        <div>
          <h3>${product.name}</h3>
          <p>${money(product.price)}</p>
        </div>
        <button class="remove-button" type="button" data-remove="${index}" aria-label="Remove ${product.name}">x</button>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  scrim.classList.add("open");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  scrim.classList.remove("open");
}

function draftCheckoutEmail() {
  const selected = state.cart.map((productId) => products.find((product) => product.id === productId));
  const lines = selected.map((product) => `- ${product.name}: ${money(product.price)}`);
  const total = selected.reduce((sum, product) => sum + product.price, 0);
  const body = [
    "Hello Cats Crochet,",
    "",
    "I would like to ask about ordering:",
    ...lines,
    "",
    `Estimated product total: ${money(total)}`,
    "",
    "My shipping ZIP code is:",
    "Any notes:"
  ].join("\n");

  window.location.href = `mailto:sajanpaul@gmail.com?subject=${encodeURIComponent("Crochet order request")}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
  });
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  state.cart.push(button.dataset.add);
  renderCart();
  openCart();
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  state.cart.splice(Number(button.dataset.remove), 1);
  renderCart();
});

document.querySelector(".cart-toggle").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
scrim.addEventListener("click", closeCart);

document.querySelector("#checkoutButton").addEventListener("click", () => {
  if (!state.cart.length) return;
  draftCheckoutEmail();
});

document.querySelector("#customForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = [
    "Hello Cats Crochet,",
    "",
    "I would like to ask about a custom crochet order.",
    "",
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Item type: ${data.get("type")}`,
    "",
    "Details:",
    data.get("details") || "No extra details yet."
  ].join("\n");

  window.location.href = `mailto:sajanpaul@gmail.com?subject=${encodeURIComponent("Custom crochet request")}&body=${encodeURIComponent(body)}`;
});

renderProducts();
renderCart();
