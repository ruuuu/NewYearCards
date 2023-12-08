const swiperThumb = new Swiper('.gift__swiper--thumb', {  // нижиний слайдер
  spaceBetween: 16,  //расстяние между слайдами
  slidesPerView: 6,  // число слайдев котые отображаются на  странице
  freeMode: true,
  watchSlidesProgress: true,  // будет ил добавляться класс 'swiper-slide-thumb-active' у слайда если он сейчас активный
});



const swiperMain = new Swiper('.gift__swiper--card', {  // верхний слайдер
   spaceBetween: 16, 
   thumbs: {
      swiper: swiperThumb  // этот сладйер связан с маленьким
   }
});