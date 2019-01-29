

const PieHelper = function (objects){
  this.objects = objects


}

PieHelper.prototype.getData = function () {
  // let dataArray = []
  const dataArray = this.objects.map((x) => x)
  // for ( i = 0; i < this.names.length; i++){
  //
  //   data = {
  //     name: this.names[i],
  //     y: this.y[i]
  //   }
  //   dataArray.push(data)
  // }
  console.log(dataArray);
  return dataArray
};


module.exports = PieHelper;
