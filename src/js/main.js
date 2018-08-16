// info-item_stripe-yellow
// info-item_stripe-three-col
// info-item_circle-regulator
(function () {
    // Events handler
    // Сделим время зажатия кнопки, что бы не вылетали попапы при перетягивании мышью
    let timeStamp = 0
    document.querySelector('body').addEventListener('mousedown', function (event) {
        timeStamp = event.timeStamp
    })
    document.querySelector('body').addEventListener('mouseup', function (event) {
        // console.log('Обычный клик', timeStamp, event)
        // Открытие popup
        if (event.target.className.indexOf('info-item') >= 0 && (event.timeStamp - timeStamp) < 200 && event.button === 0) {
            openPopup(event.target.closest('.info-item'));
            // В завивимости от модификатора на popup включим нужный регулятор
            if (event.target.className.indexOf('popup_circle-regulator') >= 0) {
            } else if (event.target.className.indexOf('popup_stripe-regulator') >= 0) {
            }
        } else if (
            event.target.className.indexOf('popup-bg') >= 0 ||
            event.target.className.indexOf('popup__close') >= 0 ||
            event.target.className.indexOf('popup__apply') >= 0
        ) {
            //Закрытие popup
            closePopup(event.target.closest('.info-item'));
        }
    });

    //Переменные, которые будут нужны для закрытия Popup
    let targetPageTop, targetPageLeft, targetHeight, targetWidth, itemSelector, popupModificator;

    // Popup Open/Close
    let openPopup = function (elem) {

        // Включаем нужный контент попапа 
        if (elem.className.indexOf('info-item_stripe-yellow') >= 0) {
            console.log('Желтая')
            document.querySelector('.popup').classList.add('popup_stripe-yellow')
            popupModificator = 'popup_stripe-yellow'
        } else if (elem.className.indexOf('info-item_stripe-three-col') >= 0) {
            console.log('Три цвета')
            document.querySelector('.popup').classList.add('popup_stripe-three-col')
            popupModificator = 'popup_stripe-three-col'

        } else if (elem.className.indexOf('info-item_circle-regulator') >= 0) {
            console.log('Круговой регулятор')
            document.querySelector('.popup').classList.add('popup_circle-regulator')
            popupModificator = 'popup_circle-regulator'
        }

        itemSelector = elem;

        document.body.style.overflow = 'hidden';
        document.querySelector('.popup').style.display = 'flex';

        targetPageTop = elem.getBoundingClientRect().top + window.pageYOffset;
        targetPageLeft = elem.getBoundingClientRect().left + window.pageXOffset;
        targetWidth = elem.clientWidth;
        targetHeight = elem.clientHeight;

        const popUpBody = document.querySelector('.popup__body');
        const popupBodyTop = popUpBody.getBoundingClientRect().top + window.pageYOffset;
        const popupBodyHeight = popUpBody.clientHeight;
        const popupBodyWidth = popUpBody.clientWidth;

        // Пока откл, потому что поставил фиксированные размеры стандартно
        // Зададим размеры, что бы элемент не растянуло при фиксированном display
        // elem.style.width = targetWidth + 'px';
        // elem.style.height = targetHeight + 'px';

        // Оставляя элемент на той же позиции сделаем его фиксированным
        elem.style.top = targetPageTop + 'px';
        // 20 это паддинг у body
        elem.style.left = targetPageLeft - 20 + 'px';
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
                document.body.style.overflow = 'hidden';
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

        setTimeout(function () {
            itemSelector.classList.remove('info-item_open');
            itemSelector.style.top = targetPageTop + 'px';
            itemSelector.style.left = targetPageLeft - 20 + 'px';
            itemSelector.style.height = targetHeight + 'px';
            itemSelector.style.width = targetWidth + 'px';

            setTimeout(function () {
                itemSelector.style.position = 'unset';
                itemSelector.style.display = 'flex';
                document.body.style.overflow = 'unset';
                popBgStyle.display = 'none';
                popup.style.display = 'none';
                // Если часто открыть-закрыть окно, то блюр может не убраться, поэтому повторно убираем
                document.querySelector('.blur-box').style.filter = 'blur(0)';
                // Удалим контент попапа
                document.querySelector('.popup').classList.remove(popupModificator)
            }, 600);
        }, 200);
    };
})();

