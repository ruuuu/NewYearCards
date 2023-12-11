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


const form = document.querySelector('.form');
const phoneInputs = form.querySelectorAll('.form__field--phone');

for(let i = 0; i < phoneInputs.length; i++){
   
   const element = phoneInputs[i];

   IMask(element, {  // навшиваем маску на поле element
      mask: '+{7}(000)000-00-00'
   });
}



const submtButton = form.querySelectorAll('.form__button');

const updateSubmitButton = () => {
   let isFormFilled = true;

   for(const field of form.elements){  // пробегаемся по элементам формы, form.elements-массив
      
      if(field.classList.contains('form__field')){
         if(!field.value.trim()){          // если поле не заполнено, trim() убирает пробелы
            isFormFilled = false;
            break;
         }  
      }
   }

   submtButton.disabled = !isFormFilled;  // дизейблим кнопку
};




const phoneValidateOption = { 

   presence: {  // если поле не заполнили
      message: 'Поле телефон обязательно для заполнения'
   },
   format: {  // формат номера телефона 
      pattern: "\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}",
      message: 'Поле телефон имеет неверный формат'
   }
}



form.addEventListener('input', updateSubmitButton);  // при каждом вводе симвла сработает событие

form.addEventListener('submit', (evt) => {
   evt.preventDefault();

   const errors = validate(form, {   // используем для валидации библиотеку https://validatejs.org/
      sender_phone: phoneValidateOption,
      receiver_phone: phoneValidateOption
   });

   console.log(errors) // { sender_phone: Array(1), receiver_phone: Array(1) }

   if(errors){
      for(const key in errors){  
         const errorString = errors[key];
         alert(errorString)
      }  

      return; // выход из фукнции
   }


   const formData = new FormData(form); // {}
   const data = Object.fromEntries(formData);  // из объекта вытаскиваем данные
   console.log('data ', data)  // объект, полями котрого являются name у полей { sender_name: 'Руфины',  sender_phone: '+7(786)454-68-46',  receiver_name: 'Регине',  receiver_phone: '+7(897)654-32-45',  message: 'тествоое позравление' }

});