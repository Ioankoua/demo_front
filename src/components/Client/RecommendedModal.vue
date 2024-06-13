<template>
  <div class="modal" id="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">Кому шукаете подарунок?</h2>
      <div class="options">
        <div class="option">
          <button class="option-button for-her-button" @click="sortProducts(1)">
            <div class="icon for-her-icon"></div>
            <p class="option-text">Дівчині</p>
          </button>
        </div>
        <div class="option">
          <button class="option-button for-him-button" @click="sortProducts(2)">
            <div class="icon for-him-icon"></div>
            <p class="option-text">Чоловіку</p>
          </button>
        </div>
        <div class="option">
          <button class="option-button for-kids-button" @click="sortProducts(3)">
            <div class="icon for-kids-icon"></div>
            <p class="option-text">Дитині</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  methods: {
    closeModal() {
      const modal = document.getElementById('modal');
      modal.style.display = 'none';
    },

    sortProducts(forType) {
      const modal = document.getElementById('modal');
      modal.style.display = 'none';
      this.$emit('for-type', forType);
    }
  }
}

</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 25%;
  border-radius: 10px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-title {
  color: #333;
  font-family: Arial, sans-serif;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.option-button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

.icon {
  display: block;
  margin: auto;
  height: 60px;
  width: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 5px;
}

.for-her-icon {
  background-image: url('~@/assets/images/for_her.webp');
}

.for-him-icon {
  background-image: url('~@/assets/images/for_him.jpeg');
}

.for-kids-icon {
  background-image: url('~@/assets/images/for_kid.jpeg');
}

.option-text {
  font-family: Arial, sans-serif;
  color: #555;
}

@media (max-width: 1000px) {
  .modal-content {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .modal-content {
    width: 65%; 
  }

  .modal-title {
    font-size: 16px;
  }
  
  .close {
    font-size: 24px; 
  }

  .icon {
    height: 50px;
    width: 50px;
  }
}

@media (max-width: 360px) {
  .modal-content {
    width: 75%; 
  }
}
</style>
