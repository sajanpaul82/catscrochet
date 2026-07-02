const ADMIN_PASSWORD = "CrochetAdmin2026!";
const ADMIN_SESSION_KEY = "loopLittleAdminUnlocked";

let adminProducts = [];

const loginView = document.querySelector("#loginView");
const adminView = document.querySelector("#adminView");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const form = document.querySelector("#productForm");
const formTitle = document.querySelector("#formTitle");
const productList = document.querySelector("#adminProducts");
const productCount = document.querySelector("#productCount");

function isUnlocked() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function showLogin() {
  loginView.classList.remove("locked");
  adminView.classList.add("locked");
  document.querySelector("#adminPassword").focus();
}

function showAdmin() {
  loginView.classList.add("locked");
  adminView.classList.remove("locked");
  initializeAdmin();
}

function unlockAdmin() {
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  showAdmin();
}

function lockAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  showLogin();
}

function makeId(name) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "product"}-${Date.now()}`;
}

function getFormProduct() {
  const data = new FormData(form);
  const id = data.get("id") || makeId(data.get("name"));

  return normalizeProduct({
    id,
    name: data.get("name"),
    price: data.get("price"),
    originalPrice: data.get("originalPrice"),
    category: data.get("category"),
    image: data.get("image"),
    description: data.get("description"),
    offer: data.get("offer"),
    status: data.get("status")
  });
}

function fillForm(product) {
  formTitle.textContent = "Edit Product";
  form.elements.id.value = product.id;
  form.elements.name.value = product.name;
  form.elements.price.value = product.price;
  form.elements.originalPrice.value = product.originalPrice || "";
  form.elements.category.value = product.category;
  form.elements.status.value = product.status || "";
  form.elements.offer.value = product.offer || "";
  form.elements.image.value = product.image;
  form.elements.description.value = product.description;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearForm() {
  form.reset();
  formTitle.textContent = "Add Product";
  form.elements.id.value = "";
  form.elements.image.value = "assets/product-plush.svg";
  form.elements.status.value = "In stock";
}

function renderAdminProducts() {
  productCount.textContent = `${adminProducts.length} ${adminProducts.length === 1 ? "item" : "items"}`;

  if (!adminProducts.length) {
    productList.innerHTML = '<p class="empty">No products yet. Add the first one using the form.</p>';
    return;
  }

  productList.innerHTML = adminProducts.map((product) => `
    <article class="admin-product">
      <img src="${product.image}" alt="">
      <div>
        <div class="admin-product-title">
          <h3>${product.name}</h3>
          <strong>${money(product.price)}</strong>
        </div>
        <p>${product.description}</p>
        <div class="product-badges">
          <span class="badge">${categoryLabel(product.category)}</span>
          ${product.status ? `<span class="badge">${product.status}</span>` : ""}
          ${product.offer ? `<span class="badge sale">${product.offer}</span>` : ""}
          ${product.originalPrice ? `<span class="badge">Was ${money(product.originalPrice)}</span>` : ""}
        </div>
      </div>
      <div class="admin-product-actions">
        <button class="button secondary dark" type="button" data-edit="${product.id}">Edit</button>
        <button class="button danger" type="button" data-delete="${product.id}">Delete</button>
      </div>
    </article>
  `).join("");
}

function initializeAdmin() {
  adminProducts = loadProducts();
  clearForm();
  renderAdminProducts();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = new FormData(loginForm).get("password");

  if (password === ADMIN_PASSWORD) {
    loginError.textContent = "";
    loginForm.reset();
    unlockAdmin();
    return;
  }

  loginError.textContent = "Incorrect password. Please try again.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isUnlocked()) return;

  const product = getFormProduct();
  const index = adminProducts.findIndex((item) => item.id === product.id);

  if (index >= 0) {
    adminProducts[index] = product;
  } else {
    adminProducts.unshift(product);
  }

  saveProducts(adminProducts);
  renderAdminProducts();
  clearForm();
});

productList.addEventListener("click", (event) => {
  if (!isUnlocked()) return;

  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");

  if (editButton) {
    const product = adminProducts.find((item) => item.id === editButton.dataset.edit);
    if (product) fillForm(product);
  }

  if (deleteButton) {
    adminProducts = adminProducts.filter((item) => item.id !== deleteButton.dataset.delete);
    saveProducts(adminProducts);
    renderAdminProducts();
    clearForm();
  }
});

document.querySelector("#clearForm").addEventListener("click", clearForm);

document.querySelector("#resetProducts").addEventListener("click", () => {
  if (!isUnlocked()) return;
  adminProducts = resetProducts();
  renderAdminProducts();
  clearForm();
});

document.querySelector("#logoutAdmin").addEventListener("click", lockAdmin);

if (isUnlocked()) {
  showAdmin();
} else {
  showLogin();
}
