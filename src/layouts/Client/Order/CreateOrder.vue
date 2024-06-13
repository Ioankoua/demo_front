<template>
  <Header />
  <div>
    <div class="order-container">
      <div class="order-section">
        <h2 class="order-price">
            <span class="order-label">Замовлення:</span>
            <span class="product-details">{{ product.name }} {{ product.price }} грн</span>
        </h2>
        <form class="order-form" @submit.prevent="createOrder">
          <div class="form-group">
            <label class="order-label" for="firstName">Ім'я</label>
            <input type="text" id="firstName" v-model="order.firstName" required>
          </div>
          <div class="form-group">
            <label class="order-label" for="lastName">Прізивище</label>
            <input type="text" id="lastName" v-model="order.lastName" required>
          </div>
          <div class="form-group">
            <label class="order-label" for="phone">Телефон</label>
            <input type="tel" id="phone" v-model="order.phone" required>
          </div>
          <div class="form-group">
            <label class="order-label" for="comment">Коментар</label>
            <textarea class="order-comment" id="comment" placeholder="Ваш комментар..." v-model="order.comment"></textarea>
          </div>
          <div class="button-container-order">
            <button type="submit" class="order-button">Замовити</button>
          </div>
        </form>
      </div>
      <div class="product-images-section">
        <img :src="product.main_image_url" alt="Product Image" class="order-image" @click="viewProduct(product.id)">
        <img class="order-image" 
             v-for="(url, index) in product.secondary_images_urls.slice(0, 3)" 
             :key="index" 
             :src="url" 
             :alt="'Additional Image ' + index"
             @click="viewProduct(product.id)">
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Client/HeaderSimple.vue'; 

export default {

  components: {
    Header
  },

  data() {
    return {
      product: {
        name: '',
        price: 0,
        cost: 0,
        short_description: '',
        full_description: '',
        main_image_url: '',
        secondary_images_urls: [],
        showModal: false,
        currentImageIndex: 0
      },

      order: {
        firstName: '',
        lastName: '',
        phone: '',
        comment: ''
      },
      imageBaseUrl: this.$imgPath,
    };
  },

  methods: {
    async createOrder() {
      if (!this.order.firstName || !this.order.lastName || !this.order.phone) {
            alert('Пожалуйста, заполните все обязательные поля.');
          return;
      }

      const orderData = {
          name: this.order.firstName,
          lastname: this.order.lastName,
          phone: this.order.phone,
          comments: this.order.comment, 
          product: this.product.id,
      };

      const response = await fetch(this.$apiUrl + 'admin/order/create/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
      });

      const data = await response.json();
      this.$router.push({ path: '/order/created' });
    },

    async viewProduct(product_id) {
      this.$router.push({ name: 'СViewProduct', params: { product_id: product_id } });
    },

    async getData() {
      const product_id = this.$route.params.product_id;
      const response = await fetch(this.$apiUrl + `admin/product/getdata/${product_id}`);
      
      if (response.ok) {
        const productData = await response.json();
        this.product.id = productData.id;
        this.product.name = productData.name;
        this.product.price = parseFloat(productData.price);
        this.product.cost = parseFloat(productData.cost);
        this.product.short_description = productData.short_description;
        this.product.full_description = productData.full_description;
        this.product.main_image_url = this.imageBaseUrl + productData.main_image;
        this.product.secondary_images_urls = productData.secondary_images.map(img => this.imageBaseUrl + img.image_path);
      } 
    },
  },

  mounted() {
    this.getData();
  },
};

</script>

<style scoped>
  
 .order-container {
  display: flex;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(~@/assets/backgrounds/lite.png);
  min-height: 100vh;
  overflow-y: hidden;
}

.order-section, .product-section {
  flex: 1;
  padding: 15px;
}

.order-section {
  flex: 0 0 23.2%; 
  padding: 20px;
  border-radius: 5px;
  margin-left: 38.5vw; 
  margin-top: 8vh;
  height: 0px; 
  opacity: 0.90;
}

.product-details {
  margin-left: 5px;
  text-align: center;
  font-size: 22px;
}

.order-image {
  width: 171px; 
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px; 
  cursor: pointer;
}

.product-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.5em;
  color: #4a4a4a;
  margin-top: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"], 
.form-group input[type="tel"], 
.form-group textarea {
  width: 97%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 9px;
}

.button-container-order{
  display: flex;
  justify-content: center;
  width: 100%;
}

.order-button {
  background-color: #4CAF50;
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
  box-shadow: 0 7px #999; 
}

.order-button:hover {
  background-color: #388E3C;
  color: white; 
  box-shadow: 0 5px #666; 
  transform: translateY(-2px); 
}

.product-images-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 22.5vw;
  margin-top: 30px;
}

.order-comment {
  height: 60px;
}

.order-price{
  font-size: 22px;
}

@media (max-width: 1800px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 22vw;
  }
}

@media (max-width: 1500px) {
  .product-images-section {
    margin-left: 25vw;
  }
}

@media (max-width: 1450px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 28vw;
  }
  .order-section {
    margin-left: 30.5vw; 
  }
  .product-images-section {
    margin-left: 15vw;
  }
}

@media (max-width: 1250px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 36vw;
  }
  .order-section {
    margin-left: 30vw; 
  }
  .product-images-section {
    margin-left: 8vw;
  }
}

@media (max-width: 1100px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 38vw;
  }
  .order-section {
    margin-left: 30vw; 
  }
   .product-images-section {
    margin-left: 6vw;
  }
}

@media (max-width: 1000px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 45vw;
  }
  .order-section {
    margin-left: 30vw; 
  }
   .product-images-section {
    display: none;
  }
}

@media (max-width: 850px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 45vw;
  }
  .order-section {
    margin-left: 28.5vw; 
  }
}

@media (max-width: 770px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 46vw;
  }
  .order-section {
    margin-left: 27vw; 
  }
}

@media (max-width: 650px) {
  .form-group input[type="text"], 
  .form-group input[type="tel"], 
  .form-group textarea {
    width: 70vw;
    padding: 12px;
    font-size: 16px;
  }
  .order-section {
    margin-left: 8vw; 
    margin-top: 1vh;
  }

  .order-comment{
    height: 120px;
  }
}

@media (max-width: 360px) {
  .product-details {
    font-size: 16px;
  }
  .order-price {
    font-size: 16px;
  }
  .order-form{
    margin-left: -20px;
  }
} 
</style>