const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub.js')
const LiveStock = require('./live_stock.js')



const Shares = function(url){
  this.url = url
  this.forCharts = []

}

Shares.prototype.getData= function () {
  const request = new RequestHelper(this.url)
  request.get()
    .then((portfolio) => {
      PubSub.publish('shares:sharesFirstView:sharesData', portfolio);
      this.portfolio = portfolio
      const liveShare = new LiveStock
      liveShare.getLiveShare(this.portfolio)
    })
    PubSub.subscribe('liveStock:shares:arrayOfStock', (evt) =>{
      this.liveStock = evt.detail
      this.unwrapper(this.liveStock);
    })
    PubSub.subscribe('NewShareRender: add to portfolio click', (evt) =>{
      const newShare = evt.detail
      this.post(newShare)
    })

};

Shares.prototype.unwrapper= function () {
  let shareWithPriceArray=[]
  const theDate = this.getYesterdayDate()
  for (i = 0; i < this.liveStock.length; i++){

    this.liveStock[i]["Time Series (Daily)"][theDate]["4. close"];
    this.portfolio[i].number_of_shares;
    shareWithPrice = {
      name_of_share : this.portfolio[i].name_share,
      value : this.liveStock[i]["Time Series (Daily)"][theDate]["4. close"] * this.portfolio[i].number_of_shares
    }
    shareWithPriceArray.push(shareWithPrice)
  }
  PubSub.publish('shares:shares_pie_chart:object' ,shareWithPriceArray)

};

Shares.prototype.getYesterdayDate = function () {
  const today = new Date
  const day = today.getDay()
  if (day === 0){
    let dd = today.getDate() - 2;
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {   dd = '0' + dd; } if (mm < 10) {   mm = '0' + mm; }


    return yesterdayDate =  yyyy + "-" + mm + "-" + dd

  }
  else if (day === 1){
  let dd = today.getDate() - 3;
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {   dd = '0' + dd; } if (mm < 10) {   mm = '0' + mm; }


  return yesterdayDate =  yyyy + "-" + mm + "-" + dd
}
else {
  let dd = today.getDate() - 1;
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {   dd = '0' + dd; } if (mm < 10) {   mm = '0' + mm; }


  return yesterdayDate =  yyyy + "-" + mm + "-" + dd
}
};

Shares.prototype.post = function (share) {
  const request = new RequestHelper(this.url)
  request.post(share)
    .then((newList) =>{
      PubSub.publish('shares:sharesFirstView:sharesData', newList)
    })
};



module.exports = Shares;
