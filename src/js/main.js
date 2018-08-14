// Events handler
(function() {
	document.querySelector('body').addEventListener('click', function(event) {
		// Клики на панели устройтсв
		if (event.target.className.indexOf('info-item') >= 0) {
			openPopup(event.target.closest('.info-item'));
		}
	});
})();

// Popup Open/Close
let openPopup = function(elem) {
	let targetPageTop = elem.getBoundingClientRect().top + window.pageYOffset;
	let targetPageLeft = elem.getBoundingClientRect().left + window.pageXOffset;



	// console.log(event.target.getBoundingClientRect().top, event.target.getBoundingClientRect().left, window.pageYOffset, window.pageXOffset)
	elem.style.top = targetPageTop + 'px';
	// 40 - это паддинг на body и margin на элементе
    elem.style.left = targetPageLeft - 20 + 'px';
	elem.style.position = 'fixed';

	setTimeout(function() {
        elem.classList.add('info-item_open')
    }, 100);
    

	// zTop = event.target.getBoundingClientRect().top;
	// zLeft = event.target.getBoundingClientRect().left;
	// zWidth = event.target.clientWidth + 'px'
	// zHeight = event.target.clientHeight + 'px'
	// document.querySelector('.popup').style.top = zTop + (120 / 2) + 'px';
	// document.querySelector('.popup').style.left = zLeft + (200 / 2) + 'px';
	// document.querySelector('.popup').style.opacity = 1;
	// document.querySelector('.popup').style.display = 'flex';

	// document.querySelector('.popup').style.transform = 'translate(-50%, -50%)';
	// document.querySelector('.popup').style.top = '50%';
	// document.querySelector('.popup').style.left = '50%';

	// let popBgStyle = document.querySelector('.popup-bg').style;
	// popBgStyle.display = 'block';
	// popBgStyle.opacity = 1;
	// // уберем скролл
	// document.body.style.overflow = "hidden"

	// document.querySelector('.blur-box').style.filter = 'blur(2px)'
};

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
