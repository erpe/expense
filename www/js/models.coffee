class ExpenseStore
  @months: () ->
    Object.keys(localStorage).sort().reverse()

class ExpenseMonth

  constructor: (@dateString) ->
    @items = []

  month: ->
    new Date(@dateString).getMonth() + 1

  year: ->
    new Date(@dateString).getFullYear()

  sum: ->
    n = 0.00
    for i in @items
      n += i.amount
    n

  isPersisted: ->
    if localStorage.getItem(@year() + '-' + @month())
      return true
    false

  save: ->
    @jsonItems = []

    for i in @items
      @jsonItems.push(JSON.stringify(i))
      
    json = JSON.stringify(@)
    localStorage.setItem(@year() + '-' + @month(), json)

  @find: (year, month) ->
    if ls = localStorage.getItem(year + '-' + month)
      return ExpenseMonth.fromJson(ls)
    null
  
  @fromJson: (json) ->
    jsonObj = JSON.parse(json)
    em = new ExpenseMonth(jsonObj.dateString)

    for jItem in jsonObj.jsonItems
      item = JSON.parse(jItem)
      em.items.push(new ExpenseItem(item.dateString, item.amount, item.category))
    em
  
  @fromStorageKey: (key) ->
    if ls = localStorage.getItem(key)
      return ExpenseMonth.fromJson(ls)
    null


      
class ExpenseItem

  constructor: (@dateString, @amount, @category) ->

  year: ->
    new Date(@dateString).getFullYear()

  month: ->
    new Date(@dateString).getMonth() + 1

  day: ->
    new Date(@dateString).getDay()

  save: ->
    json = JSON.stringify(@)
    em = ExpenseMonth.find(@year(),  @month()) || new ExpenseMonth(@dateString)
    em.items.unshift(@)
    em.save()
  
