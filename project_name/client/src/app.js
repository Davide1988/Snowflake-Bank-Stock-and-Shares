const Shares = require('./models/shares.js')
const SharesFirstView = require('./views/shares_first_view.js')


document.addEventListener('DOMContentLoaded', () => {
console.log("javascript up and running my lord");


 const categorySelector = document.querySelector('#category-selector')
 const nameSelector = document.querySelector('#name-selector')
 const container = document.querySelector('#container')
 const firstView = new SharesFirstView(categorySelector, nameSelector, container)
 firstView.bindEvent();





 const url = 'http://localhost:3000/api/shares'
 const shares = new Shares(url)
 shares.getData();


});
