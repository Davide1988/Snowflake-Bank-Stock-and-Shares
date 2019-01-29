const NewShareRender = require('./new_share_render.js')
const PubSub = require('../helpers/pub_sub')

const BuyNewShare = function (space) {
  this.space = space
}

BuyNewShare.prototype.bindEvent = function () {

  PubSub.subscribe('Newshares:BuyNewShare:NewsharesInfo', (evt) => {
    const buyNewShareClick = document.querySelector('#new-share');
    buyNewShareClick.addEventListener('click', (event) => {
      event.preventDefault();
      this.data = evt.detail
      this.makeSelector(this.data);
      
    });

  })
}

BuyNewShare.prototype.makeSelector = function (data) {
  this.space.innerHTML = " "

  const spaceForSelectors = document.createElement('div')
  this.space.appendChild(spaceForSelectors)
  spaceForSelectors.classList.add('styled-select','gray', 'rounded')
  this.selector = document.createElement('select')
  spaceForSelectors.appendChild(this.selector)

  const selectACompany = document.createElement('option')
  selectACompany.selected = "true"
  selectACompany.disabled = "disabled"
  selectACompany.textContent = "Select a Company"
  this.selector.appendChild(selectACompany)


  this.populate(data)

  this.result = document.createElement('div')
  this.space.appendChild(this.result)

  this.selector.addEventListener('change', (evt) => {
    this.result.innerHTML = " "
    const selectedCompany = evt.target.value
    const companySelected = data.filter(company => company.companyName === selectedCompany)
    const newShareRender = new NewShareRender(companySelected, this.result)
    newShareRender.render()
  })

};

BuyNewShare.prototype.populate = function (data) {

  data.forEach((company) => {
    const companyOption = document.createElement('option')
    companyOption.textContent = company.companyName
    this.selector.appendChild(companyOption)
  })


};


module.exports = BuyNewShare;
