const main = document.querySelector(".product-detail-page-container");
const similarProductsContainer = document.querySelector(
  ".similar-product-container"
);

const defaultImage = "../../assets/no-image-svgrepo-com.svg";

const getProductId = () => {
  const id = new URLSearchParams(window.location.search);
  return id.get("id");
};

const getProductDetails = async () => {
  const id = getProductId();
  const item = await axios.get(`http://127.0.0.1:8000/product/getitem/${id}`);
  const images = await axios.get(
    `http://127.0.0.1:8000/product/getitem/images/${id}`
  );
  const product = item.data.data;
  const similar = await axios.get(
    `http://127.0.0.1:8000/product/similar/${product[4]}/${id}`
  );
  const similarProductsImages = await axios.get(
    `http://127.0.0.1:8000/product/similar/coverimages/${product[4]}/${id}`
  );
  const coverImages = similarProductsImages.data.data;
  const similarProducts = similar.data.data;
  let productImages = images.data.data;
  const price = product[2].toString().split(".");

  if (!productImages) {
    productImages = [];
  }

  similarProducts.forEach((product, index) => {
    const price = product[2].toString().split(".");
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <div class="image-container" style="background-image: url(${
        coverImages[index]?.[1] || defaultImage
      })">
      </div>
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
    productCard.addEventListener("click", () => {
      window.open(
        `../../pages/product-detail/product-detail.html?id=${product[0]}`
      );
    });
    similarProductsContainer.appendChild(productCard);
  });

  main.innerHTML = `
    <section class="product-detail-container">
    <section class="left-section">
      <div class="main-image-container image-container"></div>
      <div class="small-images-container">
        <span class="small-image image-container" style="background-image: url(${
          productImages[0]?.[1] || defaultImage
        })"></span>
        <span class="small-image image-container" style="background-image: url(${
          productImages[1]?.[1] || defaultImage
        })"></span>
        <span class="small-image image-container" style="background-image: url(${
          productImages[2]?.[1] || defaultImage
        })"></span>
        <span class="small-image image-container" style="background-image: url(${
          productImages[3]?.[1] || defaultImage
        })"></span>
      </div>
    </section>
    <section class="right-section">
      <h1 class="product-name">${product[1]}</h1>
      <p class="category">${product[7]}</p>
      <p class="product-price">Rs.${price[0]}.<span>${price[1]}</span></p>
      <button class="order-btn">Order now</button>
      <p class="availability"><span class=${
        product[3] === "Available" ? "available" : "notavailable"
      }>${product[3]}</span> in stock</p>
    </section>
  </section>`;

  main.appendChild(similarProductsContainer);

  const mainImageContainer = document.querySelector(".main-image-container");
  const smallImageContainers = document.querySelectorAll(".small-image");

  mainImageContainer.style.backgroundImage = `url(${
    productImages[0]?.[1] || defaultImage
  })`;

  smallImageContainers.forEach((smallContainer, index) => {
    smallContainer.addEventListener("click", () => {
      mainImageContainer.style.backgroundImage = `url(${
        productImages[index]?.[1] || defaultImage
      })`;
    });
  });
};

getProductDetails();
