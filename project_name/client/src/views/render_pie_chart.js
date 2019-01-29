const Highcharts = require('highcharts')
const PieHelper = require('../helpers/pie_helper.js')


const SharesPieChart = function(container, pieData){
  this.container = container
  this.pieData = pieData

}


SharesPieChart.prototype.render = function () {
    const names = this.getNames(this.pieData);
    const sum = this.getSum(this.pieData)
    const y = this.getY(this.pieData, sum);
    const pieHelper = new PieHelper(names , y)
    const data = pieHelper.getData()
    this.renderInfo(sum)
    this.pieChartRender(data)
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
  howManyInvestment.textContent = `You have invested in ${this.pieData.length} shares`
  ul.appendChild(howManyInvestment)

  const totalMoney = document.createElement('li')
  totalMoney.textContent = `This is the total amount for your shares : $${sum.toFixed(2)}`
  ul.appendChild(totalMoney)

};


SharesPieChart.prototype.getNames = function (objects) {
  return objects.map((object) => object.name_of_share)
};


SharesPieChart.prototype.getSum = function (objects) {
  return objects.reduce((total, object) =>{
    return total += object.value
  }, 0)
};


SharesPieChart.prototype.getY = function (objects, sum) {
  return objects.map((object) => (object.value / sum ) * 100)
};


SharesPieChart.prototype.pieChartRender = function (data) {

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
            data: data
      } ]
    });
}


module.exports = SharesPieChart;
