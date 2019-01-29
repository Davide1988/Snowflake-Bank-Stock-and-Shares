const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')
const Highcharts = require('highcharts')

const NewShareRender = function(company, space){
  this.company = company
  this.space = space
}


NewShareRender.prototype.render = function () {



  const companyUl = document.createElement('ul')
  this.space.appendChild(companyUl)

  const companyName = document.createElement('li')
  companyName.textContent = `Company name : ${this.company[0].companyName}`
  companyUl.appendChild(companyName)

  const companySymbol = document.createElement('li')
  companySymbol.textContent = `Company symbol : ${this.company[0].symbol}`
  companyUl.appendChild(companySymbol)

  const companyClosePrice = document.createElement('li')
  companyClosePrice.textContent = `Previous close :$ ${this.company[0].previousClose}`
  companyUl.appendChild(companyClosePrice)

  this.inputShares = document.createElement('input')
  this.inputShares.type = "number"
  this.space.appendChild(this.inputShares)

  const buyButton = document.createElement('button')
  buyButton.textContent = "Buy share"
  buyButton.type = "button"
  buyButton.value = "Buy share"
  this.space.appendChild(buyButton)

  buyButton.addEventListener('click', (evt) =>{


    const sumOfSharesBought = this.company[0].previousClose * this.inputShares.value
    this.space.innerHTML = `You bought ${this.inputShares.value} shares of ${this.company[0].companyName} for a value of  $ ${sumOfSharesBought.toFixed(2)}`

    evt.preventDefault()
    companyData = {
      name: this.company[0].companyName,
      name_share: this.company[0].symbol,
      category: "Technology",
      number_of_shares: this.inputShares.value,
      date_acquisition: "2019-01-26"
    }
    PubSub.publish('NewShareRender: add to portfolio click', companyData);
  })
  this.renderGraph()
};

NewShareRender.prototype.renderGraph = function () {
  const request = new RequestHelper(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.company[0].symbol}&apikey=3QOY0ZZQ72184OFA`);
  request.get()
    .then((datax) => {
      const dataForGraph = this.elaborateDataForGraph(datax)
      this.data = dataForGraph
    })
    .then(() => {

      this.div = document.createElement('div')
      this.div.classList.add('graph-div')
      this.space.appendChild(this.div)


      const myLineChart = Highcharts.chart(this.div, {

        chart: {
             type: 'line',
             renderTo: this.div
         },
         title: {
             text: 'Stock Price Variance'
         },
         series: [{ name: `${this.company[0].companyName}`,
                   data: this.data }]
         });
      })
}



NewShareRender.prototype.elaborateDataForGraph = function (history) {

  this.strange_data = Object.keys(history["Time Series (Daily)"]).map(function(key){
  return history["Time Series (Daily)"][key];
})
  const closingValues = this.strange_data.map((element) => element["4. close"])


  const inNumbers = closingValues.map(function (x) {
     return parseFloat(x)
   })
   return inNumbers
};


module.exports = NewShareRender;
