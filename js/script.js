const swiperThumb = new Swiper('.gift__swiper--thumb', {  // нижиний слайдер
  spaceBetween: 12,  // расстяние между слайдами
  slidesPerView: 5,  // число слайдев котые отображаются на  странице
  freeMode: true,
  watchSlidesProgress: true,  // будет ил добавляться класс 'swiper-slide-thumb-active' у слайда если он сейчас активный
  breakpoints: {  // адаптив:
      320: {
         slidesPerView: 5,
         spaceBetween: 12,
      },
      1141: {
         slidesPerView: 6,
         spaceBetween: 16,
      },

  }
});



const swiperMain = new Swiper('.gift__swiper--card', {  // верхний слайдер
   spaceBetween: 16, 
   thumbs: {
      swiper: swiperThumb  // этот сладйер связан с маленьким
   }
});