/** ************************\
 ГОРИЗОНТАЛЬНЫЙ РЕГУЛЯТОР
\**************************/
let touchRegulator = function (stripeSelector, circleSelector) {
    let gradientStripe = document.querySelector(stripeSelector);
    let circle = document.querySelector(circleSelector);
  
    // На контрольных точках меняем артибут описывающий положение полоски
    window.addEventListener('resize', function (event) {
      onResise(event);
    });
    let onResise = function (event) {
      if (window.innerWidth <= 700) {
        gradientStripe.setAttribute('stripePosition', 'vertical');
        circle.style.left = '-5px';
      } else {
        gradientStripe.setAttribute('stripePosition', 'horizontal');
        circle.style.bottom = '-5px';
      }
  
      // Что бы не делать лишнее событие сюда же закинем сброс для слайдов
      if (window.innerWidth < favoritesScenariosHorizontal) {
        document.querySelector('.info-item-box__abs_favorites').style.top = 0;
        console.log('Сброс слайдера');
      }
    };
    onResise();
  
    /// ////////////////////////
  
    // Клик для пк
    gradientStripe.addEventListener('click', function (event) {
      let y = event.clientY;
      let x = event.clientX;
      changeCirclePosition(event, x, y);
    });
  
    // Отслеживаем тач
    gradientStripe.addEventListener('touchmove', function (event) {
      let y = event.targetTouches[0].clientY;
      let x = event.targetTouches[0].clientX;
      changeCirclePosition(event, x, y);
    });
    gradientStripe.addEventListener('touchstart', function (event) {
      let y = event.targetTouches[0].clientY;
      let x = event.targetTouches[0].clientX;
      changeCirclePosition(event, x, y);
    });
  
    let changeCirclePosition = function (event, firstTouchX, firstTouch) {
      let stripePosition = gradientStripe.getAttribute('stripeposition');
      console.log('атрибут', stripePosition);
      // Позиция круга на экране
      let circleCurrentTop = circle.getBoundingClientRect().top;
      let circleCurrentLeft = circle.getBoundingClientRect().left;
  
      if (stripePosition === 'horizontal') {
        let diff = circleCurrentLeft - firstTouchX;
        let left = parseInt(circle.offsetLeft - 70 + 35) - diff;
        if (left < 0) {
          left = 0;
        } else if (left > gradientStripe.clientWidth - 70) {
          left = gradientStripe.clientWidth - 70;
        }
        circle.style.left = left + 'px';
        console.log('asdf', diff, left, circle.offsetLeft);
      } else if (stripePosition === 'vertical') {
        let diff = circleCurrentTop - firstTouch;
        let bottom =
          parseInt(gradientStripe.clientHeight - circle.offsetTop - 70 + 35) +
          diff;
        if (bottom < 0) {
          bottom = 0;
        } else if (bottom > gradientStripe.clientHeight - 70) {
          bottom = gradientStripe.clientHeight - 70;
        }
        circle.style.bottom = bottom + 'px';
      }
    };
  };
  
  // Инициализируем оба регулятора
  touchRegulator(
    '.stripe-regulator__gradient-stripe.stripe-regulator__gradient-stripe_yellow',
    '#circle-orange'
  );
  touchRegulator(
    '.stripe-regulator__gradient-stripe.stripe-regulator__gradient-stripe_three-color',
    '.stripe-regulator__gradient-stripe.stripe-regulator__gradient-stripe_three-color   .stripe-regulator__outer-circle'
  );
