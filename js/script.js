/* ------------------------------ Validation ------------------------------ */

var clientNameInputs = document.querySelectorAll('.client-name');

clientNameInputs.forEach(input => {
    input.addEventListener('keydown', function(event) {
      if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
        (event.keyCode == 65 && event.ctrlKey === true) ||
        (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
      } else {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105 )) {
          event.preventDefault();
        }
      }
    });
});

var moneyInputs = document.querySelectorAll('.input-money');

moneyInputs.forEach(input => {
  var valueN = input.value;
  var summ = String(valueN).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

	// input.value = summ + ' ₽';
});

/* ------------------------------ Ranges ------------------------------ */

var inputPrice = document.querySelector('#input-price');
var inputPriceRange = document.querySelector('#input-price-range');
var inputPeriod = document.querySelector('#input-period');
var inputPeriodRange = document.querySelector('#input-period-range');

inputPrice.value = inputPriceRange.value; // Display the default slider value

// Average price

inputPriceRange.addEventListener('input', function() {
  inputPrice.value = this.value;
  calculator();
});

inputPrice.addEventListener('keyup', function() {
  inputPriceRange.value = this.value;
  calculator();
});

// Period of working

inputPeriodRange.addEventListener('input', function() {
  inputPeriod.value = this.value;
  calculator();
});

inputPeriod.addEventListener('keyup', function() {
  inputPeriodRange.value = this.value;
  calculator();
});

//////////////////////////////

document.querySelectorAll('.input-money').forEach(function(input) {
  input.style.display = 'none';
});

/* ------------------------------ Calculator ------------------------------ */

function calculator() {
  var inputAvaragePurchase = document.querySelector('#avarage-purchase');
  var inputAvarageEarnings = document.querySelector('#avarage-earnings');
  var inputAvarageRent = document.querySelector('#avarage-rent');
  var inputAvarageSalary = document.querySelector('#avarage-salary');
  var inputMaterials = document.querySelector('#materials');
  var inputOtherCosts = document.querySelector('#other-costs');

  var netProfP = document.querySelectorAll('.net-profit');
  var netProfspans = [];
  netProfP.forEach(p => {
    netProfspans.push(p.querySelector('span'));
  });

  // calc profit

  function calcProfit() {
    var netProfit;

    inputAvarageEarnings.value = inputPrice.value * inputAvaragePurchase.value;
  
    netProfit = (inputAvarageEarnings.value - inputAvarageRent.value - inputAvarageSalary.value - inputMaterials.value - inputOtherCosts.value) * inputPeriod.value;
  
    netProfspans.forEach(span => {
      span.innerHTML = String(netProfit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
    });
  }

  // Radios

  var radioLabels = document.querySelectorAll('.option-radio-label');

  radioLabels.forEach(label => {
    label.onclick = function(event) {
      var inputRadio = label.querySelector('input');

      inputRadio.setAttribute('checked', 'checked');

      if (inputRadio.id === 'familycafe') {
        inputAvarageRent.setAttribute('value', '400000');
        inputOtherCosts.setAttribute('value', '1400600');
      } 
      if (inputRadio.id === 'foodcourt') {
        inputAvarageRent.setAttribute('value', '320000');
        inputOtherCosts.setAttribute('value', '1001600');
      }

      var eventChangeValue = new Event('change');

      document.querySelectorAll('.input-money-wrap').forEach(function(wrap) {
        var input = wrap.querySelector('.input-money');

        input.dispatchEvent(eventChangeValue);
      });

      calcProfit();
    };
  });

  calcProfit();

  // Declension of words

  function declension(n, textForms) {  
    n = Math.abs(n) % 10000; var n1 = n % 10;
    if (n > 10 && n < 20) { return n + ' ' + textForms[2]; }
    if (n1 > 1 && n1 < 5) { return n + ' ' + textForms[1]; }
    if (n1 == 1) { return n + ' ' + textForms[0]; }
    return n + ' ' + textForms[2];
  }

  // Goods sold calculator 
  function goodsSoldCalc() {
    var goodsSoldArray = document.querySelectorAll('.goods-sold');
    var amountSold = inputAvaragePurchase.value * 0.81875;

    goodsSoldArray.forEach(good => {
      if (good.id === 'pizza-sold') {
        good.innerHTML = declension(Math.round(amountSold*0.6082), ['штука', 'штуки', 'штук']);
      }
      if (good.id === 'salads-sold') {
        good.innerHTML = declension(Math.round(amountSold*0.0293), ['штука', 'штуки', 'штук']);
      }
      if (good.id === 'coffee-sold') {
        good.innerHTML = declension(Math.round(amountSold*0.2450), ['стакан', 'стакана', 'стаканов']);
      }
      if (good.id === 'desserts-sold') {
        good.innerHTML = declension(Math.round(amountSold*0.0195), ['штука', 'штуки', 'штук']);
      }
      if (good.id === 'main-course-sold') {
        good.innerHTML = declension(Math.round(amountSold*0.0980), ['штука', 'штуки', 'штук']);
      }
    });
  }

  goodsSoldCalc();
  
  // spans

  var inputWraps = document.querySelectorAll('.input-wrap');

  inputWraps.forEach(wrap => {
    var input = wrap.querySelector('input');
    var span = wrap.querySelector('.input-span');

    if (input.classList.contains('input-money')) {
      span.innerHTML = String(input.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽';
    
      input.onchange = function() {
        span.innerHTML = String(input.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽';
      };
    } else if (input.classList.contains('input-period')) {

      span.innerHTML = declension(String(input.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "), [' месяц', ' месяца', ' месяцев']);
    
      input.onchange = function() {
        span.innerHTML = declension(String(input.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "), [' месяц', ' месяца', ' месяцев']);
      };
    }
     else if (input.classList.contains('input-numerable')) {
      span.innerHTML = String(input.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
    
      input.onchange = function() {
        span.innerHTML = String(input.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
      };
    }

    input.style.display = 'none';

    if (input.getAttribute('disabled') !== '') {
      span.style.backgroundColor = '#FFFFFF';

      span.onclick = function(event) {
        event.target.style.display = 'none';
        input.style.display = 'inline-block';
        input.focus();
      };
  
      input.onblur = function(event) {
        event.target.style.display = 'none';
        span.style.display = 'inline-block';
      };
    }
  });
}

calculator()