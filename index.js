const categoryToggle = document.querySelector(".category-dropdown-toggle");
const categoryMenu = document.querySelector(".category-dropdown-menu");
const main = document.querySelector(".product-container");
const filterContainer = document.querySelector(".filter-container");

const categoryMap = {
  "knitted items": 40001,
  "crocheted items": 40002,
  "sewn items": 40003,
  "embroidered items": 40004,
  "quilted items": 40005,
  jewelry: 40006,
  "paper crafts": 40007,
  "wood crafts": 40008,
  pottery: 40009,
  candles: 40010,
  soap: 40011,
  paintings: 40012,
  drawings: 40013,
  sculptures: 40014,
  "leather goods": 40015,
};

const toggleCategoryMenu = () => {
  if (categoryMenu.classList.contains("active")) {
    categoryMenu.classList.remove("active");
  } else {
    categoryMenu.classList.add("active");
  }
};

const getAllItems = async () => {
  const items = await axios.get("http://127.0.0.1:8000/getallitems");
  renderProducts(items.data.data);
};

const getItemByCategory = async (id) => {
  const items = await axios.get(
    `http://127.0.0.1:8000/products/category/${id}`
  );
  renderProducts(items.data.data, items.data.data[0][7]);
};

categoryToggle.addEventListener("click", toggleCategoryMenu);

categoryMenu.addEventListener("click", (e) => {
  toggleCategoryMenu();
  getItemByCategory(categoryMap[e.target.textContent]);
});

getAllItems();

const renderProducts = (data, filter) => {
  main.innerHTML = "";
  filterContainer.innerHTML = "";
  if (filter !== undefined) {
    const filterDisplay = document.createElement("p");
    filterDisplay.classList.add("filter-display");
    filterDisplay.textContent = `Filter: ${filter}`;
    const deleteFilter = document.createElement("button");
    deleteFilter.classList.add("remove-filter-btn");
    deleteFilter.innerHTML = `
      <img src="./assets/cancel-svgrepo-com.svg" alt="x" class="remove-filter-icon"/>
    `;

    deleteFilter.addEventListener("click", () => {
      getAllItems();
    });
    filterDisplay.appendChild(deleteFilter);
    filterContainer.appendChild(filterDisplay);
  }

  data.forEach((product) => {
    const price = product[2].toString().split(".");
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <div class="image-container"></div>
      <div class="product-detail">
        <div class="product-card-header">
          <h2 class="product-name">${product[1]}</h2>
          <p class="product-price">Rs.${price[0]}.<span>${price[1]}</span></p>
        </div>
        <p class="product-category">${product[7]}</p>
        <span class="rating-stars">${
          product[6] === null ? "No rating" : "⭐".repeat(product[6])
        }<span class="review-count">(${product[8]})</span></span>
      </div>
    `;
    main.appendChild(productCard);
  });
};