const NewShareRender = require('./new_share_render.js')

const BuyNewShare =  function(data, space){
  this.data = data
  this.space = space
}





BuyNewShare.prototype.makeSelector = function () {
  this.space.innerHTML = " "

  const spaceForSelectors = document.createElement('div')
  this.space.appendChild(spaceForSelectors)

  this.selector = document.createElement('select')
  spaceForSelectors.appendChild(this.selector)

  this.populate(this.data)

  this.selector.addEventListener('change', (evt) =>{
    const selectedCompany = evt.target.value
    const companySelected = this.data.filter(company => company.companyName === selectedCompany)
    const newShareRender = new NewShareRender (companySelected, this.space)
    newShareRender.render()
  })

};

BuyNewShare.prototype.populate = function (data) {

  data.forEach((company) =>{
    const companyOption = document.createElement('option')
    companyOption.textContent = company.companyName
    this.selector.appendChild(companyOption)
  })


};


module.exports = BuyNewShare;
