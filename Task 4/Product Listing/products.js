const products = [
  { name: "Smartphone", category: "electronics", price: 500, rating: 4 },
  { name: "Laptop", category: "electronics", price: 1200, rating: 5 },
  { name: "Headphones", category: "electronics", price: 150, rating: 4 },
  { name: "T-Shirt", category: "clothing", price: 25, rating: 3 },
  { name: "Jeans", category: "clothing", price: 50, rating: 5 },
  { name: "Book A", category: "books", price: 15, rating: 4 },
  { name: "Book B", category: "books", price: 20, rating: 5 },
  { name: "Cap", category: "accessories", price: 10, rating: 3 },
  { name: "Watch", category: "accessories", price: 200, rating: 4 },
  { name: "Tablet", category: "electronics", price: 350, rating: 4 }
];

const grid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortSelect = document.getElementById("sort");

// Render products
function renderProducts(items) {
  grid.innerHTML = "";
  items.forEach(p => {
    grid.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: $${p.price}</p>
        <p>Rating: ⭐ ${p.rating}</p>
      </div>`;
  });
}

// Filter & Sort logic
function updateProducts() {
  let filtered = [...products];

  // Category filter
  const catVal = categoryFilter.value;
  if (catVal !== "all") filtered = filtered.filter(p => p.category === catVal);

  // Price filter
  const priceVal = priceFilter.value;
  if (priceVal !== "all") {
    const [min, max] = priceVal.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  // Sorting
  const sortVal = sortSelect.value;
  if (sortVal === "low-high") filtered.sort((a,b) => a.price - b.price);
  if (sortVal === "high-low") filtered.sort((a,b) => b.price - a.price);
  if (sortVal === "rating") filtered.sort((a,b) => b.rating - a.rating);

  renderProducts(filtered);
}

// Event listeners
categoryFilter.addEventListener("change", updateProducts);
priceFilter.addEventListener("change", updateProducts);
sortSelect.addEventListener("change", updateProducts);

// Initial render
renderProducts(products);
