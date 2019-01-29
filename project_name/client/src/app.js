const Shares = require('./models/shares.js')
const SharesFirstView = require('./views/shares_first_view.js')
const SharesPieChart = require('./views/shares_pie_chart_view.js')
const NewShare = require('./models/new_share.js')


document.addEventListener('DOMContentLoaded', () => {

function renderHomeView() {
   const url = 'http://localhost:3000/api/shares'
   const shares = new Shares(url)
   shares.bindEvent();
   shares.getData();
}

const home = document.querySelector('#home')
home.addEventListener('click', (evt) =>{
  const bla = document.querySelector('#fextry')
  bla.innerHTML = " "
  renderHomeView()

})

const buyNewShareButton =  document.querySelector('#new-share')
const spaceForNewShare = document.querySelector('#fextry')
const urlForNewShare = 'https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Technology'
const newShare = new NewShare(spaceForNewShare, buyNewShareButton, urlForNewShare)
newShare.bindEvent()

const homeButton = document.querySelector('#home')
const graphs = document.querySelector('#fextry')
const pieGraphView = new SharesPieChart(graphs, home)
pieGraphView.bindEvent()


const space = document.querySelector('#fextry')
const portfolioButton = document.querySelector('#portfolio')
const firstView = new SharesFirstView(space, portfolioButton)
firstView.bindEvent();


renderHomeView()

});
