const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub.js')
const LiveStock = require('./live_stock.js')



const Shares = function(url){
  this.url = url
  this.forCharts = []

}

Shares.prototype.bindEvent = function () {
  PubSub.subscribe('liveStock:shares:arrayOfStock', (evt) =>{
    this.liveStock = evt.detail
    this.dataForGraph = this.buildDataForSpiralGraph(this.liveStock)
    PubSub.publish('shara:sharePieView:dataForSpiralGraph', this.dataForGraph);
    this.unwrapper(this.liveStock);

  })
  PubSub.subscribe('NewShareRender: add to portfolio click', (evt) =>{
    const newShare = evt.detail
    this.post(newShare)
  })
  PubSub.subscribe('SharesRenderView:Shares:id' , (evt) =>{
    const shareId = evt.detail
    this.delete(shareId)
  })

};

Shares.prototype.getData= function () {
  const request = new RequestHelper(this.url)
  request.get()
    .then((portfolio) => {
      PubSub.publish('shares:sharesFirstView:sharesData', portfolio);
      this.portfolio = portfolio
      const liveShare = new LiveStock
      liveShare.getLiveShare(this.portfolio)
    })


};

Shares.prototype.unwrapper= function () {
  let shareWithPriceArray=[]
  const theDate = this.getYesterdayDate()
  for (i = 0; i < this.liveStock.length; i++){
    this.liveStock[i]["Time Series (Daily)"][theDate]["4. close"];
    this.portfolio[i].number_of_shares;
    shareWithPrice = {
      name: this.portfolio[i].name_share,
      y: this.liveStock[i]["Time Series (Daily)"][theDate]["4. close"] * this.portfolio[i].number_of_shares
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

Shares.prototype.delete = function (id) {
  const request = new RequestHelper(this.url)
  request.delete(id)
    .then((newList) =>{
      PubSub.publish('shares:sharesFirstView:sharesData', newList)
    })
};

Shares.prototype.buildDataForSpiralGraph = function (data) {

  let finalData = []
  this.finalDataNumber = []

  this.strange_data = data.map(element => {
    const keys = Object.keys(element["Time Series (Daily)"])
    return keys.map(key => element["Time Series (Daily)"][key]['4. close'])
})

console.log(this.strange_data);

for (var i = 0; i < this.strange_data.length; i++) {
  
  this.strange_data[i]

  this.finalDataNumber.push(parseFloat(this.strange_data[i]))
}




for (i = 0; i < data.length; i++){


  data[i]["Meta Data"]['2. Symbol'];
  this.finalDataNumber[i];

  this.tempData = {
    name: data[i]["Meta Data"]['2. Symbol'],
    data: this.finalDataNumber[i]

  }
  finalData.push(this.tempData)
 }
 return finalData;
}

//
// for (i = 0; i < this.liveStock.length; i++){
//   this.liveStock[i]["Time Series (Daily)"][theDate]["4. close"];
//   this.portfolio[i].number_of_shares;
//   shareWithPrice = {
//     name: this.portfolio[i].name_share,
//     y: this.liveStock[i]["Time Series (Daily)"][theDate]["4. close"] * this.portfolio[i].number_of_shares
//   }

module.exports = Shares;
