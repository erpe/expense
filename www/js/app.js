/**
 * Wait before the DOM has been loaded before initializing the Ubuntu UI layer
 */
$(document).ready(function () {
    function addClass(elem, className) {
        elem.className += ' ' + className;
    };

    function removeClass(elem, className) {
        elem.className = elem.className.replace(className, '');
    };

    function displayAmountAdded(val) {
        $('#amountAdded').html("<p>" + makeDateString() + ": -" +  val + "</p>");
    };

    function makeDateString() {
      var d = new Date();
      var dString = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
      return dString;
    };

    function displayTotal() {
      var today = new Date();
      expenseMonth = ExpenseMonth.find(today.getFullYear(), today.getMonth() + 1) || new ExpenseMonth;
      sum = expenseMonth.sum();
      $('#currentExpense').html(sum.toFixed(2));
      console.log("update total: " + sum);
    };

    var UI = new UbuntuUI();
    UI.init();

    displayTotal();

    UI.button('addExpense').click(function() {
        var val = parseFloat($('#inputExpense').val());
        console.log("adding: " + val + " amount");
        if (val > 0 ) {
          today = new Date()
          exp = new ExpenseItem(today.toString(), val, 'testing')
          exp.save()
          displayAmountAdded(val);
          displayTotal();
          UI.pagestack.pop();
          //UI.pagestack.push('mainPage');

        }
    });

    UI.button('newExpense').click(function() {
      UI.pagestack.push('newPage');
    });
 });