1. В контейнерах с тестом я везде старался учитывать то, что может быть слишком много текста и он выйдет за пределы, поэтому минимизировал вероятность наезлов элементов из -за этого

2. На иконке drizzle(в окне с надписью: "Привет Геннадий!"). Иконка не отцентрированна по горизонтали и смещена вниз. Возжможно, что это специфика только этой иконки и что бы не обижать дизайнера я сделал модификатор для иконки, который добавляется вместе с ней.

3. Т.к. размер мобильного макета шире чем размер Mobile S (320px) в хроме, я делаю его адаптивным начинаю с того, который указан в хроме.

4. Я сделал адаптивные шрифты через calc , где крайние точки на размерах соответствующих макетам. т.е. шрифт начинает расти с размера мобильного макета, заканчиваен на размере макета для пк.

5. На макете дизайнер показал состояние hover на сколько я понимаю. В ответах на вопросы речь была о том, что 

6. Для адаптивной высоты я в основм блоке делал paddint-top в процентах, внутри него асолютно позиционированный блок с высотой 100% и внутри него уже блок relative с контентом