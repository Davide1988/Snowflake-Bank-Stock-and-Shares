const RequestHelper = require('../helpers/request_helper.js')
const BuyNewShare = require('../views/buy_new_share_view.js')


const NewShare = function(space,button,url){
  this.space = space
  this.button = button
  this.url = url
}

NewShare.prototype.bindEvent = function () {
  this.button.addEventListener('click', (evt) =>{
    this.getData()
  })


};

NewShare.prototype.getData = function () {
  const request = new RequestHelper(this.url)
    request.get()
      .then((data) =>{
        const newShareView = new BuyNewShare(data, this.space)
        newShareView.makeSelector()
      })

};


module.exports = NewShare;
