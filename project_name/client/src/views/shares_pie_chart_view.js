const PubSub = require('../helpers/pub_sub.js')
const Highcharts = require('highcharts')
const PieHelper = require('../helpers/pie_helper.js')


const SharesPieChart = function(container, button ){
  this.container = container
  this.button = button

}






SharesPieChart.prototype.bindEvent = function () {
  PubSub.subscribe('shares:shares_pie_chart:object', (evt) =>{
    this.objects = evt.detail
    // const names = this.getNames(this.objects);
    const sum = this.getSum(this.objects)
    // const y = this.getY(this.objects, sum);
    // const pieHelper = new PieHelper(this.objects)
    // const data = pieHelper.getData()
    this.renderInfo(sum)
    this.pieChartRender()
    this.newGraph()
  })
  PubSub.subscribe('shara:sharePieView:dataForSpiralGraph', (evt) =>{
    this.dataForGraph = evt.detail
  })
}

SharesPieChart.prototype.renderInfo= function (sum) {



  const infoDiv = document.createElement('div')
  infoDiv.classList.add('pie-chart')
  this.container.appendChild(infoDiv)

  const greetings = document.createElement('h3')
  greetings.textContent = `Hi Bob , here a short view of your investments :  `
  infoDiv.appendChild(greetings)


  const ul = document.createElement('ul')
  infoDiv.appendChild(ul)


  const howManyInvestment = document.createElement('li')
  howManyInvestment.textContent = `You have invested in ${this.objects.length} shares`
  ul.appendChild(howManyInvestment)

  const totalMoney = document.createElement('li')
  totalMoney.textContent = `This is the total amount for your shares : $${sum.toFixed(2)}`
  ul.appendChild(totalMoney)




};

// SharesPieChart.prototype.getNames = function (objects) {
//   return objects.map((object) => object.name_of_share)
// };

SharesPieChart.prototype.getSum = function (objects) {
  return objects.reduce((total, object) =>{
    return total += object.y
  }, 0)
};

// SharesPieChart.prototype.getY = function (objects, sum) {
//   return objects.map((object) => (object.value / sum ) * 100)
// };

SharesPieChart.prototype.pieChartRender = function () {

  const forChart = document.createElement('div')
  this.container.appendChild(forChart)


  var myChart = Highcharts.chart(forChart, {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Your portfolio shares'
        },
        tooltip:{
          pointFormat :'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [{
            name: 'share',
            data: this.objects
      } ]
    });
}

SharesPieChart.prototype.newGraph= function (data) {

  const forChartSpiral = document.createElement('div')
  this.container.appendChild(forChartSpiral)


  const myLineChart = Highcharts.chart(forChartSpiral, {

    chart: {
         type: 'line',
         renderTo: forChartSpiral
     },
     title: {
         text: 'Stock Price Variance'
     },
     series: this.dataForGraph
     });
};






module.exports = SharesPieChart;
