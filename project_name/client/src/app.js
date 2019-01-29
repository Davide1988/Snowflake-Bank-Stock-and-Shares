const Shares = require('./models/shares.js')
const IndexView = require('./views/index_view.js')
const NewShare = require('./models/new_share.js')
const PortfolioView = require('./views/portfolio_view')
const BuyNewShare = require('./views/buy_new_share_view')

document.addEventListener('DOMContentLoaded', () => {


    // --------- Html Container -------
    const container = document.querySelector('#container');

    // -------  View The Index Page -------  
    const indexView = new IndexView(container);
    indexView.bindEvent();

    // -------  View Portfolio Linke -------  
    const portfolioView = new PortfolioView(container);
    portfolioView.bindEvent();

    // -------  View Buy a new share Linke -------  
    const buyNewShare = new BuyNewShare(container);
    buyNewShare.bindEvent();


    const urlForNewShare = 'https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Technology'
    const newShare = new NewShare(urlForNewShare)
    newShare.getStockData()



    const url = 'http://localhost:3000/api/shares'
    const shares = new Shares(url)
    shares.getData();

    const homeClick = document.querySelector('#home');
    homeClick.addEventListener('click', (event) => {
        // newShare.getStockData()
        // shares.getData();
        // indexView.bindEvent();
        window.location.reload();
       
    })


});
