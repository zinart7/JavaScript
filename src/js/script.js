//сначала ждём, пока прогрузится вес DOM страницы
window.addEventListener('DOMContentLoaded', () =>{

    const loadContent = async (url, callback) =>{
        await fetch(url)  //Promise
            .then(response => response.json())
            .then(json => createNewElement(json.goods));
    
        callback();
    }
    
    function createNewElement(arr){
        const goodsWrapper = document.querySelector('.goods__wrapper');
        arr.forEach(function(item){
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title}
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }
    
    loadContent('js/db.json', () =>{
        const cartWrapper = document.querySelector('.cart__wrapper'),
            cart = document.querySelector('.cart'),
            close = document.querySelector('.cart__close'),
            open = document.querySelector('#cart'),
            goodsBtn = document.querySelectorAll('.goods__btn'),
            products = document.querySelectorAll('.goods__item'),
            confirm = document.querySelector('.confirm'),
            badge = document.querySelector('.nav__badge'),
            totalCost = document.querySelector('.cart__total > span'),
            titles = document.querySelectorAll('.goods__title');
    
        function openCart(){
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    
        function closeCart(){
            cart.style.display = 'none';
            document.body.style.overflow = '';
        }
    
        open.addEventListener('click', openCart);     // добавяем обработчик событий
        close.addEventListener('click', closeCart);
    
        //Добавляем товар в корзину
        goodsBtn.forEach(function(btn,i){
            btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true),
                    trigger = item.querySelector('button'),
                    removeBtn = document.createElement('div'),  //заготовка под крестик у товара в корз
                    empty = cartWrapper.querySelector('.empty');
    
                trigger.remove(); // удаляем кнопку с карточки товара
    
                showConfirm();
                calcGoods(1);
    
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times'; // добавляем крестик на круглешок сверху
                item.appendChild(removeBtn);
    
                cartWrapper.appendChild(item);
                calcTotal();
                removeFromCart();
                
                if(empty){
                    empty.remove();
                }
            });
        });
    
        function sliceTitle(){
            titles.forEach(function(item){
                if(item.textContent.length < 70) {
                    return;
                }
                else {
                    const str = item.textContent.slice(0,70) + '...';
                    //const str = `${item.textContent.slice(0,70)}...`; //ES6
                    item.textContent = str;
                }
            });
        }
        sliceTitle();
    
        function showConfirm(){
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame,10); // запускаем каждые 10 мс
            function frame(){
                if( counter == 10){
                    clearInterval(id);  // останавливаем анимацию
                    confirm.style.display = 'none';
                }
                else {
                    counter--;
                    confirm.style.transform = `translateY(-${100-counter}px)`; //едем по Y
                    confirm.style.opacity = '.' + counter;      // прозрачность
                }
            }
        }
    
        function calcGoods(i){
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent = items.length+i;
            // 2 домашка
            if(badge.textContent=='0'){
                const newEmpty = document.createElement('div');
                newEmpty.className = 'empty';
                newEmpty.innerHTML = 'Ваша корзина пока пуста';
                cartWrapper.appendChild(newEmpty);
            }
        }
    
        function calcTotal(){
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function(item){
                total += +item.textContent; //+ перед item преобразует строку в число
            });
            totalCost.textContent = total;
        }
    
        function removeFromCart(){
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            removeBtn.forEach(function(btn){
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    calcGoods(0);
                    calcTotal();
                });
            });
        }
    });
    
    // setInteraval(sliceTitle,100) запуск каждые 100 мсек
    // setTimeout(sliceTitle,100) запуск через 100 мсек
});


//JSONPlaceholder  Rest-api 

/*
отдаёт обещание, либо выполнится, либо не выполнится(promises). Достаём данные с сервера
fetch('https:...')
    .then(response => response.json()) //  response - ответ сервера, .json() превращает json в js объект
    .then(json => console.log(json)) // уже выводим в консоль объект js
*/