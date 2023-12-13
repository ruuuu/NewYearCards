const API_URL = 'https://everlasting-dog-ceder.glitch.me';  // сервер выложили на glitch


const card = document.querySelector('.card');
const cardContacts = document.querySelector('.card__contacts');
const cardTitle = document.querySelector('.card__title');

const cardImage = document.querySelector('.card__image');
const cardFrom = document.querySelector('.card__from');
const cardTo = document.querySelector('.card__to');
const cardMessage = document.querySelector('.card__message');




const rearrangeElement = () => {

   const screenWidth = window.innerWidth; // ширина экрана + скролл вртиклаьный

   if(screenWidth <= 580 ){
      card.after(cardContacts);  //  элемент cardContacts размещаем после элемнта card
   }
   else{
      cardTitle.after(cardContacts); 
   }

};



const getIdFromUrl = ()=> {
   const params = new URLSearchParams(location.search);  // в урле http://127.0.0.1:5500/cart.html?id=eb2e520195 ищет search-параметры. Возвращает объект {id: eb2e520195}
   return params.get('id');
};



const getGiftData = async(id) => {  // async ставим, тк испльзуем внутри асинхрон fecth

   try{
      const response = await fetch(`${API_URL}/api/gift/${id}`);
      if(response.ok){
         return response.json();  // преобразовывает ответ в js-формат   {"sender_name":"Тимур", "sender_phone": "+7(786)454-68-44", "receiver_name": "Артур", "receiver_phone": "+7(675)544-58-68", "message": "тест", "card": "Card1" }
      }else{
         throw new Error('открытка не найдена')
      }
   }catch(error){
      console.error(error);
   }
   
}; 




const init = async() => {  //отсюда начинается
   rearrangeElement(); 

   window.addEventListener('resize', rearrangeElement);   // когда будем менять размеры окна барузера, то вызовется фукнция
   
   const id = getIdFromUrl();  // id открытки
   console.log('id ', id)

   if(id){
      const data = await getGiftData(id);  //  data = {"sender_name", "sender_phone", "receiver_name", "receiver_phone", "message", "card" }
      if(data){
         cardImage.src = `img/${data.card}.jpg`;
         cardFrom.textContent = data.sender_name; 
         cardTo.textContent = data.receiver_name;
        
         const formattesMessage = data.message.replaceAll('/n', "<br>");  
         cardMessage.innerHTML = formattesMessage;
      }
   }
  
}


init();