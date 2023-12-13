const API_URL = 'https://everlasting-dog-ceder.glitch.me';  // сервер выложили на glitch



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
const cardInput = form.querySelector('.form__card');  // скрытое поле
const submtButton = form.querySelectorAll('.form__button');


const updateCardInput = () => {

   const activeSlide = document.querySelector('.gift__swiper--card .swiper-slide-active');
   const cardData = activeSlide.querySelector('.gift__card-image').dataset.card;  //получаем  значение дата атрибута data-card
   cardInput.value = cardData;
   console.log('cardData ', cardData)
}


updateCardInput();
swiperMain.on('slideChangeTransitionEnd', updateCardInput); // на большой слайер навешиваем событие slideChangeTransitionEnd: когда слайд поменяется, тогда запутсится функция https://swiperjs.com/swiper-api#events


for(let i = 0; i < phoneInputs.length; i++){
   
   const element = phoneInputs[i];

   IMask(element, {  // навшиваем маску на поле element
      mask: '+{7}(000)000-00-00'
   });
}



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

form.addEventListener('submit', async(evt) => {
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


   try{
      const response = await fetch(`${API_URL}/api/gift`, {
         method: 'POST', 
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)  // тело запроса, JSON.stringify приводит в вформат json
      });

      const result = await response.json();  // преобразовывает ответ в js-формат  {id: , message: }
      console.log('response, ', response)
      
      if(response.ok){                                               // адрес сервера
         prompt('Открытка успешно сохранена. Доступна по адресу: ', `${location.origin}/cart.html?id=${result.id}`);
         form.reset();  // очищаем форму  
      }else{
         alert(`Ошибка при отправке: ${result.message}`);
      }

   }catch(error){  // если ошибка будет запросе
      console.error(`произошла ошибка при отправке запроса ${error}`);
      alert('произошла ошибка, попробуйте снова');
   }
   


   

});