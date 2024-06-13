<template>
  <Header />
  <form class="order-form" @submit.prevent="createOrder">
    <div class="container">
      <div class="block">
        <div class="image-container" @click="triggerFileInput">
          <img :src="imageUrl" alt="Upload Image" class="main-upload-image"/>
          <div v-if="!imageLoaded" class="overlay-text">Загрузити фотографію</div>
        </div>
        <div class="preview-container">
          <img v-for="(img, index) in images" :src="img" :key="index" alt="Preview Image" class="preview-upload-image"/>
        </div>
        <input type="file" @change="builderImg" accept="image/*" style="display: none" ref="fileInput" multiple/>
      </div>
      <div class="block">
        <textarea class="styled-textarea" v-model="description" placeholder="Ваші побажання, коментарі..."></textarea>
        <textarea class="styled-textarea" v-model="compound" placeholder="Детальній склад..."></textarea>
        <label for="phone" class="input-label">Телефон</label>
        <input type="text" id="phone" class="styled-input" v-model="phone" placeholder="Ваш номер телефону...">
        <label for="social" class="input-label">Соціальні мережі</label>
        <input type="text" id="social" class="styled-input" v-model="social" placeholder="Лінк на ваш профіль...">
        <button class="send-button">Надіслати</button>
      </div>
      <div class="block">
        <div class="card-instruction">
          <h3 class="card-title">Інструкція</h3>
          <p class="card-description">Якщо на сайті ви не знайшли те щоб вас зацікавило ви можете самойстіно загрузити зображення, або написати подробний опис щоб ви хотіли від нас отримати<br><br>
          Оберіть одне абло декілька зображень але не більше 4, та загрузіть їх на місце кнопки "Загрузити фотографію", потім напишить особливості товару або ваші додаткові побажання у полі "Ваші побажання", нижче дуже бажано напишіть склад товару, посля цього залиште свій номер телефону або посилиння на меседжери або соц мережи для звя'зку(instargam, facebook, telegram, viber) та натисніть кнопку надіслати</p>
        </div>
      </div>
    </div>
   </form>
</template>

<script>
import Header from '@/components/Client/HeaderSimple.vue'; 

export default {

  components: {
    Header
  },

  data() {
    return {
      imageUrl: 'https://via.placeholder.com/350x150', 
      imageLoaded: false, 
      images: [],
      description: '',
      compound: '',
      phone: '',
      social: '',
    };
  },

  methods: {
    async createOrder() {
      const formData = new FormData();
      formData.append('description', this.description);
      formData.append('compound', this.compound);
      formData.append('phone', this.phone);
      formData.append('social', this.social);

      Array.from(this.$refs.fileInput.files).forEach((file, index) => {
        formData.append('images[]', file);
      });

      const response = await fetch(this.$apiUrl + 'admin/bouquetbuilder/create/', {
        method: 'POST',
        body: formData  
      });

      if (response.ok) {
        const data = await response.json();
        this.$router.push({ path: '/order/created' });
      } 
    },

    builderImg(event) {
      const files = Array.from(event.target.files);
      this.imageUrl = files.length > 0 ? URL.createObjectURL(files[0]) : this.imageUrl;
      this.images = files.slice(1, 4).map(file => URL.createObjectURL(file)); 
      this.imageLoaded = true;
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    }
  }
};

</script>

<style scoped>

.container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
}

.block {
  flex: 1 1 300px; 
  margin: 10px;
  padding: 20px;
}

.image-container {
  position: relative;
  width: 100%;
  height: auto; 
}

.main-upload-image {
  width: 100%;
  height: auto;
  max-height: 60vh; 
}

.preview-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px 0;
}

.preview-upload-image {
  width: 100%;
  height: auto;
  max-width: 150px; 
  object-fit: cover; 
}

.overlay-text {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 0;
}

.styled-textarea{
  width: 90%; 
  height: 150px; 
  margin-top: 10px;
  margin-bottom: 10px;  
  padding: 10px; 
  border: 2px solid #ccc; 
  border-radius: 10px; 
  font-size: 16px; 
  resize: none; 
}

.styled-input {
  width: 90%; 
  height: 30px; 
  margin-top: 10px;
  margin-bottom: 10px;  
  padding: 5px 10px; 
  border: 2px solid #ccc; 
  border-radius: 5px; 
  font-size: 14px; 
}

.input-label {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;  
  font-size: 16px; 
  color: #333; 
}

.send-button {
  display: block; 
  width: 50%; 
  padding: 15px; 
  margin: 20px 25%; 
  font-size: 18px; 
  color: white; 
  background-color: #4CAF50; 
  border: none; 
  border-radius: 10px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.send-button:hover {
  background-color: #45a049; 
}

.card-instruction {
  background-color: white; 
  border: 1px solid #ccc; 
  border-radius: 8px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  padding: 20px; 
}

.card-title {
  color: #333; 
  margin-bottom: 10px; 
}

.card-description {
  color: #666; 
  line-height: 1.5;
}
</style>
