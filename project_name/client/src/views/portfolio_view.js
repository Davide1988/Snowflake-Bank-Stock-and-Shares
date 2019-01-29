const ShareTable = require('./share_table.js')
const PubSub = require('../helpers/pub_sub')


const PortfolioView = function(container){
  this.container = container
  

}

PortfolioView.prototype.bindEvent = function () {
  PubSub.subscribe('shares:IndexView:sharesData', (evt) =>{
    const portfolioClick = document.querySelector('#portfolio');
    portfolioClick.addEventListener('click', (event) => {
    event.preventDefault();
    this.shares = evt.detail
    this.render(this.shares);
 });
    
    
    })

}

PortfolioView.prototype.render = function (data) {
  container.innerHTML = ' ';
  const spaceForSelectors = document.createElement('div')
  spaceForSelectors.classList.add('selecters')


  const select1 = document.createElement('div')
  this.categorySelector = document.createElement('select')
  select1.classList.add('styled-select','gray', 'rounded')
  select1.appendChild(this.categorySelector)

  const select2 = document.createElement('div')
  this.nameSelector = document.createElement('select')
  select2.classList.add('styled-select','gray', 'rounded')
  select2.appendChild(this.nameSelector)

  spaceForSelectors.appendChild(select1)
  spaceForSelectors.appendChild(select2)
  this.container.appendChild(spaceForSelectors)
  

  this.table = document.createElement('div')
  this.table.id = "myTable"
  this.container.appendChild(this.table)

  this.pager = document.createElement('div')
  this.pager.id = "pager"
  this.container.appendChild(this.pager)

  this.populateCategorySelector(data)

  this.categorySelector.addEventListener('change', (evt) => {
    const categoryTargeted = evt.target.value
    this.sharesWithTargetedCategory = data.filter(share => share.category === categoryTargeted)
    this.populateNameSelector(this.sharesWithTargetedCategory)
  })
  this.nameSelector.addEventListener('change', (evt) =>{
    const nameTargeted = evt.target.value
    if (nameTargeted === "all"){
      this.table.innerHTML = " "
      this.pager.innerHTML = " "
      const passToRenderAll = new ShareTable (this.sharesWithTargetedCategory,this.pager)
      passToRenderAll.getData()
    }
    else {
    const sharesWithTargetedCategoryAndName = data.filter(share => share.name === nameTargeted)
    this.table.innerHTML = " "
    this.pager.innerHTML = " "
    const passToRender = new ShareTable(sharesWithTargetedCategoryAndName,this.pager)
    passToRender.getData()
  }
  })
}


PortfolioView.prototype.populateCategorySelector = function (shares) {

  const uniqueSharesCategory = [...new Set(shares.map(share=> share.category))];


  const selectCategory = document.createElement('option')
  selectCategory.selected = "true"
  selectCategory.disabled = "disabled"
  selectCategory.textContent = "Select Category"
  this.categorySelector.appendChild(selectCategory)

  const selectName = document.createElement('option')
  selectName.selected = "true"
  selectName.disabled = "disabled"
  selectName.textContent = "Select name"
  this.nameSelector.appendChild(selectName)

  uniqueSharesCategory.forEach((category) => {
    const categoryOption = document.createElement('option')
    categoryOption.textContent = category
    this.categorySelector.appendChild(categoryOption)
  })
  };

  PortfolioView.prototype.populateNameSelector = function (shares) {

  const uniqueNameCategory = [...new Set(shares.map(share=> share.name))];

  this.nameSelector.innerHTML = " "

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



module.exports = PortfolioView;
