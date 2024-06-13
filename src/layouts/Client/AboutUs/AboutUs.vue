<template>
  <Header />
  <div class="about-us-container">
    <div class="about-section">
      <h1 class="about-title">Майстерня смачних подарунків <a href="https://sweetboughet.store">SweetBoughet</a></h1>
      <div class="about-content">
        <div class="mission">
          <h2>Наша Місія</h2>
          <p>
            Ми створюємо унікальні та особливі букети для ваших рідних та близьких з будь-якого приводу і без!
            Наша мета - дарувати емоції. Кожен букет, скомпонований нашими майстрами, несе в собі тепло рук, які його створили, та історію, яку він передає. Ми пишаємось тим, що кожен подарунок від "SweetBoughet" - це маленький витвір мистецтва, який приносить радість і враження.
          </p>
        </div>
        <div class="history">
          <h2>Наша Історія</h2>
          <p>
            Заснована в Україні, Майстерня "SweetBoughet" починала як маленька сімейна майстерня, де кожен подарунок був створений з любов'ю та особливою увагою до деталей. За ці роки ми перетворилися на повноцінний бізнес з доставкою щастя і радості на порозі наших клієнтів.
          </p>
        </div>
        <div class="team">
          <h2>Місце знаходження і доставка</h2>
          <p>
            Знаходимось в місті Новомосковськ Дніпропетровської області. Доставка подарунків в містах Дніпро, Новомосковськ прораховується окремо в залежності від адреси.
            Доставка по Україні здійснюється Новою поштою по тарифам перевізника.
          </p>
        </div>
      </div>
    </div>
    <div class="contact-section">
      <div class="contact-header">
        <h2>Контакти</h2>
        <a href="https://www.instagram.com/bond_buket_nmsk/?utm_source=qr&igsh=MWsxaW5wYWRoeWhkaw%3D%3D" target="_blank" class="link-instagram"></a>
        <a href="https://t.me/+380984895411" target="_blank" class="link-telegram"></a>
      </div>
      <p>
        Більше інформації можна отримати у менеджера за телефоном 0984895411<br>
        Замовлення приймаються на сайті або за номером телефону 0984895411
      </p>
    </div><br><br>
  </div>
</template>

<script>

import Header from '@/components/Client/HeaderSimple.vue'; 

export default {

  components: {
    Header
  },
};

</script>

<style scoped>
.about-us-container {
  padding: 35px;
}

.about-us-container {
  background-image: url(~@/assets/backgrounds/about_phone.webp);
  height: 80vh;
}

.about-section h1,
.contact-section h2 {
  color: #333; 
  margin-bottom: 1rem;
  font-size: 2.5rem; 
  font-weight: 300; 
}

.about-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 2rem; 
  margin-bottom: 2rem;
  opacity: 0.9;
}

.history, .mission, .team {
  background: #fff; 
  padding: 1.5rem;
  border: 1px solid #ddd; 
  border-radius: 8px; 
}

.contact-section {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 2rem;
  opacity: 0.9;
}

a {
  color: #c0392b; 
  text-decoration: none; 
}

a:hover {
  text-decoration: underline; 
}

p {
  font-size: 1rem; 
  line-height: 1.6; 
  color: #666; 
}

h2 {
  font-size: 2rem; 
  color: #333;
  margin-bottom: 0.5rem;
}

.about-title{
  text-align: center;
  margin-top: -10px;
}

.contact-header {
  display: flex;
  align-items: center; 
}

.link-instagram {
  display: block; 
  width: 40px; 
  height: 40px; 
  background-image: url('~@/assets/images/lite_instagram.png');
  background-size: cover; 
  background-position: center; 
  margin-left: 1vw;
  margin-top: 15px;
}

.link-telegram {
  display: block; 
  width: 40px; 
  height: 40px; 
  background-image: url('~@/assets/images/telegram.png');
  background-size: cover; 
  background-position: center; 
  margin-left: 1vw;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .about-section h1,
  .contact-section h2 {
    font-size: 2rem; 
  }

  .about-content {
    grid-template-columns: 1fr;
  }

  .history, .mission, .team, .contact-section {
    padding: 1rem; 
  }

  .about-us-container {
    background-image: none;
    height: 80vh;
  }

  .contact-section{
    margin-bottom: 20px;
  }

  .link-instagram {
    margin-left: 10px;
  }
}
</style>