// СКРОЛЛ

// Определение content is overflowing для стрелок
function determineOverflow(content, container) {
    var containerMetrics = container.getBoundingClientRect();
    var containerMetricsRight = Math.floor(containerMetrics.right);
    var containerMetricsLeft = Math.floor(containerMetrics.left);
    var contentMetrics = content.getBoundingClientRect();
    var contentMetricsRight = Math.floor(contentMetrics.right);
    var contentMetricsLeft = Math.floor(contentMetrics.left);
    if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return 'both';
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return 'left';
    } else if (contentMetricsRight > containerMetricsRight) {
        return 'right';
    } else {
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

    function doSomething(scroll_pos) {
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


/**********************\ 
  Функция для стрелок
\**********************/
// Входные параменты это контейнер со стрелками и бокс, которым управляюи стрелки
const arrowScroll = function (arrows, relCont) {
    let arrowLeft = document.querySelector(arrows + ' .arrow-left');
    let arrowRight = document.querySelector(arrows + ' .arrow-right');
    absCont = document.querySelector(relCont + ' > div');
    relCont = document.querySelector(relCont);

    // Настройки
    var SETTINGS = {
        inScrollingNow: false,
        scrollDirection: '',
        scrollDistance: 220
    };

    // ЛЕВАЯ СТРЕЛКА
    arrowLeft.addEventListener('click', function () {
        console.log('Что то есть');

        // Если стрелка нажата во время скролла
        if (SETTINGS.inScrollingNow === true) {
            return;
        }
        // Если контент выходит в обе стороты или влево
        if (determineOverflow(absCont, relCont) === 'left' || determineOverflow(absCont, relCont) === 'both') {
            var availableScrollLeft = relCont.scrollLeft;
            // В первом случае крутим до конца, в втором на заданный промежуток
            if (availableScrollLeft < SETTINGS.scrollDistance * 2) {
                absCont.style.transform = 'translateX(' + availableScrollLeft + 'px)';
            } else {
                absCont.style.transform = 'translateX(' + SETTINGS.scrollDistance + 'px)';
            }

            // Удаляем класс отключающий транзишн
            absCont.classList.remove("no-transition");

            SETTINGS.scrollDirection = 'left';
            SETTINGS.inScrollingNow = true;
        }
        // Обновляем атрибут контейнера
        relCont.setAttribute('data-overflowing', determineOverflow(absCont, relCont));
    });

    // ПРАВАЯ СТРЕЛКА
    arrowRight.addEventListener('click', function () {
        // Если стрелка нажата во время скролла
        if (SETTINGS.inScrollingNow === true) {
            return;
        }

        // Если контент выходит в обе стороты или вправо
        if (determineOverflow(absCont, relCont) === 'right' || determineOverflow(absCont, relCont) === 'both') {
            // Вычисляем доступной для скролла пространство
            var relContRightEdge = absCont.getBoundingClientRect().right;
            var absContRightEdge = relCont.getBoundingClientRect().right;
            var availableScrollRight = Math.floor(relContRightEdge - absContRightEdge);
            // В первом случае крутим до конца, в втором на заданный промежуток
            if (availableScrollRight < SETTINGS.scrollDistance * 2) {
                absCont.style.transform = 'translateX(-' + availableScrollRight + 'px)';
            } else {
                absCont.style.transform = 'translateX(-' + SETTINGS.scrollDistance + 'px)';
            }

            // Удаляем класс отключающий транзишн
            absCont.classList.remove("no-transition");

            SETTINGS.scrollDirection = 'right';
            SETTINGS.inScrollingNow = true;
        }
        // Обновляем атрибут контейнера
        relCont.setAttribute('data-overflowing', determineOverflow(absCont, relCont));
    });

    // ОТСЛЕЖИВАНИЕ ЗАВЕРШЕНИЯ ДВИЖЕНИЯ СЛАЙДЕРА
    absCont.addEventListener(
        'transitionend',
        function () {
            // получаем значение транзишена и заменяем его на скролл
            var styleOfTransform = window.getComputedStyle(absCont, null);
            var tr =
                styleOfTransform.getPropertyValue('-webkit-transform') ||
                styleOfTransform.getPropertyValue('transform');
            // Если транзишена нет, то ставим 0
            var amount = Math.abs(parseInt(tr.split(',')[4]) || 0);
            absCont.style.transform = 'none';
            absCont.classList.add('no-transition');

            if (SETTINGS.scrollDirection === 'left') {
                relCont.scrollLeft = relCont.scrollLeft - amount;
            } else {
                relCont.scrollLeft = relCont.scrollLeft + amount;
            }
            SETTINGS.inScrollingNow = false;
        },
    );
};

/*************************************\ 
  ФУНКЦИЯ ДЛЯ СКРОЛЛА МЫШЬЮ И ПАЛЬЦЕМ
\*************************************/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add' + EventListener;
    var removeEventListener = 'remove' + EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function (i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function (e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function () { pushed = 0; }, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function (e) {
                        if (pushed) {
                            (scroller = el.scroller || el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX = e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY = e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
            })(dragged[i++]);
        }
    }


    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));


// статья https://benfrain.com/a-horizontal-scrolling-navigation-pattern-for-touch-and-mouse-with-moving-current-indicator/

// ИНИЦИАЛИЗАЦИИ. САМЫЙ КОНЕЦ
// Инициализируем скролл
arrowScroll('.scenarios-box .arrows', '.scenarios-box .info-item-box__rel');


/*********************\ 
  КРУГОВОЙ РЕГУЛЯТОР
\*********************/
(function () {
    // Пределы выставляемой  температуры
    const maxTemp = 35;
    const minTemp = 18;

    //Цвет в который красим активные черточки
    const color = '#F5A623';

    let rotation = 0;
    // в rotated мы как бы получили нашу текущую температуру с сервера
    let currentTemp = parseInt(document.querySelector('.circle-regulator__temperature').textContent);
    // Посчитаем поворота регулятора
    let rotated = 360 / (maxTemp - minTemp) * (currentTemp - minTemp);

    const circle = document.getElementById('circle-regulator');

    let gray = false;
    while (rotation < 359) {
        // Выводим черточки и закрашиваем только те, которые находятся до нашей точки поворота
        circle.insertAdjacentHTML('beforeEnd',
            `<div class="circle-regulator__dash" style="transform:rotate( ${rotation}deg);   ${rotation < rotated ? 'border-color:' + color : ''};"></div>`
        );
        // На первой серой черточке проставляем стрелку на предыдущую
        if (rotation > rotated && !gray) {
            gray = true
            document.querySelector('.circle-regulator__arrow').style.transform = `rotate(${rotation - 3}deg)`

        }
        rotation += 3;
    }


    circle.addEventListener('click', function (event) {
        changeTemperature(event.x, event.y);
    })

    circle.addEventListener('touchmove', function (event) {
        const posX = event.changedTouches[event.changedTouches.length - 1].pageX - window.scrollX
        const posY = event.changedTouches[event.changedTouches.length - 1].pageY - window.scrollY
        changeTemperature(posX, posY);

    })
    circle.addEventListener('touchstart', function (event) {
        const posX = event.changedTouches[event.changedTouches.length - 1].pageX - window.scrollX
        const posY = event.changedTouches[event.changedTouches.length - 1].pageY - window.scrollY
        changeTemperature(posX, posY);

    })



    const changeTemperature = function (posX, posY) {
        // console.log(circle.parentNode.parentNode, this.getClientRects)
        const popupBody = document.querySelector('.popup');
        // console.log(popupBody.offsetTop, circle.getBoundingClientRect().top, circle.getBoundingClientRect()
        // .left)
        let a = circle.getBoundingClientRect().left
        let b = circle.getBoundingClientRect().top
        // Катеты нашего треугольника.
        // К mouseLeft я прибавил 0.1 для того, чтобы избежать возможного деления на ноль впоследствии.
        // Из координат клика вычитаем скролл страницы, отступ нашего цифарблата от верхней части окна и половину ширины циферблата
        var mouseLeft = posX - (circle.getBoundingClientRect().left + circle.clientWidth / 2);
        var mouseTop = posY - (circle.getBoundingClientRect().top + circle.clientHeight / 2) +
            0.1;


        // Вычисление угла (т.к. Math.atan() возвращает значение в радианах,
        // для более простого оперирования с ним переведем его в градусы).
        var rad2deg = 180 / Math.PI;
        var angle = Math.atan(Math.abs(mouseLeft) / Math.abs(mouseTop)) * rad2deg;

        var absoluteAngle = 0;

        if (mouseLeft > 0 && mouseTop < 0) {
            absoluteAngle = angle;
        } else if (mouseLeft > 0 && mouseTop > 0) {
            absoluteAngle = 90 + (90 - angle)
        } else if (mouseLeft < 0 && mouseTop > 0) {
            absoluteAngle = 180 + angle;
        } else if (mouseLeft < 0 && mouseTop < 0) {
            absoluteAngle = 270 + (90 - angle);
        }

        console.log(absoluteAngle);

        // console.log(document.getElementsByClassName("circle-regulator__dash"))

        // Получим все полоски
        var dashes = document.getElementsByClassName("circle-regulator__dash");
        var oneDashRad = 360 / dashes.length;
        // Полосок для изменения цвета
        var dashesToChanches = absoluteAngle / oneDashRad;
        // console.log(Math.round(dashesToChanches))

        dashesToChanches = Math.round(dashesToChanches);

        for (let i = 0; dashes.length > i; i++) {
            i < dashesToChanches ? dashes[i].style.borderColor = color : dashes[i].style.borderColor =
                '#333333'

            // На последней итерации меняем угол наклона стрелки
            if (i === dashes.length - 1) {
                document.querySelector('.circle-regulator__arrow').style.transform =
                    `rotate(${absoluteAngle}deg)`;
                // Меняем цифру температуры
                let newTemp = absoluteAngle / (360 / (maxTemp - minTemp)) + minTemp;
                newTemp = Math.round(newTemp)
                document.querySelector('.circle-regulator__temperature').textContent = '+' + newTemp;
            }
        }
    }
})();

/************************\ 
 END КРУГОВОЙ РЕГУЛЯТОР
\************************/

/*
///////////СКРИПТ ПОПАПЧИКА
let zWidth, zHeight, zTop, zLeft
 
// console.log(document.getElementsByClassName('a'))
document.querySelector('body').addEventListener('click', function (event) {
console.log(event.target.className)
if (event.target.className.indexOf('info-item') >= 0) {
    console.log('Есть');
    zTop = event.target.getBoundingClientRect().top;
    zLeft = event.target.getBoundingClientRect().left;
    zWidth = event.target.clientWidth + 'px'
    zHeight = event.target.clientHeight + 'px'
    document.querySelector('.popup').style.top = zTop + (120 / 2) + 'px';
    document.querySelector('.popup').style.left = zLeft + (200 / 2) + 'px';
    // document.querySelector('.popup').style.width = event.target.clientWidth + 'px';
    // document.querySelector('.popup').style.height = '50px';
    // document.querySelector('.popup').style.transform = 'scale(.1)';
    // document.querySelector('.popup').style.height = event.target.clientHeight + 'px';
    document.querySelector('.popup').style.opacity = 1;
    document.querySelector('.popup').style.display = 'flex';
 
    console.log(event.target.clientHeight)
 
    document.querySelector('.popup').style.transform = 'translate(-50%, -50%)';
    document.querySelector('.popup').style.top = '50%';
    document.querySelector('.popup').style.left = '50%';
 
    // document.querySelector('.popup').style.width = '200px';
    // document.querySelector('.popup').style.height = '200px';
 
    // Включим blur и темный фон
    let popBgStyle = document.querySelector('.popup-bg').style;
    popBgStyle.display = 'block';
    popBgStyle.opacity = 1;
    // уберем скролл
    document.body.style.overflow = "hidden"
 
    document.querySelector('.blur-box').style.filter = 'blur(2px)'
 
}
})
 
 
document.querySelector('.popup-bg').addEventListener('click', function () {
 
document.querySelector('.popup').style.top = zTop;
document.querySelector('.popup').style.left = zLeft;
document.querySelector('.popup').style.transform = 'scale(.1)';
 
// document.querySelector('.c').style.width = zWidth;
// document.querySelector('.c').style.height = zHeight;
document.querySelector('.popup').style.opacity = 0;
// Переключим blur и темный фон
let popBgStyle = document.querySelector('.popup-bg').style;
popBgStyle.display = 'none';
popBgStyle.opacity = 0;
// Вернем скролл
document.body.style.overflow = "unset"
 
document.querySelector('.blur-box').style.filter = 'blur(0)'
 
})
 
/// для радиокнопок
var form = document.querySelector("#light-mode-form");
form.addEventListener('click', function (event) {
if (event.target.getAttribute('name') === 'light-mode' && event.target.getAttribute('value') !=
    'manual') {
    console.log(event.target.getAttribute('value'));
    let forInput = event.target.getAttribute('for')
    let value = document.querySelector('#' + forInput).getAttribute('value')
    let containerHeight = document.querySelector(".stripe-regulator__gradient-stripe").clientHeight
    let circleHeight = document.querySelector(".stripe-regulator__outer-circle").clientHeight
    let circleBottom = (containerHeight - circleHeight) / 100 * value
    document.querySelector(".stripe-regulator__outer-circle").style.bottom = circleBottom + 'px'
    console.log(value)
}
})*/

/**************************\ 
 ГОРИЗОНТАЛЬНЫЙ РЕГУЛЯТОР
\**************************/
let touchRegulator = function (stripeSelector, circleSelector) {
    let gradientStripe = document.querySelector(stripeSelector)
    let circle = document.querySelector(circleSelector)
 
    console.log(gradientStripe, circle)
    // На контрольных точках меняем артибут описывающий положение полоски
    window.addEventListener('resize', function (event) { onResise(event) })
    let onResise = function (event) {
        if (window.innerWidth <= 700) {
            gradientStripe.setAttribute('stripePosition', 'vertical');
            console.log('vertical')
        } else {
            gradientStripe.setAttribute('stripePosition', 'horizontal');
            console.log('hor')
        }
    }
    onResise()

    ///////////////////////////

    gradientStripe.addEventListener('click', function (event) {
        // changeTemperature(event.x, event.y);
    })

    gradientStripe.addEventListener('touchmove', function (event) {
        changeCirclePosition(event)


        // // Позиция круга на экране
        // let circleCurrentTop = circle.getBoundingClientRect().top
        // // Место тача
        // let firstTouch = event.changedTouches[event.changedTouches.length - 1].clientY
        // let diff = circleCurrentTop - firstTouch
        // console.log(parseInt(circle.style.bottom))
        // circle.style.bottom = (parseInt(gradientStripe.clientHeight - circle.offsetTop - 70 + 35) + diff) +
        //     'px'

    })
    gradientStripe.addEventListener('touchstart', function (event) {

        changeCirclePosition(event)


    })

    let changeCirclePosition = function (event) {
        // Позиция круга на экране
        let circleCurrentTop = circle.getBoundingClientRect().top
        console.log(event.targetTouches[0]);
        console.log(event.changedTouches);
        console.dir('круг', circle)

        // Место тача
        let firstTouch = event.changedTouches[event.changedTouches.length - 1].clientY
        let diff = circleCurrentTop - firstTouch
        console.log(parseInt(circle.style.bottom))
        let bottom = parseInt(gradientStripe.clientHeight - circle.offsetTop - 70 + 35) + diff
        if (bottom < 0) {
            bottom = 0
        } else if (bottom > (gradientStripe.clientHeight - 70)) {
            bottom = gradientStripe.clientHeight - 70
        }
        circle.style.bottom = bottom + 'px'
    }
    // form.addEventListener("submit", function (event) {
    //     // var data = new FormData(form);
    //     console.log(event)
    //     // var output = "";
    //     // for (const entry of data) {
    //     //     output = entry[0] + "=" + entry[1] + "\r";
    //     // };
    //     // log.innerText = output;
    //     event.preventDefault();
    // }, false);
}

// Инициализируем оба регулятора
touchRegulator('.stripe-regulator__gradient-stripe.stripe-regulator__gradient-stripe_three-color', '.stripe-regulator__gradient-stripe.stripe-regulator__gradient-stripe_three-color   .stripe-regulator__outer-circle');
touchRegulator('.stripe-regulator__gradient-stripe.stripe-regulator__gradient-stripe_yellow', '.stripe-regulator__gradient-stripe_three-yellow .stripe-regulator__outer-circle');
/******************************\ 
 END ГОРИЗОНТАЛЬНЫЙ РЕГУЛЯТОР
\******************************/
https://mobiforge.com/design-development/touch-friendly-drag-and-drop