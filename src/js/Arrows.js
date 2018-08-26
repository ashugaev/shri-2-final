/** ********************\
  Функция для стрелок
\**********************/
export default function() {
  // Входные параменты это контейнер со стрелками и бокс, которым управляюи стрелки
  let arrowScroll = function(arrows, relCont) {
    let arrowLeft = document.querySelector(arrows + " .arrow-left");
    let arrowRight = document.querySelector(arrows + " .arrow-right");
    let absCont = document.querySelector(
      relCont + " > .info-item-box__abs-appliances"
    );
    relCont = document.querySelector(relCont);

    // Настройки
    var SETTINGS = {
      inScrollingNow: false,
      scrollDirection: "",
      scrollDistance: 220
    };

    // ЛЕВАЯ СТРЕЛКА
    arrowLeft.addEventListener("click", function(event) {
      absCont = document.querySelector(".info-item-box__abs-appliances");
      relCont = document.querySelector(".appliances-box .info-item-box__rel");
      console.log("Что то есть");

      // Если стрелка нажата во время скролла
      if (SETTINGS.inScrollingNow === true) {
        return;
      }
      // Если контент выходит в обе стороты или влево
      if (
        determineOverflow(absCont, relCont) === "left" ||
        determineOverflow(absCont, relCont) === "both"
      ) {
        var availableScrollLeft = relCont.scrollLeft;
        // В первом случае крутим до конца, в втором на заданный промежуток
        if (availableScrollLeft < SETTINGS.scrollDistance * 2) {
          absCont.style.transform = "translateX(" + availableScrollLeft + "px)";
        } else {
          absCont.style.transform =
            "translateX(" + SETTINGS.scrollDistance + "px)";
        }

        // Удаляем класс отключающий транзишн
        absCont.classList.remove("no-transition");

        SETTINGS.scrollDirection = "left";
        SETTINGS.inScrollingNow = true;
      }
      // Обновляем атрибут контейнера
      relCont.setAttribute(
        "data-overflowing",
        determineOverflow(absCont, relCont)
      );
    });

    // ПРАВАЯ СТРЕЛКА
    arrowRight.addEventListener("click", function() {
      absCont = document.querySelector(".info-item-box__abs-appliances");
      relCont = document.querySelector(".appliances-box .info-item-box__rel");

      // Если стрелка нажата во время скролла
      if (SETTINGS.inScrollingNow === true) {
        return;
      }

      // Если контент выходит в обе стороты или вправо
      if (
        determineOverflow(absCont, relCont) === "right" ||
        determineOverflow(absCont, relCont) === "both"
      ) {
        // Вычисляем доступной для скролла пространство
        var relContRightEdge = absCont.getBoundingClientRect().right;
        var absContRightEdge = relCont.getBoundingClientRect().right;
        var availableScrollRight = Math.floor(
          relContRightEdge - absContRightEdge
        );
        // В первом случае крутим до конца, в втором на заданный промежуток
        if (availableScrollRight < SETTINGS.scrollDistance * 2) {
          absCont.style.transform =
            "translateX(-" + availableScrollRight + "px)";
        } else {
          absCont.style.transform =
            "translateX(-" + SETTINGS.scrollDistance + "px)";
        }

        // Удаляем класс отключающий транзишн
        absCont.classList.remove("no-transition");

        SETTINGS.scrollDirection = "right";
        SETTINGS.inScrollingNow = true;
      }
      // Обновляем атрибут контейнера
      relCont.setAttribute(
        "data-overflowing",
        determineOverflow(absCont, relCont)
      );
    });

    // ОТСЛЕЖИВАНИЕ ЗАВЕРШЕНИЯ ДВИЖЕНИЯ СЛАЙДЕРА
    absCont.addEventListener("transitionend", function() {
      // получаем значение транзишена и заменяем его на скролл
      var styleOfTransform = window.getComputedStyle(absCont, null);
      var tr =
        styleOfTransform.getPropertyValue("-webkit-transform") ||
        styleOfTransform.getPropertyValue("transform");
      // Если транзишена нет, то ставим 0
      var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
      absCont.style.transform = "none";
      absCont.classList.add("no-transition");

      if (SETTINGS.scrollDirection === "left") {
        relCont.scrollLeft = relCont.scrollLeft - amount;
      } else {
        relCont.scrollLeft = relCont.scrollLeft + amount;
      }
      SETTINGS.inScrollingNow = false;
    });
  };
  arrowScroll(
    ".appliances-box .arrows_favorites",
    ".appliances-box .appliances-box__slider",
    false
  );

  /// ///////////////

  let arrowSlider = function() {
    console.log("Поехали");
    let arrowLeft = document.querySelector(
      ".scenarios-box .arrows .arrow-left"
    );
    let arrowRight = document.querySelector(
      ".scenarios-box .arrows .arrow-right"
    );
    absCont = document.querySelector(
      ".scenarios-box .info-item-box__rel > .info-item-box__abs"
    );
    relCont = document.querySelector(".scenarios-box .info-item-box__rel");

    var SETTINGS = {
      inScrollingNow: false,
      scrollDirection: "",
      scrollDistance: 220
    };

    // ЛЕВАЯ СТРЕЛКА
    arrowLeft.addEventListener("click", function(event) {
      absCont = document.querySelector(
        ".scenarios-box .info-item-box__rel > .info-item-box__abs"
      );
      relCont = document.querySelector(".scenarios-box .info-item-box__rel");
      // Если стрелка нажата во время скролла
      if (SETTINGS.inScrollingNow === true) {
        return;
      }
      slidePrev(relCont, absCont);
    });

    // ПРАВАЯ СТРЕЛКА
    arrowRight.addEventListener("click", function() {
      absCont = document.querySelector(
        ".scenarios-box .info-item-box__rel > .info-item-box__abs"
      );
      relCont = document.querySelector(".scenarios-box .info-item-box__rel");
      // Если стрелка нажата во время скролла
      if (SETTINGS.inScrollingNow === true) {
        return;
      }
      console.log("Делаем по -другому вперед", absCont, relCont);
      slideNext(relCont, absCont);
    });
  };
  // Инициализируем скролл
  arrowSlider();

  /** **********************\
    END Функция для стрелок
  \************************/
};
