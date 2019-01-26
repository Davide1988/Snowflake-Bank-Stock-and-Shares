const SharesRenderView = require('./shares_render_view.js')

const ShowPortfolio = function(space , shares){
  this.space = space
  this.shares = shares

}


ShowPortfolio.prototype.render = function () {

  const spaceForSelectors = document.createElement('div')
  this.space.appendChild(spaceForSelectors)


  this.categorySelector = document.createElement('select')
  this.nameSelector = document.createElement('select')

  spaceForSelectors.appendChild(this.categorySelector)
  spaceForSelectors.appendChild(this.nameSelector)


  this.populateCategorySelector(this.shares)

  this.categorySelector.addEventListener('change', (evt) => {
    const categoryTargeted = evt.target.value
    this.sharesWithTargetedCategory = this.shares.filter(share => share.category === categoryTargeted)
    this.populateNameSelector(this.sharesWithTargetedCategory)
  })
  this.nameSelector.addEventListener('change', (evt) =>{
    const nameTargeted = evt.target.value
    if (nameTargeted === "all"){
      const passToRenderAll = new SharesRenderView (this.sharesWithTargetedCategory, this.space)
      passToRenderAll.render()
    }
    else {
    const sharesWithTargetedCategoryAndName = this.shares.filter(share => share.name === nameTargeted)
    const passToRender = new SharesRenderView(sharesWithTargetedCategoryAndName, this.space)
    passToRender.render()
  }
  })
}


  ShowPortfolio.prototype.populateCategorySelector = function (shares) {

  const uniqueSharesCategory = [...new Set(shares.map(share=> share.category))];

  uniqueSharesCategory.forEach((category) => {
    const categoryOption = document.createElement('option')
    categoryOption.textContent = category
    this.categorySelector.appendChild(categoryOption)
  })
  };

  ShowPortfolio.prototype.populateNameSelector = function (shares) {

  const uniqueNameCategory = [...new Set(shares.map(share=> share.name))];

  this.nameSelector.innerHTML = ""

  const selectName = document.createElement('option')
  selectName.selected = "true"
  selectName.disabled = "disabled"
  selectName.textContent = "Select name"
  this.nameSelector.appendChild(selectName)


  const all = document.createElement('option')
  all.textContent = "all"
  this.nameSelector.appendChild(all)


  uniqueNameCategory.forEach((name) => {
    const nameOption = document.createElement('option')
    nameOption.textContent = name
    this.nameSelector.appendChild(nameOption)

  })
  };



module.exports = ShowPortfolio
