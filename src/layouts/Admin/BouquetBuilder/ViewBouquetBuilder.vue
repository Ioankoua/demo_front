<template>
  <Header />
  <div class="container">
    <div class="images-block">
      <div class="additional-images">
        <a v-for="(url, index) in images_urls" :key="index" :href="url" download>
          <img class="additional-img" :src="url">
        </a>
      </div>
    </div>
    <div class="text-block">
      <div class="card">
        <h2>Описание</h2>
        <p>{{ description }}</p>
      </div>
      <div class="card">
        <h2>Состав</h2>
        <p>{{ compound }}</p>
      </div>
      <div class="card">
        <h2>Телефон</h2>
        <p>{{ phone }}</p>
      </div>
      <div class="card">
        <h2>Соцсети</h2>
        <p>{{ social }}</p>
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
      description: '',
      compound: '',
      phone: '',
      social: '',
      imageBaseUrl: this.$imgPath,
      images_urls: [],
    };
  },

  methods: {
    async getData() {
      const bouquet_id = this.$route.params.bouquet_id;
      const response = await fetch(this.$apiUrl + `admin/bouquetbuilder/getdata/${bouquet_id}`);
      if (response.ok) {
        const bouquet = await response.json();
        this.setProductData(bouquet);
      }
    },

    setProductData(bouquet) {
      this.description = bouquet.description;
      this.compound = bouquet.compound;
      this.phone = bouquet.phone;
      this.social = bouquet.social;
      this.images_urls = bouquet.images.map(img => this.imageBaseUrl + img.image_path);
    },
  },

  mounted() {
    this.getData();
  },
}

</script>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.images-block {
  flex: 1;
  padding: 10px;
}

.text-block {
  flex: 1;
  padding: 10px;
}

.card {
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card h2 {
  color: #333;
}

.card p {
  color: #666;
}

.additional-images {
  display: flex;
  flex-wrap: wrap;
}

.additional-img {
  width: 250px; 
  height: auto;
  margin: 5px;
  border: 2px solid #ddd; 
}

</style>
