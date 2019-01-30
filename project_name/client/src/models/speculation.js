const PubSub = require('../helpers/pub_sub.js')


const Speculation = function(){


}


Speculation.prototype.bindEvent = function () {
  PubSub.subscribe('forSpeculation', (evt) =>{

    this.data = evt.detail

    

  })
};



module.exports = Speculation;
