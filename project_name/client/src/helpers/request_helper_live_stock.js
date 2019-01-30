const RequestHelperLiveStock = function(urls){
  this.urls = urls

}


RequestHelperLiveStock.prototype.get = function(){
  const arrayOfPromises = this.urls.map((url) => {
    return fetch(url)
      .then((response) => response.json());
  })
  return this.promiseAll(arrayOfPromises)
}

RequestHelperLiveStock.prototype.promiseAll = function (promises) {
  return Promise.all(promises)
};


module.exports = RequestHelperLiveStock;
