const main = document.querySelector(".product-detail-page-container");

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
  const productImages = images.data.data;
  const price = product[2].toString().split(".");
  main.innerHTML = `
    <section class="product-detail-container">
    <section class="left-section">
      <div class="main-image-container image-container"></div>
      <div class="small-images-container">
        <span class="small-image image-container" style="background-image: url(${productImages[0][1]}"></span>
        <span class="small-image image-container" style="background-image: url(${productImages[1][1]}"></span>
        <span class="small-image image-container" style="background-image: url(${productImages[2][1]}"></span>
        <span class="small-image image-container" style="background-image: url(${productImages[3][1]}"></span>
      </div>
    </section>
    <section class="right-section">
      <h1 class="product-name">${product[1]}</h1>
      <p class="category">${product[7]}</p>
      <p class="product-price">Rs.${price[0]}.<span>${price[1]}</span></p>
      <button class="order-btn">Order now</button>
      <p class="availability">${product[3]}</p>
    </section>
  </section>
  <section class="similar-product-display"></section>
  `;
  const mainImageContainer = document.querySelector(".main-image-container");
  const smallImageContainers = document.querySelectorAll(".small-image");

  mainImageContainer.style.backgroundImage = `url(${productImages[0][1]})`;

  smallImageContainers.forEach((smallContainer, index) => {
    smallContainer.addEventListener("click", () => {
      mainImageContainer.style.backgroundImage = `url(${productImages[index][1]})`;
    });
  });
};

getProductDetails();
