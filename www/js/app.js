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
      $('#currentExpense').html("<span class='blink'>" + sum.toFixed(2) + "</span>");

      console.log("update total: " + sum);
    };

    function clearInput() {
      $('#inputExpense').val('');
    };

    var UI = new UbuntuUI();

    UI.init();

    // expensecategory color-coded option in ui
    var expenseCategory = 0;

    displayTotal();

    os = UI.optionselector('expenseCategorySelect', false);

    os.onClicked(function(e) {
        expenseCategory = e.values;
    });

    UI.button('addExpense').click(function() {
        var val = parseFloat($('#inputExpense').val());
        console.log("adding: " + val + " amount");
        if (val > 0 ) {
          today = new Date();
          exp = new ExpenseItem(today.toString(), val, expenseCategory);
          console.log("expenseCategory: " + expenseCategory);
          exp.save();
          displayTotal();
          clearInput();
        }
    });

    UI.button('destroyExpensesBtn').click(function() {
      console.log("destroyExpenseBtn clicked...");
      ExpenseStore.destroy();
      displayTotal();
      $('#destroyResponse').html("<span class='blink'>All expenses removed.</span>")
      //UI.dialog('destroyDialog').show();
      //var base = $('destroyExpenseBtn');
      //var pop = UI.popover(base, 'destroyPopover');
      //pop.show();
    });
 });
