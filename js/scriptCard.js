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




const init = () => {
   rearrangeElement(); 

   window.addEventListener('resize',   rearrangeElement);   // когда будем менять размеры окна барузера, то вызовется фукнция
  
}


init();