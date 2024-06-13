<template>
  <Header />
  <div class="form-edit-container">
    <form @submit.prevent="submit" class="order-form">
      <div>
        <label class="label-order">Редактировать Заказ</label>
        <div>
          <label class="label-edit-form">Имя</label>
          <input class="input-form-edit" type="text" v-model="name" required />
        </div>
        <div>
          <label class="label-edit-form">Фамилия</label>
          <input class="input-form-edit" type="text" v-model="lastname" required />
        </div>
        <div>
          <label class="label-edit-form">Телефон</label>
          <input class="input-form-edit" type="text" v-model="phone" required />
        </div>
        <div>
          <label class="label-edit-form">Коментарий</label>
          <textarea class="textarea-form-edit" v-model="comment"></textarea>
        </div>
      </div>
      <button class="btn-creat-order" @click="editOrder">Редактировать</button>
    </form>
  </div>
</template>

<script>

import Header from '@/components/Admin/HeaderAdmin.vue'; 

export default {

  components: {
    Header
  },

  data() {
    return {
      name: '',
      lastname: '',
      phone: '',
      comment: '',
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      const order_id = this.$route.params.order_id;
      const response = await fetch(this.$apiUrl + `admin/order/getdata/${order_id}`);

      if (response.ok) {
        const order = await response.json(); 
        this.name = order.name;
        this.lastname = order.lastname;
        this.phone = order.phone;
        this.comment = order.comments;
      } 
    },

    async editOrder() {
      const order_id = this.$route.params.order_id;
      const formData = new FormData();
      
      formData.append('name', this.name);
      formData.append('lastname', this.lastname);
      formData.append('phone', this.phone);
      formData.append('comments', this.comment);

      const response = await fetch(this.$apiUrl + `admin/order/update/${order_id}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.status === 200) {
        this.$router.push({ path: '/admin/order/' });
      }
    },
  },
};

</script>

<style scoped>

.order-form {
  width: 40%; 
  margin: auto; 
  background-color: #ede7b4;
  margin-top: 15vh;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px #ccc;
}

.label-order {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
  margin-left: 15vw;
}

.btn-creat-order {
  box-sizing: border-box; 
  width: calc(100% - 20px); 
  margin-right: 10px;
  padding: 10px;
  margin-top: 4px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #A58F7F;
  color: white;
  cursor: pointer;
  border: none;
}

.label-edit-form {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
}

.input-form-edit[type="text"],
.input-form-edit[type="number"],
.textarea-form-edit,
.input-form-edit[type="file"],
.btn-edit-product {
  box-sizing: border-box; 
  width: calc(100% - 20px); 
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  margin-top: 4px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-creat-order:hover {
  background-color: #8B7355;
}

.form-edit-container {
  background-image: url('@/assets/backgrounds/phone.webp');
  background-size: cover;
  background-position: center;
  min-height: 85.8vh;
  padding: 30px 0;
}

@media (max-width: 500px) {
  .form-create-container{
    background-image: none;
  }

  .category-form{
    width: 100%;
    margin-top: 0px;
    margin-left: 30px;
  }
}
</style>