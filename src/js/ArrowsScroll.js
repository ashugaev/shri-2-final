// СКРОЛЛ

// Определение content is overflowing для стрелок
export function determineOverflow (content, container) {
  content = document.querySelector('.info-item-box__abs-appliances');
  container = document.querySelector('.appliances-box .info-item-box__rel');
  var containerMetrics = container.getBoundingClientRect();
  var containerMetricsRight = Math.floor(containerMetrics.right);
  var containerMetricsLeft = Math.floor(containerMetrics.left);
  var contentMetrics = content.getBoundingClientRect();
  var contentMetricsRight = Math.floor(contentMetrics.right);
  var contentMetricsLeft = Math.floor(contentMetrics.left);
  if (
    containerMetricsLeft > contentMetricsLeft &&
    containerMetricsRight < contentMetricsRight
  ) {
    document.querySelector('.appliances-box .arrow-right').style.opacity = 1;
    document.querySelector('.appliances-box .arrow-left').style.opacity = 1;
    return 'both';
  } else if (contentMetricsLeft < containerMetricsLeft) {
    document.querySelector('.appliances-box .arrow-right').style.opacity = 0.45;
    document.querySelector('.appliances-box .arrow-left').style.opacity = 1;
    return 'left';
  } else if (contentMetricsRight > containerMetricsRight) {
    document.querySelector('.appliances-box .arrow-right').style.opacity = 1;
    document.querySelector('.appliances-box .arrow-left').style.opacity = 0.45;
    return 'right';
  } else {
    document.querySelector('.appliances-box .arrow-right').style.opacity = 0.45;
    document.querySelector('.appliances-box .arrow-left').style.opacity = 0.45;
    return 'none';
  }
}

(function () {
  // Внешний контейнер слайдера
  let relBox = document.querySelector('.info-item-box__rel');
  // Внутренний контейнер с контентом
  let absBox = document.querySelector('.info-item-box__abs');

  // Ставим атрибут - индикатор скрола
  relBox.setAttribute('data-overflowing', determineOverflow(absBox, relBox));

  // Отслеживаем скролл и обновляем атрибут
  var last_known_scroll_position = 0;
  var ticking = false;

  function doSomething (scroll_pos) {
    relBox.setAttribute('data-overflowing', determineOverflow(absBox, relBox));
  }

  // Слушаем скролл и меняем атрибуты обозночающие скролл
  relBox.addEventListener('scroll', function () {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        doSomething(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });
})();

determineOverflow();
