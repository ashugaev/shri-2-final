import { disableScrolling, enableScrolling } from './ScrollDisable';

(function () {
  // Сделим время зажатия кнопки, что бы не вылетали попапы при перетягивании мышью
  let timeStamp = 0;
  document.querySelector('body').addEventListener('mousedown', function (event) {
    timeStamp = event.timeStamp;
  });
  document.querySelector('body').addEventListener('mouseup', function (event) {
    if (
      event.target.classList.contains('popup-bg') ||
        event.target.classList.contains('popup__close') ||
        event.target.classList.contains('popup__apply')
    ) {
      // Закрытие popup
      closePopup(event.target.closest('.info-item'));
    }
  });

  // Вешаем событие на info-item
  document.querySelectorAll('.info-item').forEach(el => {
    el.addEventListener('click', function (event) {
      if (event.timeStamp - timeStamp < 200 && event.button === 0) {
        openPopup(el);
      }
    });
  });

  // Переменные, которые будут нужны для закрытия Popup
  let targetPageTop,
    targetPageLeft,
    targetHeight,
    targetWidth,
    itemSelector,
    popupModificator;

    // Popup Open/Close
  let openPopup = function (elem) {
    // Включаем нужный контент попапа
    if (elem.classList.contains('info-item_stripe-yellow')) {
      document.querySelector('.popup').classList.add('popup_stripe-yellow');
      popupModificator = 'popup_stripe-yellow';
    } else if (elem.classList.contains('info-item_stripe-three-col')) {
      document.querySelector('.popup').classList.add('popup_stripe-three-col');
      popupModificator = 'popup_stripe-three-col';
    } else if (elem.classList.contains('info-item_circle-regulator')) {
      document.querySelector('.popup').classList.add('popup_circle-regulator');
      popupModificator = 'popup_circle-regulator';
    } else {
      return;
    }

    itemSelector = elem;

    // document.body.style.overflow = 'hidden';
    disableScrolling();
    document.querySelector('.popup').style.display = 'flex';
    targetPageTop = elem.getBoundingClientRect().top + window.pageYOffset;
    targetPageLeft = elem.getBoundingClientRect().left + window.pageXOffset;
    targetWidth = elem.clientWidth;
    targetHeight = elem.clientHeight;

    const popUpBody = document.querySelector('.popup__body');
    const popupBodyTop =
        popUpBody.getBoundingClientRect().top + window.pageYOffset;
    const popupBodyHeight = popUpBody.clientHeight;
    const popupBodyWidth = popUpBody.clientWidth;

    // В разных браузерах по разному себя ведет left в position fixed
    const crossBrowserCorrection = document
      .querySelector('.zero-element')
      .getBoundingClientRect().left;

      // Оставляя элемент на той же позиции сделаем его фиксированным
    elem.style.top = targetPageTop + 'px';
    // 20 это паддинг у body
    elem.style.left = targetPageLeft - crossBrowserCorrection + 'px';
    elem.style.position = 'fixed';

    // Меняю позиционирование и размеры элемента на значения попапа 100мс(что бы не было скачков)
    setTimeout(function () {
      elem.classList.add('info-item_open');
      elem.style.top = popupBodyTop + 'px';
      elem.style.height = popupBodyHeight + 'px';
      elem.style.width = popupBodyWidth + 'px';
    }, 50);

    setTimeout(function () {
      document.querySelector('.popup').style.opacity = 1;

      // Включаем бэкграунт и блюр
      let popBgStyle = document.querySelector('.popup-bg').style;
      popBgStyle.display = 'block';
      setTimeout(function () {
        popBgStyle.opacity = 1;
        // Отключаем скролл
        disableScrolling();
      }, 50);
      setTimeout(function () {
        document.querySelector('.blur-box').style.filter = 'blur(2px)';
      }, 300);
    }, 500);
  };

  let closePopup = function () {
    let popup = document.querySelector('.popup');
    popup.style.opacity = 0;
    document.querySelector('.blur-box').style.filter = 'blur(0)';
    let popBgStyle = document.querySelector('.popup-bg').style;
    popBgStyle.opacity = 0;

    // В разных браузерах по разному себя ведет left в position fixed
    const crossBrowserCorrection = document
      .querySelector('.zero-element')
      .getBoundingClientRect().left;

    setTimeout(function () {
      itemSelector.classList.remove('info-item_open');
      itemSelector.style.top = targetPageTop + 'px';
      itemSelector.style.left = targetPageLeft - crossBrowserCorrection + 'px';
      itemSelector.style.height = targetHeight + 'px';
      itemSelector.style.width = targetWidth + 'px';

      setTimeout(function () {
        itemSelector.style.position = 'unset';
        itemSelector.style.display = 'flex';
        // document.body.style.overflow = 'unset';
        enableScrolling();
        popBgStyle.display = 'none';
        popup.style.display = 'none';
        // Если часто открыть-закрыть окно, то блюр может не убраться, поэтому повторно убираем
        document.querySelector('.blur-box').style.filter = 'blur(0)';
        // Удалим контент попапа
        document.querySelector('.popup').classList.remove(popupModificator);
      }, 600);
    }, 200);
  };
})();
