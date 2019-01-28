const PubSub = require('../helpers/pub_sub.js')

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
    this.space.innerHTML = `You bought ${this.inputShares.value} shares of ${this.company[0].companyName} for a value of  $ ${this.company[0].previousClose * this.inputShares.value}`

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
