

const PieHelper = function (names , y){
  this.names = names
  this.y = y

}

PieHelper.prototype.getData = function () {
  let dataArray = []
  for ( i = 0; i < this.names.length; i++){

    data = {
      name: this.names[i],
      y: this.y[i]
    }
    dataArray.push(data)
  }
  return dataArray
};


module.exports = PieHelper;
