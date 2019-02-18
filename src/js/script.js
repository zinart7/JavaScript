//сначала ждём, пока прогрузится вес DOM страницы
window.addEventListener('DOMContentLoaded', () =>{

    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart_total > span'),
        titles = document.querySelectorAll('.goods__title');

    function openCart(){
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart(){
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);     // добавяем обработчик сбытия
    close.addEventListener('click', closeCart);

    //Добавляем товар в корзину
    goodsBtn.forEach(function(btn,i){
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),  //заготовка под крестик у товара в корз
                empty = cartWrapper.querySelector('.empty');

            trigger.remove(); // удаляем кнопку с карточки товара

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times'; // добавляем крестик на круглешок сверху
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            if(empty){
                empty.remove();
            }
        });
    });
})

