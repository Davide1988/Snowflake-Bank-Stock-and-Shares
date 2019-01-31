const PubSub = require('../helpers/pub_sub.js')
const SharesRenderView = require('./shares_render_view.js')
const ShowPortfolio = require('./show_portfolio.js')

const SharesFirstView = function(space , button){
  this.space = space
  this.button = button

};


SharesFirstView.prototype.bindEvent = function () {
  PubSub.subscribe('shares:sharesFirstView:sharesData', (evt) =>{
    this.shares = evt.detail
    })
    this.button.addEventListener('click' , (evt) =>{
      evt.preventDefault()
      this.space.innerHTML =  " "
      const showPortfolio = new ShowPortfolio(this.space, this.shares)
      console.log(this.shares);
      showPortfolio.render()
    })
}


module.exports = SharesFirstView;
