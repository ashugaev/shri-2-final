/** ********************\
 ФИЛЬТР НА УСТРОЙСТВАХ
\**********************/
(function () {
    // Радиокнопки
    let radioButtons = document.querySelectorAll('input[name="filter"]');
    console.log(radioButtons.length);
  
    radioButtons.forEach(el => {
      el.onchange = function () {
        let t = this;
        hideElements(t);
      };
    });
  
    // Выпадающий список
    var filter_select_el = document.querySelector('.appliances-box__filter');
    var items = document.querySelectorAll(
      '.appliances-box .info-item-box__abs > *'
    );
  
    filter_select_el.onchange = function () {
      let t = this;
      hideElements(t);
    };
  
    // Фукция фильтрации
    let hideElements = function (t) {
      console.log('знач', t.value, items);
      // var items = items_el.querySelectorAll('item');
      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains(t.value)) {
          items[i].style.display = 'block';
        } else {
          items[i].style.display = 'none';
        }
      }
    };
  })();
