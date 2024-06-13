<template>
  <Header :products="products" @category-selected="filterProductsByCategory" @price-filter="filterProductsByPrice" @reset-filters="resetProductFilters" />
  <div class="main-content">
    <LeftBar class="left-bar" :products="products" @category-selected="filterProductsByCategory" @price-filter="filterProductsByPrice" @reset-filters="resetProductFilters" />
    <RecommendedModal v-if="showRecommendedModal" @for-type="sortedForType" />
    <div class="content">
      <div class="product-grid">
        <div v-for="product in paginatedProducts" :key="product.id" class="product-card" @click="viewProduct(product.id)">
          <div class="product-image-card">
            <img :src="fullImageUrl(product.main_image)" alt="" class="product-image-cards"/>
          </div>
          <div class="product-text-card">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}</p>
            <p class="product-description">{{ product.short_description }}</p>
            <button class="orders-button" @click.stop="goToOrder(product.id)">Замовити</button>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{ active: currentPage === page }">{{ page }}</button>
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Client/HeaderClient.vue'; 
import LeftBar from '@/components/Client/LeftBar.vue';
import RecommendedModal from '@/components/Client/RecommendedModal.vue';

export default {

  components: {
    Header,
    LeftBar,
    RecommendedModal
  },

  metaInfo() {
    return {
      title: 'Сладкие букеты в Новомосковске',
      meta: [
        { name: 'description', content: 'Купить сладкие букеты в Новомосковске. Большой выбор букетов из конфет и других сладостей. Доставка по городу.' },
        { name: 'keywords', content: 'сладкие букеты, купить букеты из конфет, Новомосковск, букеты на подарок' }
      ]
    };
  },


  data() {
    return {
      products: [],
      filteredProducts: [],
      selectedCategory: null,
      priceRange: { min: null, max: null },
      imageBaseUrl: this.$imgPath,
      currentPage: 1, 
      itemsPerPage: 12, 
      showRecommendedModal: !localStorage.getItem('modalShown')
    };
  },

  computed: {
    fullImageUrl() {
      return (imagePath) => this.imageBaseUrl + imagePath;
    },

    paginatedProducts() {
      let start = (this.currentPage - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }
  },

  methods: {
    async viewProduct(product_id) {

      let client_id = localStorage.getItem('client_id');
      if (!client_id) {
        client_id = Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
        localStorage.setItem('client_id', client_id);
      }

      const postData = {
        product_id: product_id,
        client_id: client_id
      };

      const response = await fetch(this.$apiUrl + 'admin/tracker/save/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      this.$router.push({ name: 'СViewProduct', params: { product_id: product_id } });
    },

    async goToOrder(product_id) {
      this.$router.push({ name: 'СCreateOrder', params: { product_id: product_id } });
    },

    setProductsData(productsData) {
      this.products = productsData;
      this.filteredProducts = productsData;
      if (this.selectedCategory || this.priceRange.min !== null || this.priceRange.max !== null) {
        this.applyFilters();
      }
    },

    filterProductsByCategory(category) {
      this.selectedCategory = category;
      this.applyFilters();
    },

    filterProductsByPrice(range) {
      this.priceRange = range;
      this.applyFilters();
    },

    sortedForType(targetType) {
      this.filteredProducts.sort((productA, productB) => {
        const matchesAType = productA.for_type === targetType;
        const matchesBType = productB.for_type === targetType;

        if (matchesAType && !matchesBType) {
          return -1;  
        } else if (!matchesAType && matchesBType) {
          return 1;   
        } else if (matchesAType && matchesBType) {
          return productB.priority - productA.priority;  
        }
        return 0;  
      });

      this.updateProductsCache();
    },

    applyFilters() {
      this.filteredProducts = this.products.filter(product => {
        let categoryCondition = true;
        if (this.selectedCategory) {
          categoryCondition = product.category_ids.includes(this.selectedCategory.id);
        }

        let priceCondition = true;
        if (this.priceRange.min !== null || this.priceRange.max !== null) {
          let minPrice = this.priceRange.min !== null ? this.priceRange.min : 0;
          let maxPrice = this.priceRange.max !== null ? this.priceRange.max : Number.MAX_VALUE;
          priceCondition = parseFloat(product.price) >= minPrice && parseFloat(product.price) <= maxPrice;
        }

        return categoryCondition && priceCondition;
      });

      this.currentPage = 1;
    },


    resetProductFilters() {
      this.selectedCategory = null;
      this.priceRange = { min: null, max: null };
      this.filteredProducts = this.products;
    },

   async fetchAndCacheProducts() {

      await fetch(this.$apiUrl + 'admin/tracker/uniquevisitor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await fetch(this.$apiUrl + 'admin/product/getall');
      if (response.ok) {
        const productsData = await response.json();
        localStorage.setItem('cachedProducts', JSON.stringify(productsData));
        this.setProductsData(productsData);
      }
    },

    updateProductsCache() {
      localStorage.setItem('cachedSortedProducts', JSON.stringify(this.filteredProducts));
    }

  },

  watch: {
    currentPage(newValue) {
      localStorage.setItem('currentPage', newValue.toString());
      window.scrollTo(0, 0);
    }
  },

  async created() {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.currentPage = Number(savedPage);
    }

    const cachedProducts = localStorage.getItem('cachedProducts');
    const cachedSortedProducts = localStorage.getItem('cachedSortedProducts');

    if (cachedSortedProducts) {
      this.setProductsData(JSON.parse(cachedSortedProducts));
    } else if (cachedProducts) {
      this.setProductsData(JSON.parse(cachedProducts));
    } else {
      await this.fetchAndCacheProducts();
    }

    if (!localStorage.getItem('modalShown')) {
      localStorage.setItem('modalShown', 'true');
    }
  },

};

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

.product-grid {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 15vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  max-width: 70%; 
}

.product-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

.product-card:hover {
  transform: scale(1.05); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.product-image-card {
  width: 100%;
  display: flex;
  justify-content: center; 
}

.product-image-cards {
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
}

.product-text-card {
  text-align: center;
  padding-top: 15px;
}

.product-name {
  margin: 5px;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: green;
  margin: 7px 0;
}

.product-description {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  padding-left: 15px;
  padding-right: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.pagination button {
  background-color: #f3f3f3; 
  color: #333; 
  border: 1px solid #ddd; 
  border-radius: 5px; 
  padding: 5px 10px; 
  margin: 0 5px; 
  cursor: pointer; 
  transition: background-color 0.3s, color 0.3s; 
}

.pagination button:hover {
  background-color: #e6e2d3; 
  color: #000; 
}

.pagination button.active {
  background-color: #d2b48c; 
  color: #fff;
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
  margin-top: 10px;
}

.orders-button:hover {
  background-color: #e6b800; 
  color: white; 
  box-shadow: 0 3px #666; 
  transform: translateY(-2px); 
}

.main-content {
  display: flex;
}

.content {
  flex-grow: 1; 
}

@media (max-width: 1550px) {
  .product-grid{
    max-width:80%;
    margin-left: 8vw;
    grid-template-columns: repeat(3, 1fr); 
  } 
}

@media (max-width: 1150px) {
  .product-grid{
    max-width:80%;
    margin-left: 6vw;
    grid-template-columns: repeat(3, 1fr); 
  } 
}

@media (max-width: 830px) {
  .product-grid{
    max-width:80%;
    margin-left: 4vw;
    grid-template-columns: repeat(2, 1fr); 
  } 

  .product-description{
    display: none;
  }

  .product-card:hover {
    transform: none; 
    box-shadow: none; 
  }
}

@media (max-width: 600px) {
  .product-grid{
    max-width:90%;
    margin-left: 0vw;
    grid-template-columns: repeat(2, 1fr); 
  } 

  .product-name {
    height: 30px;
  }
}

@media (max-width: 500px) {
  .product-grid{
    max-width:80%;
    margin-left: 12vw;
    grid-template-columns: repeat(2, 1fr); 
  } 
  .left-bar{
    display: none;
  } 
}

@media (max-width: 450px) {
  .product-grid{
    max-width:85%;
    margin-left: 8vw;
    grid-template-columns: repeat(2, 1fr); 
  } 

  .product-name{
    font-size: 12px;
  }

  .orders-button{
    display: none;
  }
} 
</style>

