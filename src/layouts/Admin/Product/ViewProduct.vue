<template>
  <div>
    <Header />
    <div class="product-container">
      <div class="main-section">
        <div class="left-section">
          <div class="left-section">
            <img @click="toggleModal" :src="main_image_url" alt="Product Image" class="product-image">
            <div v-if="showModal" class="modal">
              <span class="close" @click="toggleModal">&times;</span>
              <img :src="main_image_url" class="modal-content">
            </div>
          </div>
          <div v-if="showModal" class="modal">
            <span class="close" @click="toggleModal">&times;</span>
            <img :src="current_image" class="modal-content">
            <div class="button-container">
              <button class="scroll-btn-next" @click="prevImage">Назад</button>
              <button class="scroll-btn-back" @click="nextImage">Вперед</button>
            </div>
          </div>
        </div>
        <div class="right-section">
          <p class="product-price-r">Ціна: {{ price }} грн <button class="orders-button" @click.stop="goToOrder(id)">Замовити</button></p>
          <h2 class="product-name">{{ name }}</h2>
          <div class="short-description">
            <p>{{ short_description }}</p>
          </div>
          <div class="full-description">
            <p>{{ full_description }}</p>
          </div>
          <button class="orders-big-button" @click.stop="goToOrder(id)">Замовити</button>
        </div>
      </div>
      <div class="additional-images">
        <img class="additional-img" 
             v-for="(url, index) in secondary_images_urls" 
             :key="index" 
             :src="url" 
             :alt="'Additional Image ' + url" 
             @click="openModal(index + 1)">
      </div>
      <h1 class="recommend-label">Рекомендовані товари</h1>
      <div class="recommend-product">
        <div v-for="product in products" :key="product.id" class="product-card-r" @click="viewProduct(product.id)">
          <div class="recommend-product-card">
            <img :src="fullImageUrl(product.main_image)" alt="" class="recommend-product-image-cards"/>
          </div>
          <div class="product-text-card">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Admin/HeaderAdmin.vue';  

export default {

  components: {
    Header,
  },

  data() {
    return {
      name: '',
      price: 0,
      cost: 0,
      short_description: '',
      full_description: '',
      main_image_url: '',
      secondary_images_urls: [],
      showModal: false,
      currentImageIndex: 0,
      imageBaseUrl: this.$imgPath,
      products: [],
    };
  },

  computed: {
    current_image() {
      return this.all_images[this.currentImageIndex];
    },

    all_images() {
      return [this.main_image_url, ...this.secondary_images_urls];
    },
    
    fullImageUrl() {
      return (imagePath) => this.imageBaseUrl + imagePath;
    },
  },

  methods: {
    async goToOrder(product_id) {
      this.$router.push({ name: 'СCreateOrder', params: { product_id: product_id } });
    },

    openModal(index) {
      this.currentImageIndex = index;
      this.showModal = true;
    },

    toggleModal() {
      this.currentImageIndex = 0;
      this.showModal = !this.showModal;
    },

    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.all_images.length) % this.all_images.length;
    },

    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.all_images.length;
    },

    async viewProduct(product_id) {
      this.$router.push({ name: 'СViewProduct', params: { product_id: product_id } })
      .then(() => {
        this.$nextTick(() => {
          location.reload(); 
        });
      });
    },

    async getData() {
      const product_id = this.$route.params.product_id;
      const cachedProduct = localStorage.getItem(`product_${product_id}`);
      if (cachedProduct) {
        this.setProductData(JSON.parse(cachedProduct));
      } else {
    
        const response = await fetch(this.$apiUrl + `admin/product/getdata/${product_id}`);
        if (response.ok) {
          const product = await response.json();
          localStorage.setItem(`product_${product_id}`, JSON.stringify(product));
          this.setProductData(product);
        } 
      }
    },

    setProductData(product) {
      this.name = product.name;
      this.price = parseFloat(product.price);
      this.cost = parseFloat(product.cost);
      this.short_description = product.short_description;
      this.full_description = product.full_description;
      this.main_image_url = this.imageBaseUrl + product.main_image;
      this.selected_category = product.category_id;
      this.secondary_images_urls = product.secondary_images.map(img => this.imageBaseUrl + img.image_path);
    },  
  },

  async created() {
    const response = await fetch(this.$apiUrl + 'admin/product/getall');
    if (response.ok) {
      const productsData = await response.json();
      this.products = productsData;
    } 
  },

  mounted() {
    this.getData();
  },
};

</script>

<style scoped>

.button-container {
  display: flex !important;
  align-items: center;
  margin-top: 10px;
}

.button-container button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  
}

.button-container button:hover {
  background-color: #0056b3;
}  

