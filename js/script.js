const swiperThumb = new Swiper('.gift__swiper--thumb', {  // нижиний слайдер
  spaceBetween: 12,  // расстяние между слайдами
  slidesPerView: "auto",  // число слайдев котые отображаются на  странице
  freeMode: true,
  watchSlidesProgress: true,  // будет ил добавляться класс 'swiper-slide-thumb-active' у слайда если он сейчас активный
  breakpoints: {  // адаптив:
      320: {
         // slidesPerView: 5,
         spaceBetween: 12,
      },
      1141: {
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



const phoneInputs = document.querySelectorAll('.form__field--phone');

for(let i = 0; i < phoneInputs.length; i++){
   
   const element = phoneInputs[i];

   IMask(element, {
      mask: '+{7}(000)000-00-00'
   });
}


const form = document.querySelectorAll('.form');
const submtButton = form.querySelectorAll('.form__button');

const updateSubmitButton = () => {

   
};


form.addEventListener('input', updateSubmitButton);  // при каждом ввовде  симвла сработает событие

form.addEventListener('submit', (evt) => {
   evt.preventDefault();

});