/** *******************\
  КРУГОВОЙ РЕГУЛЯТОР
\*********************/
(function () {
    // Пределы выставляемой  температуры
    const maxTemp = 35;
    const minTemp = 18;
  
    // Цвет в который красим активные черточки
    const color = '#F5A623';
  
    let rotation = 0;
    // в rotated мы как бы получили нашу текущую температуру с сервера
    let currentTemp = parseInt(
      document.querySelector('.circle-regulator__temperature').textContent
    );
    // Посчитаем поворота регулятора
    let rotated = (360 / (maxTemp - minTemp)) * (currentTemp - minTemp);
  
    const circle = document.getElementById('circle-regulator');
  
    let gray = false;
    while (rotation < 359) {
      // Выводим черточки и закрашиваем только те, которые находятся до нашей точки поворота
      circle.insertAdjacentHTML(
        'beforeEnd',
        `<div class="circle-regulator__dash" style="transform:rotate( ${rotation}deg);   ${
          rotation < rotated ? 'border-color:' + color : ''
        };"></div>`
      );
      // На первой серой черточке проставляем стрелку на предыдущую
      if (rotation > rotated && !gray) {
        gray = true;
        document.querySelector(
          '.circle-regulator__arrow'
        ).style.transform = `rotate(${rotation - 3}deg)`;
      }
      rotation += 3;
    }
  
    circle.addEventListener('click', function (event) {
      changeTemperature(event.x, event.y);
    });
  
    circle.addEventListener('touchmove', function (event) {
      const posX =
        event.changedTouches[event.changedTouches.length - 1].pageX -
        window.scrollX;
      const posY =
        event.changedTouches[event.changedTouches.length - 1].pageY -
        window.scrollY;
      changeTemperature(posX, posY);
    });
    circle.addEventListener('touchstart', function (event) {
      const posX =
        event.changedTouches[event.changedTouches.length - 1].pageX -
        window.scrollX;
      const posY =
        event.changedTouches[event.changedTouches.length - 1].pageY -
        window.scrollY;
      changeTemperature(posX, posY);
    });
  
    const changeTemperature = function (posX, posY) {
      const popupBody = document.querySelector('.popup');
  
      let a = circle.getBoundingClientRect().left;
      let b = circle.getBoundingClientRect().top;
      // Катеты нашего треугольника.
      // К mouseLeft я прибавил 0.1 для того, чтобы избежать возможного деления на ноль впоследствии.
      // Из координат клика вычитаем скролл страницы, отступ нашего цифарблата от верхней части окна и половину ширины циферблата
      var mouseLeft =
        posX - (circle.getBoundingClientRect().left + circle.clientWidth / 2);
      var mouseTop =
        posY -
        (circle.getBoundingClientRect().top + circle.clientHeight / 2) +
        0.1;
  
      // Вычисление угла (т.к. Math.atan() возвращает значение в радианах,
      // для более простого оперирования с ним переведем его в градусы).
      var rad2deg = 180 / Math.PI;
      var angle = Math.atan(Math.abs(mouseLeft) / Math.abs(mouseTop)) * rad2deg;
  
      var absoluteAngle = 0;
  
      if (mouseLeft > 0 && mouseTop < 0) {
        absoluteAngle = angle;
      } else if (mouseLeft > 0 && mouseTop > 0) {
        absoluteAngle = 90 + (90 - angle);
      } else if (mouseLeft < 0 && mouseTop > 0) {
        absoluteAngle = 180 + angle;
      } else if (mouseLeft < 0 && mouseTop < 0) {
        absoluteAngle = 270 + (90 - angle);
      }
  
      console.log(absoluteAngle);
  
      // console.log(document.getElementsByClassName("circle-regulator__dash"))
  
      // Получим все полоски
      var dashes = document.getElementsByClassName('circle-regulator__dash');
      var oneDashRad = 360 / dashes.length;
      // Полосок для изменения цвета
      var dashesToChanches = absoluteAngle / oneDashRad;
      // console.log(Math.round(dashesToChanches))
  
      dashesToChanches = Math.round(dashesToChanches);
  
      for (let i = 0; dashes.length > i; i++) {
        i < dashesToChanches
          ? (dashes[i].style.borderColor = color)
          : (dashes[i].style.borderColor = '#333333');
  
        // На последней итерации меняем угол наклона стрелки
        if (i === dashes.length - 1) {
          document.querySelector(
            '.circle-regulator__arrow'
          ).style.transform = `rotate(${absoluteAngle}deg)`;
          // Меняем цифру температуры
          let newTemp = absoluteAngle / (360 / (maxTemp - minTemp)) + minTemp;
          newTemp = Math.round(newTemp);
          document.querySelector('.circle-regulator__temperature').textContent =
            '+' + newTemp;
        }
      }
    };
  })();
