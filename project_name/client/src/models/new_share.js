const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub')


const NewShare = function(url){
  this.url = url
}

NewShare.prototype.getStockData = function () {
  const request = new RequestHelper(this.url)
    request.get()
      .then((data) =>{
        PubSub.publish('Newshares:BuyNewShare:NewsharesInfo', data);
      })

};

module.exports = NewShare;
