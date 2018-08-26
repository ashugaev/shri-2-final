

/** **********************************************\
  СВАЙП НА ИЗБРАННЫХ СЦЕНАРИЯХ НА БОЛЬШОМ ЭКРАНЕ
\************************************************/
function swipeGesture () {
    var relCont = document.querySelector('.appliances-box__slider_favorites');
    var absCont = document.querySelector('.info-item-box__abs_favorites');
    var touchstartX = 0;
    var touchendX = 0;
    var scrollStart = 0;
    var scrollEnd = 0;
    console.log('sdf');
  
    var scrollArea = document.querySelector('.appliances-box__slider_favorites');
  
    scrollArea.addEventListener(
      'touchstart',
      function (event) {
        touchstartX = event.changedTouches[0].screenX;
        scrollStart = window.pageYOffset;
      },
      false
    );
    scrollArea.addEventListener(
      'touchend',
      function (event) {
        touchendX = event.changedTouches[0].screenX;
        scrollEnd = window.pageYOffset;
        // Отменяем свайп, если был скролл или маленький экран
        if (
          scrollStart != scrollEnd ||
          window.innerWidth < favoritesScenariosHorizontal
        ) { return; }
  
        handleGesure();
      },
      false
    );
  
    function handleGesure () {
      if (touchendX < touchstartX) {
        slidePrev(relCont, absCont);
      }
      if (touchendX > touchstartX) {
        slideNext(relCont, absCont);
      }
    }
  }
  
  swipeGesture();

  