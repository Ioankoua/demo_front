<template>
  <header class="header-client">
    <div class="logo"></div>
    <button @click="goToHome" class="header-link">На головну</button> 
    <button @click="goToBuilder" class="header-link about_us">Загрузити власний букет</button>
    <button @click="goToAbout" class="header-link about_us">Про нас</button> 
    <div class="header-text">Наші контакти: 38 (098 - 489 - 54 - 11)</div>
    <a href="https://www.instagram.com/bond_buket_nmsk/?utm_source=qr&igsh=MWsxaW5wYWRoeWhkaw%3D%3D" target="_blank" class="link-instagram"></a>

  </header>
</template>

<script>
export default {
  
  name: 'Header',

  props: {
    products: Array, 

  },

  data() {
    return {
      isMobile: false
    };
  },
  
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < 500;
    },
    goToHome() {
      this.$router.push({ path: '/' })
    },
    goToAbout() {
      this.$router.push({ path: '/about' })
    },
    goToBuilder() {
      this.$router.push({ path: '/bouquet_builder' })
    },
    onCategorySelected(category) {
      this.$emit('category-selected', category);
    },
    onPriceFilter(priceFilter) {
      this.$emit('price-filter', priceFilter);
    },
     onResetFilters() {
      this.$emit('reset-filters');
    },
  },

  created() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
}

</script>

<style scoped>

.header-client {
  background-color: black;
  display: flex; 
  align-items: center; 
  position: relative;
  padding: 6px;
}

.header-link {
  color: #d9bf16; 
  background: none; 
  border: none; 
  margin-right: 10px; 
  cursor: pointer; 
  font-size: 20px;
  padding: 30px;
}

.header-button:last-child {
    margin-right: 0; 
}

.header-button:focus {
    outline: none; 
}

.header-text {
  color: #d9bf16;
  font-size: 20px;
  margin-left: 2vw;
}

.logo {
  background-image: url('~@/assets/images/logo.png');
  width: 100px; 
  height: 100px; 
  min-width: 100px;  
  min-height: 100px;
  background-size: cover;
  background-position: center;
  margin-right: 30px;
  margin-left: 60px;
  border-radius: 50%; 
}

.link-instagram {
  display: block; 
  width: 70px; 
  height: 70px; 
  background-image: url('~@/assets/images/instagram.jpeg');
  background-size: cover; 
  background-position: center; 
  margin-left: 3vw;
  margin-top: -10px;
}

@media (max-width: 1100px) {
  .link-instagram {
    width: 60px; 
    height: 60px; 
  }

  .header-text {
    font-size: 16px;
    margin-left: 9vw;
  }

  .header-link {
    margin-right: 10px; 
    font-size: 16px;
    padding: 20px;
  }
}

@media (max-width: 1450px) {
  .header-text {
    font-size: 16px;
    margin-left: 2vw;
  }

  .header-link {
    font-size: 16px;
  }

  .logo {
    min-width: 80px;  
    min-height: 80px;
    height: 80px;
    width: 80px;
  }
}

@media (max-width: 1150px) {
  .header-text {
    font-size: 14px;
  }
  .header-link {
    font-size: 14px;
  }

  .logo {
    margin-right: 15px;
    margin-left: 30px;
  }
}

@media (max-width: 950px) {
  .link-instagram {
    width: 60px; 
    height: 60px; 
  }

  .header-text {
    font-size: 16px;
    margin-left: 4vw;
  }
}

@media (max-width: 850px) {
  .header-text {
    font-size: 14px;
    margin-left: 2vw;
  }
}

@media (max-width: 700px) {
  .header-link {
      padding: 10px;
  }
  .about_us {
    display: none;
  }
  .link-instagram {
    margin-left: 5vw;
    width: 60px; 
    height: 60px; 
  }
}

@media (max-width: 500px) {
  .menu-icon span {
    background-color: #d9bf16;
  }
  .header-client {
    padding: 10px;
  }
  .logo {
    margin-left: 3vw;
  }
  .link-instagram{
    display: none;
  }
  .header-text {
    display: none;
  }
  .header-link {
    margin-left: 10vw;
  }
}

@media (max-width: 400px) {
  .header-link {
    font-size: 16px;
  }
  .logo {
    width: 80px; 
    height: 80px; 
    min-width: 80px;  
    min-height: 80px;
  }

  .header-link {
    margin-left: 6vw;
  }
}

@media (max-width: 300px) {
  .header-link {
    font-size: 12px;
  }
  .logo {
    width: 60px; 
    height: 60px; 
    min-width: 60px;  
    min-height: 60px;
  }

  .header-link{
    padding: 1px;
  }
}
</style>