const PubSub = require('../helpers/pub_sub.js')

const NewShareRender = function(company, space){
  this.company = company
  this.space = space
}


NewShareRender.prototype.render = function () {

  const result = document.createElement('div')
  this.space.appendChild(result)

  const companyUl = document.createElement('ul')
  result.appendChild(companyUl)

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
  result.appendChild(this.inputShares)

  const buyButton = document.createElement('button')
  buyButton.textContent = "Buy share"
  buyButton.type = "button"
  buyButton.value = "Buy share"
  result.appendChild(buyButton)

  buyButton.addEventListener('click', (evt) =>{
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
};


module.exports = NewShareRender;
