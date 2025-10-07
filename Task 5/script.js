document.addEventListener("DOMContentLoaded", () => {
  // --- MOCK PRODUCT DATA ---
  const products = {
    clothes: [
      {
        id: 1,
        name: "Men's Classic T-Shirt",
        price: 15.99,
        image: "https://placehold.co/300x300/f0f0f0/000?text=T-Shirt",
      },
      {
        id: 2,
        name: "Women's Denim Jeans",
        price: 45.5,
        image: "https://placehold.co/300x300/f0f0f0/000?text=Jeans",
      },
      {
        id: 3,
        name: "Summer Floral Dress",
        price: 35.0,
        image: "https://placehold.co/300x300/f0f0f0/000?text=Dress",
      },
      {
        id: 4,
        name: "Leather Jacket",
        price: 120.0,
        image: "https://placehold.co/300x300/f0f0f0/000?text=Jacket",
      },
    ],
    furniture: [
      {
        id: 5,
        name: "Modern Coffee Table",
        price: 150.0,
        image: "https://placehold.co/300x300/cccccc/000?text=Table",
      },
      {
        id: 6,
        name: "Ergonomic Office Chair",
        price: 250.99,
        image: "https://placehold.co/300x300/cccccc/000?text=Chair",
      },
      {
        id: 7,
        name: "King Size Bed Frame",
        price: 400.0,
        image: "https://placehold.co/300x300/cccccc/000?text=Bed",
      },
    ],
    mobiles: [
      {
        id: 8,
        name: "Smartphone Model X",
        price: 699.99,
        image: "https://placehold.co/300x300/999999/fff?text=Phone+X",
      },
      {
        id: 9,
        name: "Smartphone Model Y",
        price: 899.99,
        image: "https://placehold.co/300x300/999999/fff?text=Phone+Y",
      },
      {
        id: 10,
        name: "Budget Smartphone Z",
        price: 249.5,
        image: "https://placehold.co/300x300/999999/fff?text=Phone+Z",
      },
    ],
  };

  // --- DOM ELEMENTS ---
  const mainContent = document.getElementById("main-content");
  const productListSection = document.getElementById("product-list-section");
  const categoryBoxes = document.querySelectorAll(".box");
  const backToHomeBtn = document.querySelector(".back-button");
  const productGrid = document.getElementById("product-grid");
  const categoryTitle = document.getElementById("category-title");

  const cartBtn = document.getElementById("nav-cart-container");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.querySelector(".close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCountEl = document.getElementById("cart-count");

  // --- APP STATE ---
  let cart = [];

  // --- FUNCTIONS ---
  function showProductPage(category) {
    const categoryProducts = products[category] || [];
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    categoryTitle.textContent = `Shop in ${categoryName}`;
    productGrid.innerHTML = "";

    if (categoryProducts.length > 0) {
      categoryProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
                            <img src="${product.image}" alt="${
          product.name
        }" class="product-card-img">
                            <h3 class="product-card-name">${product.name}</h3>
                            <p class="product-card-price">$${product.price.toFixed(
                              2
                            )}</p>
                            <button class="add-to-cart-btn" data-product-id="${
                              product.id
                            }" data-category="${category}">Add to Cart</button>
                        `;
        productGrid.appendChild(productCard);
      });
    } else {
      productGrid.innerHTML = `<p>Sorry, no products found in this category.</p>`;
    }

    mainContent.classList.add("hidden");
    productListSection.classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  function showHomePage() {
    productListSection.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }

  function addToCart(productId, category) {
    const productToAdd = products[category]?.find((p) => p.id == productId);
    if (productToAdd) {
      cart.push(productToAdd);
      updateCart();
    }
  }

  function removeFromCart(productId) {
    const productIndex = cart.findIndex((p) => p.id == productId);
    if (productIndex > -1) {
      cart.splice(productIndex, 1);
      updateCart();
    }
  }

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p id="cart-empty-msg">Your cart is empty.</p>';
      cartTotalEl.innerHTML = "";
    } else {
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                            <img src="${item.image}" alt="${
          item.name
        }" class="cart-item-img">
                            <div class="cart-item-details">
                                <p class="cart-item-name">${item.name}</p>
                                <p class="cart-item-price">$${item.price.toFixed(
                                  2
                                )}</p>
                            </div>
                            <button class="remove-from-cart-btn" data-product-id="${
                              item.id
                            }">Remove</button>
                        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
      });
      cartTotalEl.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    }

    cartCountEl.textContent = cart.length;
  }

  function openCart() {
    updateCart();
    cartModal.classList.remove("hidden");
  }

  function closeCart() {
    cartModal.classList.add("hidden");
  }

  // --- EVENT LISTENERS ---
  categoryBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const category = box.dataset.category;
      showProductPage(category);
    });
  });

  backToHomeBtn.addEventListener("click", showHomePage);

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = e.target.dataset.productId;
      const category = e.target.dataset.category;
      addToCart(productId, category);
      e.target.textContent = "Added!";
      setTimeout(() => {
        e.target.textContent = "Add to Cart";
      }, 1000);
    }

    if (e.target.classList.contains("remove-from-cart-btn")) {
      const productId = e.target.dataset.productId;
      removeFromCart(productId);
    }
  });

  cartBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCart();
    }
  });

  const backToTopButton = document.querySelector(".foot-panel1");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
