const Shares = require('./models/shares.js')
const SharesFirstView = require('./views/shares_first_view.js')
const SharesPieChart = require('./views/shares_pie_chart_view.js')


document.addEventListener('DOMContentLoaded', () => {



 const graphs = document.querySelector('#fextry')
 const pieGraphView = new SharesPieChart(graphs)
 pieGraphView.bindEvent()

//  const homeButton = document.querySelector('#home')
//  homeButton.addEventListener('click' , (evt) =>{
//    const bla = new SharesPieChart()
//    bla.bindEvent()
// })


 const space = document.querySelector('#fextry')
 const portfolioButton = document.querySelector('#portfolio')
 const categorySelector = document.querySelector('#category-selector')
 const nameSelector = document.querySelector('#name-selector')
 const container = document.querySelector('#container')
 const firstView = new SharesFirstView(space, portfolioButton)
 firstView.bindEvent();


 const url = 'http://localhost:3000/api/shares'
 const shares = new Shares(url)
 shares.getData();


});