.product-container {
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.scroll-btn-next {
  margin-left: 46% !important;
  margin-top: 15px !important;
  width: 100px;
}

.scroll-btn-back {
  margin-top: 15px !important;
  width: 100px;
}

.button-container::after {
  content: "";
  display: table;
  clear: both;
}

.main-section {
  display: flex;
  flex-direction: row;
  width: calc(100% - 100px);  
}

.left-section .product-image {
  max-height: 80vh;
  margin-top: 30px;
  width: auto;
  height: 100%;  
  object-fit: cover;
}

.additional-images {
  width: 12vw;  
  margin-right: 0vw;
  margin-top: 15px;
}

.additional-images img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-image {
  cursor: pointer;
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
}

.product-name,
.product-price,
.product-cost {
  margin-top: 10px;
}

.product-price {
  margin-left: 20px; 
  color: green !important; 
}

.product-name {
  margin-top: 10px;
  text-align: center;
}

.orders-button {
  background-color: #ffcc00; 
  color: black; 
  padding: 8px 16px; 
  font-size: 14px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  margin: 2px 1px; 
  transition-duration: 0.4s; 
  box-shadow: 0 5px #999; 
}

.orders-button:hover {
  background-color: #e6b800; 
  color: white; 
  box-shadow: 0 3px #666; 
  transform: translateY(-2px); 
}

.right-section {
  flex: 1;
  padding: 20px;
}

.short-description,
.full-description {
  margin-top: 10px;
  text-align: justify;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  max-height: 80vh;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.additional-img {
  cursor: pointer;
  max-width: 100%;
  max-height: 30vh;
  margin: 5px;
  border-radius: 10px; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  transition: box-shadow 0.3s; 
}

.additional-img:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); 
}

.recommend-product {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(8, 1fr); 
  gap: 20px;
  margin-top: 100vh;
  padding-bottom: 10vh;
}

.recommend-product > *:nth-child(n+9) {
  display: none;
}

.recommend-product-card {
  cursor: pointer;
}

.recommend-product-image-cards {
  width: 10vw;
}

.recommend-label {
  position: absolute;
  margin-top: 90vh;
  margin-left: 40vw;
}

.product-card-r {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  width: 10vw;
}

.product-card-r:hover {
  transform: scale(1.05); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.orders-big-button {
  background-color: #ffcc00; 
  color: black; 
  padding: 15px 30px; 
  font-size: 18px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  margin: 4px 2px; 
  transition-duration: 0.4s; 
  box-shadow: 0 9px #999; 
  margin-left: 20vw;
}

.orders-big-button:hover {
  background-color: #e6b800; 
  color: white; 
  box-shadow: 0 5px #666; 
  transform: translateY(-2px); 
}


@media (max-width: 1700px) {
  .button-container{
    margin-left: -5vw !important;
  } 
}

@media (max-width: 1600px) {
  .orders-big-button {
    margin-left: 16vw;
  } 
}

@media (max-width: 1600px) {
  .orders-big-button {
    margin-left: 13vw;
  } 
}

@media (max-width: 1300px) {
  .button-container{
    margin-left: -8vw !important;
  } 
  .recommend-product {
    margin-top: 90vh;
    gap: 25px;
    grid-template-columns: repeat(6, 1fr); 
  }
  .recommend-product > *:nth-child(n+7) {
    display: none;
  }
  .recommend-product-image-cards {
    width: 12vw;
  }
  .product-card-r {
    width: 12vw;
  }
  .left-section .product-image {
    max-height: 70vh;
  }
  .recommend-label {
    margin-top: 80vh;
  }
}

@media (max-width: 1100px) {
  .button-container{
    margin-left: -8vw !important;
  } 
  .recommend-product {
    margin-top: 80vh;
    grid-template-columns: repeat(5, 1fr); 
  }
  .recommend-product > *:nth-child(n+6) {
    display: none;
  }
  .recommend-product-image-cards {
    width: 16vw;
  }
  .product-card-r {
    width: 16vw;
  }
  .left-section .product-image {
    max-height: 60vh;
  }
  .recommend-label {
    margin-top: 70vh;
  }
  .additional-images {
    display: none;
  }
}

@media (max-width: 850px) {
  .full-description, .short-description {
    width: 30vw;
  }
}

@media (max-width: 800px) {
  .recommend-product{
    display: none;
  }
  .recommend-label {
    display: none;
  }
  .button-container{
    margin-left: -13vw !important;
  } 
}

@media (max-width: 700px) {
  .main-section {
    display: flex;
    flex-direction: column;
  }
  .left-section {
    width: 100%; 
  }
  .left-section .product-image {
    height: auto;
    width: 90vw; 
    margin: 0 auto; 
    margin-top: 2vh;
  } 
  .right-section {
    position: relative; 
    width: 80vw; 
    margin-top: 20px; 
  }
  .full-description, .short-description {
    width: 80vw;
  }
  .modal-content {
    max-height: auto;
    width: 100vw;
  }
  .orders-big-button {
    margin-left: 20vw;
  } 
}

@media (max-width: 500px) {
  .button-container{
    margin-left: -45vw !important;
  } 
}
</style>

