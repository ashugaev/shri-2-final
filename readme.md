1. В контейнерах с тестом я везде старался учитывать то, что может быть слишком много текста и он выйдет за пределы, поэтому минимизировал вероятность наезлов элементов из -за этого

2. На иконке drizzle(в окне с надписью: "Привет Геннадий!"). Иконка не отцентрированна по горизонтали и смещена вниз. Возжможно, что это специфика только этой иконки и что бы не обижать дизайнера я сделал модификатор для иконки, который добавляется вместе с ней.

3. Т.к. размер мобильного макета шире чем размер Mobile S (320px) в хроме, я делаю его адаптивным начинаю с того, который указан в хроме.

4. Я сделал адаптивные шрифты через calc , где крайние точки на размерах соответствующих макетам. т.е. шрифт начинает расти с размера мобильного макета, заканчиваен на размере макета для пк.

5. На макете дизайнер показал состояние hover на сколько я понимаю. В ответах на вопросы речь была о том, что 

5.5. Для крайних значений адаптивности взяты значения маленького и большоко макетов.
6. Для адаптивной высоты я в основм блоке делал paddint-top в процентах, внутри него асолютно позиционированный блок с высотой 100% и внутри него уже блок relative с контентом
---основной блок растягивается псевдоэлементом в paddint top в %
---
6. Для вставки иконок использую основу icon и модификатор icon_icon-name. Это урощает управление иконками и уменьшает количество кода.
Следовательно для управления иконками мы используем смену класса. Например с icon_icon-name-1 на icon_icon-name-2
7. Размеры и позиционирование уже диктуются через стили родительского блока, куда иконка вставляется.

8. Высота элементов info-item (в избранных сценариях и т.д.) у меня ставится через 100% и опирается на родительский блок. Так сделано из за того, что элемент в абсолютнопозиционированном блоке, который в свою очередь лежить в relative блоке задающем нужную высоту элементам. Я сделал так, что бы исключить наезды элементов друг на друга и изменять высоты этих блоков одной цифрой в родительском блоке

9. Иногда получаются длинные названия классов, но это жертва в пользу читабельности и понятности кода. Если это проблема "веса" страницы ,то она решается плагином, который при сборке проекта заменит наши названия классов на рандомные например трехбуквенные значения.

10. Возможно стоило к стилями типа btn и пр. делать приставку (z-btn), что бы минимизаровать вероятность пересечения с новыми стилями или внешними библиотекамио. Но я исходил из того, что между разработчиками есть сгласованность и того, что такие названия проще запомнить.

11. Иконки вставлены в base64 в css файл для того, что бы не делать лишних запросов на сервер.

12. Что бы минимизировать использование js для выезжающего меню на мобильной версии использую чекбокс

13. Для активного пункта меню есть модификатор header__menu-item_active

!!!!!!!!!!!
111. Не забыть line-height в текстах
222. Иконка drizzle подумать с размерами, может быть добавить адаптивность
333. Вместо несколькох тегов font-size, font-family, font-weight и пр. использовать общий font
444. Почить про media, убедиться, что я корректно их использовать, узнать что такое screeen и all
555. Заменить fltx-box на сокращенные комманды где можно
666. Оптимизавировать изображения и иконки
777. Обрезается тень бокса в избранных сценариях родительским элементом
888. Посмотреть как делает сбросы стилей яндекс
999. Заюзать нативные css переменные
111. Связанные друг с другом брейкпойтны нужно вынести в переменные 
222. Посмотреть как яндекс делает сайты с точки зрения семантики. Т.е. юзают ли хедер и section. Даже если нет, нужно почитать и натыкать хотя бы секшенов
333. Все мелкие иконки инлайним для экономии запросов к серверу.
444. Сделать логотип на яндекс санс
555. Посмотреть есть ли сортировщик свойств в стилях, что бы он их группировал. Т.п. flex к flex, padding to pagging
666. Атрибуты  alt к картинкам
777. Альтернативные шрифты
888. Состояния кнопок: hover, active, focus
999. metatag для вьюпорта, что бы работало на мобиле
111. Перепроверить паддинги, где то можеь не переключаться
222. cursor при наведении на ссылки и другие кликабельные объекты