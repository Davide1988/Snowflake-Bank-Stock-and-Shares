const PubSub = require('../helpers/pub_sub.js')
const RenderPieChart = require('./render_pie_chart')

const IndexView = function(container){
  this.container = container
};


IndexView.prototype.bindEvent = function () {

  PubSub.subscribe('shares:shares_pie_chart:object', (evt) =>{
    pieData = evt.detail
    this.container.innerHTML = " ";
    const renderPieChart = new RenderPieChart(this.container, pieData)
    renderPieChart.render()
    })
}

module.exports = IndexView;
