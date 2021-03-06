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
    const sum = this.getSum(this.objects)
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
  infoDiv.classList.add('client-info')
  this.container.appendChild(infoDiv)

  const name = document.createElement('h4')
  name.textContent = `Geoffrey Butterworth`
  infoDiv.appendChild(name)

  // const account = document.createElement('h4')
  // account.textContent = `MIMNDSC24383578`
  // infoDiv.appendChild(account)

  const howManyInvestment = document.createElement('h4')
  howManyInvestment.textContent = `You have shares in ${this.objects.length} companies`
  infoDiv.appendChild(howManyInvestment)

  const totalMoney = document.createElement('h4')
  totalMoney.textContent = `The total value of your shares is: $${sum.toFixed(2)}`
  infoDiv.appendChild(totalMoney)

};

SharesPieChart.prototype.getSum = function (objects) {
  return objects.reduce((total, object) =>{
    return total += object.y
  }, 0)
};

SharesPieChart.prototype.pieChartRender = function () {

  this.containerForGrahps = document.createElement('div')
  this.containerForGrahps.classList.add('container-for-graphs')
  this.container.appendChild(this.containerForGrahps)

  const pieChart = document.createElement('div')
  pieChart.classList.add('pie-chart')
  this.containerForGrahps.appendChild(pieChart)


  var myChart = Highcharts.chart(pieChart, {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Portfolio Split By Company'
        },
        tooltip:{
          pointFormat :'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        series: [{
            name: '% of total',
            data: this.objects
      } ]
    });
}

SharesPieChart.prototype.newGraph= function (data) {

  const forChartSpiral = document.createElement('div')
  forChartSpiral.classList.add('line-chart')
  this.containerForGrahps.appendChild(forChartSpiral)

  const myLineChart = Highcharts.chart(forChartSpiral, {

    chart: {
         type: 'line',
         renderTo: forChartSpiral
     },
     title: {
         text: '100 Day Price History'
     },
     xAxis: {title: {text: null},
           labels: {enabled: false}}
     ,
     yAxis: {title: {text: 'Share Price in Dollars'}}
     ,
     credits: {
       enabled: false
     },
     series: this.dataForGraph
     });
};

module.exports = SharesPieChart;
