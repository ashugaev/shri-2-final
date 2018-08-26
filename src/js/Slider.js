
/** ***************************************\
  ФУНКЦИИ ДЛЯ СЛАЙДА ИЗБРАННЫХ СЦЕНАРИЕВ
\*****************************************/

let slideNext = function (relCont, absCont) {
    let absBlockTop = absCont.style.top;
    let step = relCont.clientHeight;
    // Пространство снизу
    let maxStep = absCont.clientHeight + absCont.offsetTop - relCont.clientHeight;
  
    if (!absBlockTop) absBlockTop = 0;
    if (step / 4 > maxStep) {
      return;
    }
  
    absCont.style.opacity = 0;
    setTimeout(function () {
      absCont.style.top = parseInt(absBlockTop) - step + 'px';
      absCont.style.opacity = 1;
      checkSliderArrows();
    }, 300);
  };
  
  let slidePrev = function (relCont, absCont) {
    console.log('prev');
    let absBlockTop = absCont.style.top;
    let step = relCont.clientHeight;
    // Пространство снизу
    let maxStep =
      absCont.clientHeight -
      relCont.clientHeight -
      (absCont.clientHeight - Math.abs(absCont.offsetTop) - relCont.clientHeight);
  
    if (!absBlockTop) absBlockTop = 0;
    if (step / 4 > maxStep) return;
    absCont.style.opacity = 0;
    setTimeout(function () {
      console.log(parseInt(absBlockTop) + step + 'px');
      absCont.style.top = parseInt(absBlockTop) + step + 'px';
      absCont.style.opacity = 1;
      checkSliderArrows();
    }, 300);
  };
  
  let checkSliderArrows = function () {
    let absCont = document.querySelector(
      '.scenarios-box .info-item-box__rel > .info-item-box__abs'
    );
    let relCont = document.querySelector('.scenarios-box .info-item-box__rel');
    let step = relCont.clientHeight;
    // Пространство снизу
    let maxStepBottom =
      absCont.clientHeight + absCont.offsetTop - relCont.clientHeight;
    // Пространство сверху
    let maxStepTop =
      absCont.clientHeight -
      relCont.clientHeight -
      (absCont.clientHeight - Math.abs(absCont.offsetTop) - relCont.clientHeight);
  
    if (step / 4 > maxStepTop) {
      document.querySelector('.scenarios-box .arrow-left').style.opacity = 0.45;
      document.querySelector('.scenarios-box .arrow-right').style.opacity = 1;
    } else if (step / 4 > maxStepBottom) {
      document.querySelector('.scenarios-box .arrow-left').style.opacity = 1;
      document.querySelector('.scenarios-box .arrow-right').style.opacity = 0.45;
    }
  };
  checkSliderArrows();
