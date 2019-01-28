const Shares = require('./shares.js')
const RequestHelperLiveStock = require('../helpers/request_helper_live_stock.js')
const PubSub = require('../helpers/pub_sub.js')

const LiveStock = function(){
  this.links = [];
}


LiveStock.prototype.getLiveShare = function (shares) {
  this.links = shares.map((share) =>{
    const link = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${share.name_share}&apikey=JF16KZO2OG6TFLTG`
    return link
  });
  this.getJson(this.links)
};

LiveStock.prototype.getJson = function (links) {
  const request = new RequestHelperLiveStock(links)
    request.get()
      .then((arrayOfLiveStock) =>{
        PubSub.publish('liveStock:shares:arrayOfStock' , arrayOfLiveStock);
      })
};




module.exports = LiveStock;
