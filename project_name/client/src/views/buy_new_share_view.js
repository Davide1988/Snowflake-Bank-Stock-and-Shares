const NewShareRender = require('./new_share_render.js')

const BuyNewShare =  function(data, space , divForSelector){
  this.data = data
  this.space = space
  this.divForSelector = divForSelector
}



BuyNewShare.prototype.makeSelector = function () {
  this.space.innerHTML = " "

 const spaceForSelectors = document.createElement('div')
 spaceForSelectors.classList.add('styled-select', 'gray','rounded')
 this.space.appendChild(spaceForSelectors)

 this.selector = document.createElement('select')
 spaceForSelectors.appendChild(this.selector)

  const selectACompany = document.createElement('option')
  selectACompany .selected = "true"
  selectACompany .disabled = "disabled"
  selectACompany .textContent = "Select a Company"
  this.selector.appendChild(selectACompany)


  this.populate(this.data)

  this.result = document.createElement('div')
  this.space.appendChild(this.result)

  this.selector.addEventListener('change', (evt) =>{
    this.result.innerHTML = " "
    const selectedCompany = evt.target.value
    const companySelected = this.data.filter(company => company.companyName === selectedCompany)
    const newShareRender = new NewShareRender (companySelected, this.result)
    newShareRender.render()
  })

};

BuyNewShare.prototype.populate = function (data) {

    const newOrder = data.map((element) => element.companyName).sort()
    newOrder.forEach((company) =>{
    const companyOption = document.createElement('option')
    companyOption.textContent = company
    this.selector.appendChild(companyOption)
  })


};


module.exports = BuyNewShare;
