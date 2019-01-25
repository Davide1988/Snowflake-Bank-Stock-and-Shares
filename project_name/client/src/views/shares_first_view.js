const PubSub = require('../helpers/pub_sub.js')
const SharesRenderView = require('./shares_render_view.js')

const SharesFirstView = function(categorySelector, nameSelector, contrainer){
  this.categorySelector = categorySelector
  this.nameSelector = nameSelector
  this.container = container

};


SharesFirstView.prototype.bindEvent = function () {
  PubSub.subscribe('shares:sharesFirstView:sharesData', (evt) =>{
    this.shares = evt.detail
    this.populateCategorySelector(this.shares)
  })
  this.categorySelector.addEventListener('change', (evt) => {
    const categoryTargeted = evt.target.value
    const sharesWithTargetedCategory = this.shares.filter(share => share.category === categoryTargeted)
    this.populateNameSelector(sharesWithTargetedCategory)
  })
  this.nameSelector.addEventListener('change', (evt) =>{
    const nameTargeted = evt.target.value
    const sharesWithTargetedCategoryAndName = this.shares.filter(share => share.name === nameTargeted)
    const passToRender = new SharesRenderView(sharesWithTargetedCategoryAndName, this.container)
    passToRender.render()
  })
};



SharesFirstView.prototype.populateCategorySelector = function (shares) {

  const uniqueSharesCategory = [...new Set(shares.map(share=> share.category))];

  uniqueSharesCategory.forEach((category) => {
    const categoryOption = document.createElement('option')
    categoryOption.textContent = category
    this.categorySelector.appendChild(categoryOption)
  })
};

SharesFirstView.prototype.populateNameSelector = function (shares) {

  const uniqueNameCategory = [...new Set(shares.map(share=> share.name))];

  this.nameSelector.innerHTML = ""

  const selectName = document.createElement('option')
  selectName.selected = "true"
  selectName.disabled = "disabled"
  selectName.textContent = "Select name"
  this.nameSelector.appendChild(selectName)


  uniqueNameCategory.forEach((name) => {
    const nameOption = document.createElement('option')
    nameOption.textContent = name
    this.nameSelector.appendChild(nameOption)

  })
};

module.exports = SharesFirstView;
