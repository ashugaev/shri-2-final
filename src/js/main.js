(function () {
    // Events handler
    document.querySelector('body').addEventListener('click', function (event) {
        // Открытие popup
        if (event.target.className.indexOf('info-item') >= 0) {
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
    let targetPageTop, targetPageLeft, targetHeight, targetWidth, itemSelector;

    // Popup Open/Close
    let openPopup = function (elem) {
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
                itemSelector.style.display = 'flex';
                document.body.style.overflow = 'unset';
                popBgStyle.display = 'none';
                popup.style.display = 'none';
                // Если часто открыть-закрыть окно, то блюр может не убраться, поэтому повторно убираем
                document.querySelector('.blur-box').style.filter = 'blur(0)';
            }, 500);
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
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
}

(function () {
    // Внешний контейнер слайдера
    let relBox = document.querySelector('.info-item-box__rel');
    // Внутренний контейнер с контентом
    let absBox = document.querySelector('.info-item-box__abs');

    // Ставим атрибут - индикатор скрола
    relBox.setAttribute("data-overflowing", determineOverflow(absBox, relBox));

    // Отслеживаем скролл и обновляем атрибут
    var last_known_scroll_position = 0;
    var ticking = false;

    function doSomething(scroll_pos) {
        relBox.setAttribute("data-overflowing", determineOverflow(absBox, relBox));
    }

    // Слушаем скролл и меняем атрибуты обозночающие скролл
    relBox.addEventListener("scroll", function () {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });
}())

// Функция для стрелок. 
// Входные параменты это контейнер со стрелками и бокс, которым управляюи стрелки
const arrowScroll = function (arrows, relCont) {
    let arrowLeft = document.querySelector(arrows + ' .arrow-left');
    let arrowRight = document.querySelector(arrows + ' .arrow-right');
    absCont = document.querySelector(relCont + ' > div');
    relCont = document.querySelector(relCont);

    arrowLeft.addEventListener("click", function () {
        console.log('Что то есть')
        // Если стрелка нажата во время скролла
        у стрелок есть проблема с z-index, их перекрывает верхний элемент
        if (SETTINGS.inScrollingNow === true) {
            return;
        }
        // Если контент выходит в обе стороты или влево
        if (determineOverflow(absCont, relCont) === "left" || determineOverflow(absCont, relCont) === "both") {
            console.log('Контент выходит в обще стороны или влево')
        }

    })

}

// статья https://benfrain.com/a-horizontal-scrolling-navigation-pattern-for-touch-and-mouse-with-moving-current-indicator/

// ИНИЦИАЛИЗАЦИИ. САМЫЙ КОНЕЦ
// Инициализируем скролл
arrowScroll('.scenarios-box .arrows', '.scenarios-box .info-item-box__rel');



/*
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
        `<div class="circle-regulator__dash" style="transform:rotate( ${ rotation }deg);   ${ rotation < rotated ? 'border-color:' + color : ''};"></div>`
    );
    // На первой серой черточке проставляем стрелку на предыдущую
    if (rotation > rotated && !gray) {
        gray = true
        document.querySelector('.circle-regulator__arrow').style.transform = `rotate(${rotation-3}deg)`

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
})


/// Для полоски
let gradientStripe = document.querySelector(".stripe-regulator__gradient-stripe")
let circle = document.querySelector(".stripe-regulator__outer-circle")

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

*/
