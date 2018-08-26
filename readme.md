## ⚙️ Настройки/Запуск

1. Dev server: npm run dev
2. Сборка для production: npm run build
3. Линтер css: npm run stylelint
4. Линтер js: semistandard --fix

## 📋 Мои комментарии

1. Т.к. размер мобильного макета шире чем размер Mobile S (320px) в хроме, я делаю его адаптивным начинаю с него.

1. Я сделал адаптивные шрифты в hello-box через calc , где крайние точки на размерах соответствующих макетам. т.е. шрифт начинает расти с размера мобильного макета, заканчиваен на размере макета для пк.

1. Для вставки иконок использую основу icon и модификатор icon_icon-name. Это урощает управление иконками и уменьшает количество кода. Размеры и позиционирование уже диктуются через стили родительского блока, куда иконка вставляется.

1. Иконки вставлены в base64 в css файл для того, что бы не делать лишних запросов на сервер.

1. Смена типа регулятора в попапе происходит через изменение одного класса - модификатора на главной форме.


### Благодарю Вас за интересную задачу и уделенное мне время! 🤝 