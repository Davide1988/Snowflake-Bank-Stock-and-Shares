const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub.js')



const Shares = function(url){
  this.url = url

}

Shares.prototype.getData= function () {
  const request = new RequestHelper(this.url)
  request.get()
    .then((shares) => {
      PubSub.publish('shares:sharesFirstView:sharesData', shares);
    })
};


module.exports = Shares;
