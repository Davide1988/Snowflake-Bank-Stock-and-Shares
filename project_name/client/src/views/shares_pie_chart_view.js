const PubSub = require('../helpers/pub_sub.js')
const Highcharts = require('highcharts')
const PieHelper = require('../helpers/pie_helper.js')


const SharesPieChart = function(container){
  this.container = container

}

SharesPieChart.prototype.bindEvent = function () {
  PubSub.subscribe('shares:shares_pie_chart:object', (evt) =>{
    objects = evt.detail
    const names = this.getNames(objects);
    const sum = this.getSum(objects)
    const y = this.getY(objects, sum);
    const pieHelper = new PieHelper(names , y)
    const data = pieHelper.getData()
    this.pieChartRender(data)

  })

}

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

  var myChart = Highcharts.chart(this.container, {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Shares'
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
